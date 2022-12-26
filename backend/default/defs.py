import graphene

class NavigationType(graphene.ObjectType):
    id = graphene.ID()
    type = graphene.String()
    name = graphene.String()
    key = graphene.String()
    route = graphene.String()
    icon = graphene.String()
    component = graphene.String()
    order = graphene.Int()
    no_collapse = graphene.Boolean()
    is_active = graphene.Boolean()
    collapse = graphene.List('default.defs.NavigationType')