from rest_framework import viewsets, response , status
from django import http

from .models import Ingredient
from .serializers import IngredientSerializer
from django.shortcuts import get_object_or_404
 
from pprint import pprint

class IngredientViewSet(viewsets.mixins.CreateModelMixin, viewsets.mixins.RetrieveModelMixin, viewsets.ViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    