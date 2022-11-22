from unittest import expectedFailure
import graphene

from .models import *
from .defs import *

from django.contrib.auth.hashers import make_password
from user.validators import validate_create_user, validate_login, validate_update_user
from user.utils import generate_token, verify_token
from django.contrib.auth.hashers import check_password
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import Group


from graphene_django.filter import DjangoFilterConnectionField
def get_user(info):
    auth_header = info.context.META.get('HTTP_AUTHORIZATION')
    payload = verify_token(auth_header)
    if payload['uid'] is not None:
        return User.objects.get(pk=payload['uid'])
    return None
        

class Query(graphene.ObjectType):

    users = graphene.List(UserType, group=graphene.String())
    user = graphene.Field(UserType, pk=graphene.String())

    groups = graphene.List(GroupType)
    group = graphene.Field(GroupType, id=graphene.Int())
    
    def resolve_groups(self, info, **kwargs):
        return Group.objects.all()

    def resolve_users(self, info, **kwargs):
        group = kwargs.get("group", None)
        user = get_user(info)
        if group is not None and group != "":
            if group == "user":
                return User.objects.all()
            return User.objects.filter(groups__name=group)
        
        return []
    
    def resolve_user(self, info, **kwargs):
        pk = kwargs.get("pk")
        if pk is not None:
            return User.objects.get(pk=pk)
        return



class UpdateUser(graphene.Mutation):
    class Arguments:
        input = UserInput(required=True)

    ok = graphene.Boolean()
    user = graphene.Field(UserType)
    errors = graphene.types.generic.GenericScalar()

    @staticmethod
    def mutate(root, info, input=None):
        # TODO Store token

        errors, valid = validate_update_user(input)

        print("eeeeeeeeerrors", type(errors))

        if not valid:
            return CreateUser(ok=0, errors=errors)
            raise Exception(errors)

        ok = valid

        print("inputinput", input)

        user_instance = User.objects.get(pk=int(input.id))
        for field, value in input.items():
            setattr(user_instance, field, value)

        user_instance.save()
        print("user_instance", user_instance)

        return UpdateUser(ok=True, errors=errors, user=user_instance)



class CreateUser(graphene.Mutation):
    class Arguments:
        input = UserInput(required=True)

    ok = graphene.Boolean()
    token = graphene.String()
    user = graphene.Field(UserType)
    errors = graphene.String()

    @staticmethod
    def mutate(root, info, input=None):
        errors, valid = validate_create_user(input)

        if not valid:
            return CreateUser(ok=0, errors=errors, user=User.objects.get(id=2))
            raise Exception(errors)

        ok = valid

        if input.group == "client":
            input.username = input.email

        user_instance = User.objects.create_user(
            email=input.email,
            password = input.password,
            username = input.username,
            first_name = input.first_name,
            last_name = input.last_name,
            mobile = input.mobile,
            addr = input.addr,
            customer = Customer.objects.get(pk=1),
            realestate_commision = input.realestate_commision,
            agent_commision = input.agent_commision,
            budget = input.budget,
        )

        group = input.group
        if input.userType is not None and input.group == "user":
            group = input.userType

        group = Group.objects.get(name=group)
        group.user_set.add(user_instance)

        token = generate_token(user_instance)

        return CreateUser(ok=ok, errors=errors, token="12334", user=user_instance)



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
    update_user = UpdateUser.Field()
    login_user = LoginUser.Field()
    


# schema = graphene.Schema(query=Query)
schema = graphene.Schema(query=Query, mutation=Mutation)
