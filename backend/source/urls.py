
from django.urls import path, include
from django.contrib import admin
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('admin/', admin.site.urls),
    path('default/', include('default.urls')),
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True))),
]
admin.site.site_header = "Real State CRM administration"
admin.site.site_title = "Real State CRM admin Portal"