from rest_framework import viewsets, response , status
from django import http
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.db.models import Subquery, OuterRef


from .models import FamilyUnit
from .serializers import UserSerializer, FamilyUnitSerializer
from django.shortcuts import get_object_or_404
 
from pprint import pprint
 

# from resquests import resquests

class LoginView(viewsets.mixins.CreateModelMixin, viewsets.mixins.RetrieveModelMixin,  viewsets.ViewSet):
    def create(self, request, *args, **kwargs): 
        pprint('LoginView') 
        user = authenticate( 
            username=request.POST.get('username'),
            password=request.POST.get('password')) 

        # return whatever you want on failure
        if not user :
            return response.Response(status=404) 
        
        queryset = User.objects.filter(username=user.get_username() )  
        # pprint('LoginView 3')   
        pprint(queryset)   
        user = get_object_or_404(queryset)
        pprint(user)
        pprint(user.pk  )
        queryset = FamilyUnit.objects.filter(user_id=user.pk)  
        # pprint('LoginView 3')   
        pprint(queryset)    
        fam = get_object_or_404(queryset)

        data = {
            'familyId': fam.pk,
        }

        login(request, user)  
        pprint('LoginView 6')
        return http.JsonResponse(  data=data, status=200) 

class UserViewSet(viewsets.mixins.CreateModelMixin, viewsets.mixins.RetrieveModelMixin, viewsets.ViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field= 'username'
    
    def create(self, request):
        data = { 
            'name': 'default',
            'user': {
                'username': request.data['username'],  
                'password': request.data['password'], 
                'email':  request.data['email'],
            } ,
            'members' : []
        }     
        
        serializer = FamilyUnitSerializer(data=data)   

        if serializer.is_valid(): 
            try:   
                serializer.create(validated_data=data)
                return response.Response(serializer.data, status=status.HTTP_200_OK)
            except Exception as e:
                pprint("exception") 
                pprint(e)  
                return response.Response(status=400)       
        else:
            pprint("else") 
            # TODO: mensajes de error mas explicativos  
            pprint(serializer.errors)  
            return response.Response(serializer.errors, status=400)
         
        
            
    def retrieve(self, request, username=None, *args, **kwargs,):
        serializer_context = {  
            'request': request,
        }
        queryset = User.objects.filter(username=username, context=serializer_context)
        user = get_object_or_404(queryset)
        serializer = UserSerializer(user)
        return response.Response(serializer.data)
    
    def list(self, request, *args, **kwargs):
        # Retrieve all objects from the model
        queryset = User.objects.all()
        # Serialize the data
        serializer_context = {
            'request': request,
        }
        serializer = UserSerializer(queryset, many=True, context=serializer_context)
        # Return the serialized data in the response
        return response.Response(serializer.data, status=200 )

    def password(self, request, pk=None):
        """Update the user's password."""
 
    #siempre hay que pasarle como body el username, y password el resto de param dan igual
    def update(self, request,  username=None, *args, **kwargs,):
        partial = kwargs.pop('partial', False)
        queryset = User.objects.filter(username=username)
        user = get_object_or_404(queryset)

        serializer = UserSerializer(user, data=request.data, partial=partial)
        if(serializer.is_valid()):
            serializer.update(user, request.data)
            return response.Response(serializer.data)
        else:
            return response.Response(data=serializer.errors.values[0], status=400)

    def destroy(self, request, username=None):
        queryset = User.objects.filter(username=username)
        user = get_object_or_404(queryset)

        serializer = UserSerializer()
        if(user!=None):
            User.delete(user)
            return response.Response({"message": "Object deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        else:
            return response.Response(serializer.errors, status=400)  