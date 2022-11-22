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
    id = graphene.String()
    first_name = graphene.String()
    last_name = graphene.String()
    username = graphene.String()
    email = graphene.String()
    mobile = graphene.String()
    addr = graphene.String()
    password = graphene.String()
    confirm_password = graphene.String()
    group = graphene.String()
    userType = graphene.String()
    realestate_commision = graphene.Int()
    agent_commision = graphene.Int()
    budget = graphene.Int()
    

