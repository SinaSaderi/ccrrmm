import graphene
import graphql_jwt

import default.schema
import user.schema

class Query(
    default.schema.Query,
    user.schema.Query,
    graphene.ObjectType
):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass


class Mutation(user.schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()

    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
#     # This class will inherit from multiple Queries
#     # as we begin to add more apps to our project


schema = graphene.Schema(query=Query, mutation=Mutation)
# schema = graphene.Schema(query=Query)
