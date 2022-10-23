import graphene

class NavigationType(graphene.ObjectType):
    id = graphene.ID()
    label = graphene.String()
    url = graphene.String()
    icon = graphene.String()
    slug = graphene.String()
    component = graphene.String()