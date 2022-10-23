from unittest import expectedFailure
import graphene

from .models import *
from .defs import *

from django.contrib.auth.hashers import make_password
import jwt
from user.validators import validate_create_user, validate_login
from user.utils import generate_token, verify_token
from django.contrib.auth.hashers import check_password
import inspect
from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist

from graphene_django.filter import DjangoFilterConnectionField
def get_user(info):
    auth_header = info.context.META.get('HTTP_AUTHORIZATION')
    payload = verify_token(auth_header)
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

        errors, valid = validate_create_user(input)
        if not valid:
            raise Exception(errors)
        
        ok = valid
        user_instance = User(email=input.email)
        user_instance.password = make_password(input.password)
        user_instance.save()
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
        
        print("sssssss")
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
