from multiprocessing import connection
import graphene
from graphene_django import DjangoObjectType
from .models import User

from django.contrib.auth.models import Group

class UserType(DjangoObjectType):

    class Meta:
        model = User
        fields = "__all__"
    
class GroupType(DjangoObjectType):
    class Meta:
        model = Group
        fields = "__all__"

class UserInput(graphene.InputObjectType):
    email = graphene.String()
    password = graphene.String()
    confirm_password = graphene.String()

