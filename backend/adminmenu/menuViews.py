from rest_framework import viewsets, response , status


from rest_framework.views import APIView
from .models import FamilyMember, WeeklyMealPlan, Menu
from .serializers import MealPlanSerializer, MenuSerializer
from django.shortcuts import get_object_or_404
 
from pprint import pprint

from rest_framework.response import Response
from rest_framework import status
from .schemas import MenuRequest 
from .services import DailyMealPlanService  
from datetime import timedelta
# Create your views here.
   
# import viewsets
from rest_framework import viewsets

from .models import Menu, WeeklyMealPlan, FamilyMember

# from resquests import resquests
class MealPlanViewSet(viewsets.mixins.ListModelMixin,
                     viewsets.GenericViewSet):
    queryset = WeeklyMealPlan.objects.all()
    serializer_class = MealPlanSerializer
    lookup_field= 'pk'
    
    @classmethod
    def get_extra_actions(cls):
        return []
    
    def post(self, request):
        try:
            # Validar los datos de la solicitud usando el esquema
            datos = MenuRequest(**request.data)
            
            # Verificar que hay IDs de miembros
            if not datos.ids:
                return Response({"status": "Error", "detail": "No se proporcionaron IDs de miembros de la familia"}, 
                               status=status.HTTP_400_BAD_REQUEST)
            
            family_members = []
            seen_ids = set()  # Para evitar duplicados
            
            for i, member_id in enumerate(datos.ids):
                # Evitar duplicados
                if member_id in seen_ids:
                    continue
                seen_ids.add(member_id)
                
                if i < len(datos.names) and datos.names[i]:
                    member_name = datos.names[i]
                else:
                    try:
                        member = FamilyMember.objects.get(id=member_id)
                        member_name = member.name
                    except FamilyMember.DoesNotExist:
                        member_name = f"Miembro {member_id}"
                    
                family_members.append((member_id, member_name))
                
            print(f"Family members procesados: {family_members}") 
            
            # Instanciar el servicio y generar el menú con la IA
            DailyMealPlan = DailyMealPlanService()  
            pprint("create menuplan") 
            pprint(datos.date)   
            datos_menu = DailyMealPlan.get_ai_menu(family_members, datos.date)
            pprint(datos_menu) 

            if datos_menu:
                # Crear la estructura que espera save_menu_to_db
                ai_response = {"menus": datos_menu}
                
                # Crear instancia del servicio
                service = DailyMealPlanService() 
                
                # Guardar menú en BD - Pasar los IDs de miembros
                exito = DailyMealPlan.save_menu_to_db(ai_response, datos.ids, datos.date)
                if exito:
                    # Obtener los menús guardados para devolverlos en la respuesta
                    menus_guardados = []
                    for member_id in datos.ids:
                        try:
                            member = FamilyMember.objects.get(id=member_id)
                            
                          
                            member_menus = Menu.objects.filter(
                                meal_plan__family_member=member,
                                date__gte=service.base_date,  
                                date__lt=service.base_date + timedelta(days=7)  
                            ).order_by('date')
                                                        
                            member_data = {
                                "name": member.name,
                                "menus": [
                                    {
                                        "day": datos.date,  
                                        "date": menu.date.isoformat(),
                                        "meal_time": menu.meal_time if hasattr(menu, 'meal_time') else "unknown", 
                                        "recipes": [recipe.name for recipe in menu.recipes.all()]
                                    }
                                    for menu in member_menus
                                ]
                            }
                            menus_guardados.append(member_data)
                        except FamilyMember.DoesNotExist:
                            continue
                    
                    return Response({
                        "status": "OK", 
                        "detail": "Menú guardado correctamente",
                        "menus": menus_guardados
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({"status": "Error", "detail": "Error al guardar el menú"}, 
                                  status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({"status": "Error", "detail": "No se pudo generar el menú"}, 
                              status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"status": "Error", "detail": str(e)}, 
                          status=status.HTTP_400_BAD_REQUEST)
    

    def list(self, request, *args, **kwargs):
        # Retrieve all objects from the model
        queryset = WeeklyMealPlan.objects.all()
        # Serialize the data
        serializer_context = { 
            'request': request,
        }
        serializer = MealPlanSerializer(queryset, many=True, context=serializer_context)
        # Return the serialized data in the response
        return response.Response(serializer.data, status=200 )
    
class MenuViewSet(viewsets.mixins.ListModelMixin,
                     viewsets.GenericViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    lookup_field= 'pk'
    
    @classmethod
    def get_extra_actions(cls):
        return []
    
    def retrieve(self, request, pk=None, *args, **kwargs,):
        queryset = Menu.objects.filter(pk=pk)
        member = get_object_or_404(queryset)
        serializer = MenuSerializer(member)
        return response.Response(serializer.data)