import requests
import json
from datetime import date, timedelta, datetime
from django.utils import timezone
from django.db import connection
from .models import (
    FamilyMember, FamilyUnit, WeeklyMealPlan, Menu, Recipe, MenuRecipe, 
    Ingredient, RecipeIngredient  
)
from .schemas import MenuStruct

class DailyMealPlanService:  
    def __init__(self):
        self.base_date = timezone.now().date()  
        
    def get_members_by_id(self, family_unit_id):
        """Gets family unit members by ID"""
        try:
            family_unit = FamilyUnit.objects.get(id=family_unit_id)
            members = FamilyMember.objects.filter(family_unit=family_unit)
            return members
        except Exception as e:
            print(f"Error getting members by ID: {e}")
            return []
            
    def get_members_by_name(self, name):
        """Gets members by name"""
        try:
            members = FamilyMember.objects.filter(name__icontains=name)
            return members
        except Exception as e:
            print(f"Error getting members by name: {e}")
            return []
    
    def create(self, family_member_id, target_date=None):
        """Creates a daily meal plan for a specific member"""
        try:
            family_member = FamilyMember.objects.get(id=family_member_id)
            
            # Use target date or base date as fallback
            plan_date = target_date if target_date else self.base_date
            
            daily_plan = WeeklyMealPlan.objects.create(
                family_member=family_member,
                start_date=plan_date,  
                end_date=plan_date     
            )
            
            return daily_plan
        except FamilyMember.DoesNotExist:
            raise ValueError(f"Member with ID {family_member_id} not found")
        except Exception as e:
            raise ValueError(f"Error creating daily plan: {str(e)}")
    
    def get_ai_menu(self, family_members, target_date=None, max_retries=2):
        """Generates daily menus using AI for 3 meals of the specified day"""
        retry_count = 0
        
        # Process target date
        if target_date is None:
            target_date = self.base_date
        elif isinstance(target_date, str):
            from datetime import datetime
            target_date = datetime.fromisoformat(target_date).date()
        
        while retry_count <= max_retries:
            all_menus = []
            
            for member_id, member_name in family_members:
                try:
                    # Get additional member information
                    try:
                        member = FamilyMember.objects.get(id=member_id)
                        
                        # Calculate age
                        from datetime import date
                        today = date.today()
                        age = today.year - member.birth_date.year - ((today.month, today.day) < (member.birth_date.month, member.birth_date.day))
                        
                        member_info = f"""
                        Member Profile:
                        - Name: {member_name}
                        - Age: {age} years old
                        - Gender: {member.gender}
                        - Weight: {member.weight} kg
                        - Height: {member.height} cm
                        - Activity Level: {member.activity_level}
                        """
                        
                    except FamilyMember.DoesNotExist:
                        member_info = f"Member Profile: {member_name} (basic profile)"
                    
                    # Generate AI prompt
                    prompt_content = f'''
                    You are a professional nutritionist and chef. Create 3 DIFFERENT and VARIED real meals for today ({self.base_date.strftime('%Y-%m-%d')}).
                    
                    {member_info}
                    
                    Based on this member's profile, create personalized meals considering:
                    - Age-appropriate nutrition and portion sizes
                    - Gender-specific nutritional needs
                    - Weight and height for caloric requirements
                    - Activity level for energy needs (low=sedentary, medium=moderate exercise, high=very active)
                    
                    Generate CREATIVE and DIVERSE recipes. Avoid repetitive meals. Consider different cuisines:
                    - Breakfast: variety.
                    - Lunch: variety.
                    - Dinner: variety.
                    
                    Return only JSON with this exact format:
                    [
                        {{"meal_time": "breakfast", "recipe": {{"name": "name recipe", "recipe_ingredients": [{{"name": "ingredient1", "quantity": 1-100, "unit": "-"}}, {{"name": "ingredient2", "quantity": 1, "unit": "cup"}}], "instructions": "Detailed step-by-step cooking instructions", "time_estimated": " min or hour"}}}},
                        {{"meal_time": "lunch", "recipe": {{"name": "name recipe", "recipe_ingredients": [{{"name": "ingredient1", "quantity": 1-100, "unit": "-"}}, {{"name": "ingredient2", "quantity": 1, "unit": "tablespoon"}}], "instructions": "Detailed step-by-step cooking instructions", "time_estimated": " min or hour"}}}},
                        {{"meal_time": "dinner", "recipe": {{"name": "name receipe", "recipe_ingredients": [{{"name": "ingredient1", "quantity": 1-100, "unit": "-"}}, {{"name": "ingredient2", "quantity": 2, "unit": "cups"}}], "instructions": "Detailed step-by-step cooking instructions", "time_estimated": " min or hour"}}}}
                    ]
                    
                    IMPORTANT: 
                    - Create UNIQUE recipes each time. Vary ingredients, cooking methods, and cuisines. Be creative!
                    - For ingredients, provide realistic quantities and appropriate units (grams, cups, pieces, tablespoons, etc.)
                    - Include 1-5 ingredients per recipe with specific quantities
                    - Adjust portion sizes and nutritional content based on the member's profile
                    - Consider caloric needs: higher activity = more calories, age and gender affect requirements
                    '''
                    
                    
                    payload = {"prompt": prompt_content}
                    print(f"Prompt inicial --> {member_name}: {prompt_content}\n ----------------------------")  # Print first 500 characters
                    print(f"Sending request to FastAPI for {member_name} (attempt {retry_count + 1})")
                    
                    response = requests.post("http://fastapi:5005/ask", json=payload)
                    
                    if response.status_code == 200:
                        response_data = response.json()
                        print(f"FastAPI response for {member_name}: {response_data}")
                        
                        if "response" in response_data:
                            ai_response = response_data["response"]
                            
                            try:
                                # Clean response to get only JSON
                                if isinstance(ai_response, str):
                                    ai_response = ai_response.strip()
                                    
                                    # Remove markdown code blocks
                                    if ai_response.startswith('```json'):
                                        ai_response = ai_response[7:]
                                    elif ai_response.startswith('```'):
                                        ai_response = ai_response[3:]
                                        
                                    if ai_response.endswith('```'):
                                        ai_response = ai_response[:-3]
                                        
                                    ai_response = ai_response.strip()
                                    
                                    # Find valid JSON
                                    start_idx = ai_response.find('[')
                                    end_idx = ai_response.rfind(']') + 1
                                    
                                    if start_idx == -1:
                                        start_idx = ai_response.find('{')
                                        end_idx = ai_response.rfind('}') + 1
                                        
                                    if start_idx != -1 and end_idx != 0:
                                        json_str = ai_response[start_idx:end_idx]
                                        menus_data = json.loads(json_str)
                                        
                                        if isinstance(menus_data, dict):
                                            menus_data = [menus_data]
                                    else:
                                        raise json.JSONDecodeError("No JSON found", ai_response, 0)
                                else:
                                    menus_data = ai_response
                                    if isinstance(menus_data, dict):
                                        menus_data = [menus_data]
                                
                                # Process each menu from array
                                for menu_data in menus_data:
                                    try:
                                        meal_time = menu_data.get('meal_time')
                                        recipes = menu_data.get('recipe', [])
                                        
                                        # If recipe is an array, take only the first recipe
                                        if isinstance(recipes, list) and len(recipes) > 0:
                                            recipe_data = recipes[0]  # Take only first recipe
                                            menu_data['recipe'] = recipe_data
                                        
                                        menu = MenuStruct.model_validate(menu_data)
                                        menu.member_id = member_id
                                        menu.member_name = member_name
                                        all_menus.append(menu)
                                    except Exception as validation_error:
                                        print(f"Error validating individual menu: {validation_error}")
                                        print(f"Menu data: {menu_data}")
                                        continue
                                    
                                print(f"Daily menus created successfully for {member_name}: {len(menus_data)} menus")
                                
                            except json.JSONDecodeError as e:
                                print(f"JSON decode error for {member_name}: {e}")
                                print(f"Response received: {ai_response[:500]}...")
                                
                            except Exception as e:
                                print(f"Error processing response for {member_name}: {e}")
                        else:
                            print(f"Unexpected response for {member_name}: {response_data}")
                    else:
                        print(f"HTTP error for {member_name}: {response.status_code}")
                        print(f"Response: {response.text}")
                        
                except Exception as e:
                    print(f"General error for {member_name}: {e}")
            
            print(f"Total daily menus generated: {len(all_menus)} (attempt {retry_count + 1})")
            
            # Validation to ensure menus were generated
            if not all_menus:
                retry_count += 1
                if retry_count <= max_retries:
                    print(f"No menus generated. Retrying... (attempt {retry_count + 1}/{max_retries + 1})")
                    continue
                else:
                    raise ValueError(f"Could not generate any menu after {max_retries + 1} attempts. Check AI connection or input data.")
            else:
                # APPLY FILTER ALWAYS BEFORE EXITING LOOP
                print(f"Menus before filtering: {len(all_menus)}")
                all_menus = filter_menus_by_meal_time(all_menus)
                print(f"Menus after filtering: {len(all_menus)}")
                
                # Check if we have at least one menu per meal_time for each member
                expected_menus = len(family_members) * 3  # 3 meals per member
                if len(all_menus) >= expected_menus or retry_count >= max_retries:
                    print(f"Filtering completed. Final menus: {len(all_menus)}")
                    break
                else:
                    # If we don't have enough menus, retry
                    retry_count += 1
                    if retry_count <= max_retries:
                        print(f"Insufficient menus after filtering ({len(all_menus)}/{expected_menus}). Retrying... (attempt {retry_count + 1}/{max_retries + 1})")
                        continue
                    else:
                        print(f"Maximum retries reached. Final menus: {len(all_menus)}")
                        break
        
        return all_menus
    
    def save_menu_to_db(self, ai_response, member_ids, target_date=None):
        """Saves AI-generated menus to database"""
        
        # Use target date or base date as fallback
        if target_date is None:
            target_date = self.base_date
        elif isinstance(target_date, str):
            from datetime import datetime
            target_date = datetime.fromisoformat(target_date).date()
        try:
            # Handle MenuStruct objects or dictionaries
            if isinstance(ai_response, list):
                menus_data = ai_response
            elif isinstance(ai_response, dict) and "menus" in ai_response:
                menus_data = ai_response["menus"]
            else:
                print("Error: ai_response does not have expected format")
                return False
            
            # Group menus by member_id
            menus_by_member = {}
            for menu_item in menus_data:
                # Handle both MenuStruct objects and dictionaries
                if hasattr(menu_item, 'member_id'):
                    member_id = menu_item.member_id
                else:
                    member_id = menu_item.get('member_id')
                    
                if member_id not in menus_by_member:
                    menus_by_member[member_id] = []
                menus_by_member[member_id].append(menu_item)
            
            for member_id in member_ids:
                try:
                    member = FamilyMember.objects.get(id=member_id)
                except FamilyMember.DoesNotExist:
                    continue
                    
                # Create daily plan
                daily_plan, created = WeeklyMealPlan.objects.get_or_create(
                    family_member=member,  
                    start_date=target_date,  
                    defaults={
                        'end_date': target_date  
                    }
                )
                
                
                member_menus = menus_by_member.get(member_id, [])
                for menu_item in member_menus:
                    try:
                        print("log1 menu_item.date")
                        print(menu_item.date) 
                        # Handle both MenuStruct objects and dictionaries
                        if hasattr(menu_item, 'recipe'):
                            recipe_list = menu_item.recipe
                            menu_date = target_date  
                            meal_time = menu_item.meal_time
                        else:
                            recipe_list = menu_item.get("recipe", [])
                            menu_date = target_date  
                            meal_time = menu_item.get("meal_time", "lunch")
                        
                        print("log2")
                        print(menu_date) 
                        if isinstance(recipe_list, dict):
                            recipe_list = [recipe_list]
                        
                        print("log3")
                        for recipe_data in recipe_list:
                            print("log4")
                            # Handle both Recipe objects and dictionaries
                            if hasattr(recipe_data, 'name'):
                                recipe_name = recipe_data.name
                                recipe_instructions = recipe_data.instructions
                                recipe_time = recipe_data.time_estimated
                                recipe_ingredients = getattr(recipe_data, 'recipe_ingredients', [])
                            else:
                                recipe_name = recipe_data.get("name", "Default Recipe")
                                recipe_instructions = recipe_data.get("instructions", "No instructions provided")
                                recipe_time = recipe_data.get("time_estimated", "30 min")
                                recipe_ingredients = recipe_data.get("recipe_ingredients", [])
                            
                            print("log5")
                            # Create or get Recipe
                            recipe, created = Recipe.objects.get_or_create( 
                                name=recipe_name,
                                defaults={
                                    'instructions': recipe_instructions,
                                    'estimated_time': recipe_time,
                                    'diners': 1
                                }
                            )
                            print("log6")
                            
                            # Process ingredients if recipe was created or if we want to update ingredients
                            if created or True:  
                                # Clear existing ingredients for this recipe
                                recipe.recipe_ingredients.all().delete()
                                
                                # Add new ingredients
                                for ingredient_data in recipe_ingredients:
                                    if isinstance(ingredient_data, dict):
                                        ingredient_name = ingredient_data.get('name', '')
                                        quantity = ingredient_data.get('quantity', 1)
                                        unit = ingredient_data.get('unit', 'piece')
                                        
                                        if ingredient_name:
                                            # Create or get ingredient
                                            ingredient, _ = Ingredient.objects.get_or_create(
                                                name=ingredient_name
                                            )
                                            
                                            # Create RecipeIngredient relationship
                                            RecipeIngredient.objects.create(
                                                recipe=recipe,
                                                ingredient=ingredient,
                                                quantity=quantity,
                                                unit=unit
                                            )
                            print("log7 ") 
                            print(menu_date) 
                            # Create Menu
                            menu = Menu.objects.create(
                                meal_plan=daily_plan,
                                date=target_date, 
                                meal_time=meal_time
                            )
                            
                            print("log8") 
                            # Create MenuRecipe relationship
                            MenuRecipe.objects.create(
                                menu=menu,
                                recipe=recipe,
                            )
                            
                    except Exception as menu_error:
                        print(f"Error processing individual menu: {menu_error}")
                        continue
                        
            return res
            
        except Exception as e:
            print(f"General error in save_menu_to_db: {e}")
            return False
    
    def _process_ai_response_item(self, item, member_name):
        """Processes an AI response item to adapt it to expected schema"""
        if not item:
            return None
            
        required_fields = {"meal_time", "recipe"}
        missing_fields = required_fields - set(item.keys())
        
        if missing_fields:
            print(f"Missing fields for {member_name}: {missing_fields}")
            # Try to complete missing fields with default values
            for field in missing_fields:
                if field == "meal_time":
                    item["meal_time"] = "lunch"
                elif field == "recipe":
                    item["recipe"] = [{
                        "name": "Default recipe",
                        "recipe_ingredients": ["Ingredient 1"],
                        "instructions": "Default instructions",
                        "time_estimated": "30 min"
                    }]
        
        # Check recipe format
        if "recipe" in item and not isinstance(item["recipe"], list):
            item["recipe"] = [item["recipe"]]
            
        # Check each recipe
        if "recipe" in item:
            for i, recipe in enumerate(item["recipe"]):
                if not isinstance(recipe, dict):
                    item["recipe"][i] = {"name": str(recipe), "recipe_ingredients": [], "instructions": "", "time_estimated": ""}
                else:
                    # Check required recipe fields
                    recipe_fields = {"name", "recipe_ingredients", "instructions", "time_estimated"}
                    missing_recipe_fields = recipe_fields - set(recipe.keys())
                    for field in missing_recipe_fields:
                        if field == "name":
                            recipe["name"] = "Unnamed recipe"
                        elif field == "recipe_ingredients":
                            recipe["recipe_ingredients"] = []
                        elif field == "instructions":
                            recipe["instructions"] = ""
                        elif field == "time_estimated":
                            recipe["time_estimated"] = "30 min"
        
        return item

def generate_daily_menus(self, family_member_ids):
    """Generates daily menus for specified members"""
    try:
        family_members = [(id, FamilyMember.objects.get(id=id).name) for id in family_member_ids]
        
        # Generate menus with AI
        ai_menus = self.get_ai_menu(family_members)
        
        # Save to database
        success = self.save_menu_to_db(ai_menus, family_member_ids)
        
        if success:
            return {"message": "Menus generated and saved successfully", "menus": ai_menus}
        else:
            return {"error": "Error saving menus to database"}
            
    except Exception as e:
        print(f"Error in generate_daily_menus: {e}")
        return {"error": str(e)}

def filter_menus_by_meal_time(all_menus):
    """
    Filters menus to keep only one of each meal_time per member
    """
    filtered_menus = []
    member_meal_times = {}  # To track which meal_times we've already added per member
    
    for menu in all_menus:
        member_id = menu.member_id
        meal_time = menu.meal_time
        
        # Initialize dictionary for this member if it doesn't exist
        if member_id not in member_meal_times:
            member_meal_times[member_id] = set()
        
        # Only add if we haven't seen this meal_time for this member
        if meal_time not in member_meal_times[member_id]:
            member_meal_times[member_id].add(meal_time)
            filtered_menus.append(menu)
            print(f"Added menu {meal_time} for member {menu.member_name}")
        else:
            print(f"Skipping duplicate menu {meal_time} for member {menu.member_name}")
    
    print(f"Filtered menus: {len(filtered_menus)} of {len(all_menus)} original")
    return filtered_menus


