
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .schemas import MenuRequest 
from .services import DailyMealPlanService  
from datetime import timedelta
# Create your views here.
   
# import viewsets
from rest_framework import viewsets

from .models import FamilyUnit, FamilyMember, Menu
from .serializers import FamilyUnitSerializer

class FamilyUnitViewSet(viewsets.ModelViewSet):
    # define queryset
    queryset = FamilyUnit.objects.all()
 
    # specify serializer to be used
    serializer_class = FamilyUnitSerializer

class GenerarMenuIAView(APIView):
    def post(self, request):
        try:
            # Validate request data using schema
            datos = MenuRequest(**request.data)
            
            # Verify that there are member IDs
            if not datos.ids:
                return Response({"status": "Error", "detail": "No family member IDs were provided"}, 
                               status=status.HTTP_400_BAD_REQUEST)
            
            family_members = []
            seen_ids = set()  # To avoid duplicates
            
            for i, member_id in enumerate(datos.ids):
                # Avoid duplicates
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
                        member_name = f"Member {member_id}"
                    
                family_members.append((member_id, member_name))
                
            print(f"Processed family members: {family_members}")
            
            # Instantiate the service and generate the menu with AI
            DailyMealPlan = DailyMealPlanService()  
            datos_menu = DailyMealPlan.get_ai_menu(family_members, datos.date)  # Pass the date
            
            if datos_menu:
                # Create the structure expected by save_menu_to_db
                ai_response = {"menus": datos_menu}
                
                # Create service instance
                service = DailyMealPlanService() 
                
                # Save menu to DB - Pass member IDs and date
                exito = DailyMealPlan.save_menu_to_db(ai_response, datos.ids, datos.date)
                if exito:
                    # Get saved menus to return them in the response
                    menus_guardados = []
                    
                    # Convert POST request date to date object if it's a string
                    target_date = datos.date
                    if isinstance(target_date, str):
                        from datetime import datetime
                        target_date = datetime.fromisoformat(target_date).date()
                    
                    for member_id in datos.ids:
                        try:
                            member = FamilyMember.objects.get(id=member_id)
                            
                            # Query menus for the specific date from POST request
                            member_menus = Menu.objects.filter(
                                meal_plan__family_member=member,
                                date=target_date  # Use specific date from POST
                            ).order_by('meal_time')
                                                        
                            member_data = {
                                "name": member.name,
                                "menus": [
                                    {
                                        "day": "today",  
                                        "date": menu.date.isoformat(),
                                        "meal_time": menu.meal_time,
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
                        "detail": "Menu saved successfully",
                        "menus": menus_guardados
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({"status": "Error", "detail": "Error saving menu"}, 
                                  status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response({"status": "Error", "detail": "Could not generate menu"}, 
                              status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"status": "Error", "detail": str(e)}, 
                          status=status.HTTP_400_BAD_REQUEST)