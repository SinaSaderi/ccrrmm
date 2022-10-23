from django.urls import path, include
from rest_framework import routers

from . import api
from . import views

router = routers.DefaultRouter()
router.register(r'customer', api.CustomerViewSet)


urlpatterns = (
    # urls for Django Rest Framework API
    path('api/v1/', include(router.urls)),
)

# urlpatterns += (
#     # urls for Customer
#     path('customer/customer/', views.CustomerListView.as_view(), name='customer_customer_list'),
#     path('customer/customer/create/', views.CustomerCreateView.as_view(), name='customer_customer_create'),
#     path('customer/customer/detail/<int:pk>/', views.CustomerDetailView.as_view(), name='customer_customer_detail'),
#     path('customer/customer/update/<int:pk>/', views.CustomerUpdateView.as_view(), name='customer_customer_update'),
# )

