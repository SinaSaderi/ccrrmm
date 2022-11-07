from unittest import expectedFailure
import graphene

from .models import *
from .defs import *

from django.contrib.auth.hashers import make_password
from user.validators import validate_create_user, validate_login
from user.utils import generate_token, verify_token
from django.contrib.auth.hashers import check_password
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import Group


from graphene_django.filter import DjangoFilterConnectionField
def get_user(info):
    auth_header = info.context.META.get('HTTP_AUTHORIZATION')
    print("auth_header", auth_header)
    payload = verify_token(auth_header)
    print("payload", payload)
    if payload['uid'] is not None:
        return User.objects.get(pk=payload['uid'])
    return None
        

class Query(graphene.ObjectType):

    users = graphene.List(UserType, group=graphene.String())
    user = graphene.Field(UserType, id=graphene.Int())

    groups = graphene.List(GroupType)
    group = graphene.Field(GroupType, id=graphene.Int())
    
    def resolve_groups(self, info, **kwargs):
        return Group.objects.all()

    def resolve_users(self, info, **kwargs):
        group = kwargs.get("group", None)
        print("**********8", info)
        user = get_user(info)
        if group is not None:
            return User.objects.filter(groups__name=group)

        # if user is not None or group is not None:
        #     group_name = user.groups.all()[0].name

        #     if group_name == "manager":
        #         return user.related_users.filter(groups__name=group)

        users = User.objects.all()
        
        return users


class CreateUser(graphene.Mutation):
    class Arguments:
        input = UserInput(required=True)

    ok = graphene.Boolean()
    token = graphene.String()
    user = graphene.Field(UserType)
    errors = graphene.String()

    

    @staticmethod
    def mutate(root, info, input=None):
        # TODO Store token

        print("ooooooooo")

        errors, valid = validate_create_user(input)
        print("eeee", errors)
        if not valid:
            raise Exception(errors)

        print("iiiiiii", input)

        ok = valid

        user_instance = User.objects.create_user(
            email=input.email,
            password = input.password,
            username = input.username,
            first_name = input.first_name,
            last_name = input.last_name,
            mobile = input.mobile,
            addr = input.address,
            customer = Customer.objects.get(pk=1)
        )

        group = Group.objects.get(name=input.group)
        group.user_set.add(user_instance)

        token = generate_token(user_instance)

        return CreateUser(ok=ok, errors=errors, token=token, user=user_instance)



class LoginInput(graphene.InputObjectType):
    email = graphene.String()
    password = graphene.String()

class LoginUser(graphene.Mutation):
    class Arguments:
        input = LoginInput(required=True)

    ok = graphene.Boolean()
    user = graphene.Field(UserType)
    token = graphene.String()

    @staticmethod
    def mutate(root, info, input=None):
        errors, valid = validate_login(input)
        
        print("sssssss", input)
        if not valid:
            raise Exception(errors)
        try:
            user = User.objects.get(email=input.email)
        except ObjectDoesNotExist:
            errors['general'] = 'Wrong crendetials.'
            raise Exception(errors)
        print("uuuuu", user)
        if not check_password(input.password, user.password):
            errors['general'] = 'Wrong crendetials'
            raise Exception(errors)
        token = generate_token(user)
        check = verify_token(token)
        ok = True

        return LoginUser(ok=ok, token=token, user=user)

class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    login_user = LoginUser.Field()
    


# schema = graphene.Schema(query=Query)
schema = graphene.Schema(query=Query, mutation=Mutation)
