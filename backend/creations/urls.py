from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CreationViewSet, ContactMessageViewSet, AdminCreationViewSet
from .auth_views import login, logout, get_user_info

router = DefaultRouter()
router.register(r'creations', CreationViewSet)
router.register(r'contact', ContactMessageViewSet, basename='contact')
router.register(r'admin/creations', AdminCreationViewSet, basename='admin-creations')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', login, name='login'),
    path('auth/logout/', logout, name='logout'),
    path('auth/user/', get_user_info, name='user-info'),
]
