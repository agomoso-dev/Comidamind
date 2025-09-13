from pydantic import BaseModel, root_validator
from datetime import date, datetime
from typing import List, Optional, Dict, Any
from pprint import pprint

class RecipeStruct(BaseModel):
    name: str = ""
    recipe_ingredients: List[str] = []
    instructions: str = ""
    time_estimated: str = "30 min"
    
class MenuStruct(BaseModel):
    date: Any = None  # Will accept any type and convert it in the validator
    meal_time: str = "lunch"
    recipe: Any = None  # Will accept any type and convert it in the validator
    member_id: Optional[int] = None
    member_name: Optional[str] = None
    
    @root_validator(pre=True)
    def validate_and_transform(cls, values):
        # Ensure that date is a date object
        if "date" not in values or values["date"] is None:
            values["date"] = datetime.now().date()
        elif not isinstance(values["date"], date):
            try:
                strdate= values["date"]
                spliteddate = strdate.split('-')
                year=int(spliteddate[0])
                month=int(spliteddate[1])
                day=int(spliteddate[2])
                values["date"] = datetime(year, month, day)

            except (ValueError, TypeError):
                values["date"] = datetime.now().date()
        
        # Ensure that meal_time has a valid value
        if "meal_time" not in values or not values["meal_time"]:
            values["meal_time"] = "lunch"
        
        # Transform recipe to expected structure
        if "recipe" not in values or values["recipe"] is None:
            values["recipe"] = [{
                "name": "Default meal",
                "ingredients": ["Generic ingredient"],
                "instructions": "Basic instructions",
                "time_estimated": "30 min"
            }]
        elif isinstance(values["recipe"], str):
            values["recipe"] = [{
                "name": values["recipe"],
                "ingredients": ["Generic ingredient"],
                "instructions": "Basic instructions",
                "time_estimated": "30 min"
            }]
        elif isinstance(values["recipe"], dict):
            values["recipe"] = [values["recipe"]]
        elif isinstance(values["recipe"], list) and values["recipe"] and not isinstance(values["recipe"][0], dict):
            values["recipe"] = [{
                "name": str(item),
                "ingredients": ["Generic ingredient"],
                "instructions": "Basic instructions",
                "time_estimated": "30 min"
            } for item in values["recipe"]]
            
        return values
    
class MenuRequest(BaseModel):
    names: list[str]  
    ids: list[int]
    date: str

