import graphene

from .models import *
from .defs import *

class Query(graphene.ObjectType):

    navs = graphene.List(NavigationType, parent=graphene.String())
    nav = graphene.Field(NavigationType, id=graphene.Int(), parent=graphene.String())

    def resolve_navs(self, info, **kwargs):
        parent = kwargs.get("parent", None)
        if parent is not None and parent != "":
            return Navigation.objects.filter(parent__name=parent, is_active=True).order_by("order")
        return Navigation.objects.filter(is_active=True).order_by("order")

schema = graphene.Schema(query=Query)