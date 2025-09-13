from rest_framework import viewsets, response , status
from django import http

from .models import Ingredient
from .serializers import IngredientSerializer
from django.shortcuts import get_object_or_404
 
from pprint import pprint

class IngredientViewSet( viewsets.mixins.CreateModelMixin, viewsets.mixins.RetrieveModelMixin, viewsets.ViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    
    def create(self, request):
        data= {
            'name': request.data['name'],
        }
        serializer = IngredientSerializer(data=data)   

        if serializer.is_valid(): 
            try:   
                Ingredient.objects.create(name= request.data['name'], )
                return response.Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                pprint(e)  
                return response.Response(status=400)       
        else:
            pprint("else") 
            # TODO: mensajes de error mas explicativos  
            pprint(serializer.errors)  
            return response.Response(serializer.errors, status=400)