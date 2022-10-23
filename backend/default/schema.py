import graphene

from .models import *
from .defs import *

class Query(graphene.ObjectType):

    navs = graphene.List(NavigationType)
    nav = graphene.Field(NavigationType, id=graphene.Int(), uid=graphene.String())

    def resolve_navs(self, info, **kwargs):
        return Navigation.objects.all()

schema = graphene.Schema(query=Query)