"""
URL configuration for appmenu project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

# from adminmenu.views import FamilyUnitViewSet #, get_csrf
from adminmenu.userViews import UserViewSet, LoginView
from adminmenu.FamilyViews import FamilyMemberViewSet, FamilyUnitViewSet
from adminmenu.menuViews import MealPlanViewSet, MenuViewSet
from adminmenu.ingredientView import IngredientViewSet
from adminmenu.views import GenerarMenuIAView
from adminmenu.userViews import UserViewSet, LoginView





# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='user-detail')
router.register(r'FamilyUnit', FamilyUnitViewSet)
router.register(r'login', LoginView, basename='mylogin')
router.register(r'familyMember', FamilyMemberViewSet, basename='familyMember')
router.register(r'menuPlan', MealPlanViewSet, basename='menuPlan')
router.register(r'ingredient', IngredientViewSet, basename='ingredient')
router.register(r'menu', MenuViewSet, basename='menu')

IngredientViewSet
urlpatterns = [
    path('', include(router.urls)),
    path('api/generar-menu-ia/', GenerarMenuIAView.as_view(), name='generar_menu_ia'),  # Descomenta esta línea
    path('', include('rest_framework.urls')), 
]
