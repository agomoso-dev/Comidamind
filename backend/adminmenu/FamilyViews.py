from rest_framework import viewsets, response , status
from django import http
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.db.models import Subquery, OuterRef

import requests


from .models import FamilyMember, FamilyUnit, WeeklyMealPlan
from .serializers import FamilyMemberSerializer, FamilyUnitSerializer
from django.shortcuts import get_object_or_404, get_list_or_404
 
from pprint import pprint


# from resquests import resquests
class FamilyMemberViewSet(viewsets.mixins.CreateModelMixin, viewsets.mixins.RetrieveModelMixin, viewsets.ViewSet):
    queryset = FamilyMember.objects.all()
    serializer_class = FamilyMemberSerializer
    lookup_field= 'pk'
    
    def create(self, request):
        pprint(request.data.keys())

        queryset = FamilyUnit.objects.filter(id=request.data['family_unit_id'])  
        # pprint('LoginView 3')   
        pprint(queryset)    
        fam = get_object_or_404(queryset) 
        
        data = { 
            'name': request.data['name'],
            'birth_date': request.data['birth_date'],  
            'gender': request.data['gender'], 
            'weight': request.data['weight'], 
            'height': request.data['height'], 
            'activity_level': request.data['activity_level'], 
            'objective': request.data['objective'],
            'photo': None, 
            'weeklyMealPlans':[],
        }  

        serializer = FamilyMemberSerializer(data=data)   

        if serializer.is_valid(): 
            try:   
                FamilyMember.objects.create(name= request.data['name'],
                                            birth_date= request.data['birth_date'], 
                                            gender= request.data['gender'], 
                                            weight= request.data['weight'], 
                                            height= request.data['height'], 
                                            activity_level= request.data['activity_level'], 
                                            objective= request.data['objective'],
                                            photo= None, 
                                            family_unit=fam   
                                            )
                return response.Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                pprint(e)  
                return response.Response(status=400)       
        else:
            pprint("else") 
            # TODO: mensajes de error mas explicativos  
            pprint(serializer.errors)  
            return response.Response(serializer.errors, status=400)
         
        
            
    def retrieve(self, request, pk=None, *args, **kwargs,):
        serializer_context = {
            'request': request, 
        }
        queryset = FamilyMember.objects.filter(pk=pk)
        member = get_object_or_404(queryset)
        serializer = FamilyMemberSerializer(member)
        return response.Response(serializer.data)
    
    def list(self, request, *args, **kwargs):
        # Retrieve all objects from the model
        queryset = FamilyMember.objects.all()
        # Serialize the data
        serializer_context = {
            'request': request,
        }
        serializer = FamilyMemberSerializer(queryset, many=True, context=serializer_context)
        # Return the serialized data in the response
        return response.Response(serializer.data, status=200 )
    
    # def password(self, request, pk=None):
    #     """Update the user's password."""
 
    # #siempre hay que pasarle como body el username, y password el resto de param dan igual
    # def update(self, request,  username=None, *args, **kwargs,):
    #     partial = kwargs.pop('partial', False)
    #     queryset = User.objects.filter(username=username)
    #     user = get_object_or_404(queryset)

    #     serializer = UserSerializer(user, data=request.data, partial=partial)
    #     if(serializer.is_valid()):
    #         serializer.update(user, request.data)
    #         return response.Response(serializer.data)
    #     else:
    #         return response.Response(data=serializer.errors.values[0], status=400)

    # def destroy(self, request, username=None):
    #     queryset = User.objects.filter(username=username)
    #     user = get_object_or_404(queryset)

    #     serializer = UserSerializer()
    #     if(user!=None):
    #         User.delete(user)
    #         return response.Response({"message": "Object deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    #     else:
    #         return response.Response(serializer.errors, status=400)  

class FamilyUnitViewSet(viewsets.mixins.CreateModelMixin, viewsets.mixins.RetrieveModelMixin, viewsets.ViewSet):
    queryset = FamilyUnit.objects.all()
    serializer_class = FamilyUnitSerializer
    lookup_field= 'pk'

    def create(self, request, *args, **kwargs,):
        pprint("create log 1")
        date=request.data['date']
        pprint(date) 
        pk=request.data['famid']
        pprint("create log 2")
          
        querysetFamilyMember = FamilyMember.objects.filter(family_unit_id=pk)

        pprint("create log 3") 
        familyMemberlist = get_list_or_404(querysetFamilyMember)

        pprint("create log 4")
        for member in familyMemberlist:
            queryWeeklyMealPlan = WeeklyMealPlan.objects.filter(family_member=member, start_date=date)
            queryres = queryWeeklyMealPlan.filter()
            pprint(queryres) 
            pprint(queryres.__len__()) 
            if queryres.__len__()==0:
                pprint("entra en lin 0")
                payload = {
                    "names":[member.name],
                    "ids":[member.pk],
                    "date":date 
                }
                requests.post("http://127.0.0.1:5000/menuPlan/", json=payload)
        pprint("create log 5")

        querysetFamilyUnit = FamilyUnit.objects.filter(pk=pk) 
        fam = get_object_or_404(querysetFamilyUnit)
        serializer = FamilyUnitSerializer(fam)
        return response.Response(serializer.data)
    
    def retrieve(self, request, pk=None, *args, **kwargs,):
        querysetFamilyUnit = FamilyUnit.objects.filter(pk=pk) 
        fam = get_object_or_404(querysetFamilyUnit)
        serializer = FamilyUnitSerializer(fam)
        return response.Response(serializer.data)
     
    def list(self, request, *args, **kwargs):
        # Retrieve all objects from the model
        queryset = FamilyUnit.objects.all()
        # Serialize the data
        serializer_context = {
            'request': request,
        }
        serializer = FamilyUnitSerializer(queryset, many=True, context=serializer_context)
        # Return the serialized data in the response
        return response.Response(serializer.data, status=200 )
