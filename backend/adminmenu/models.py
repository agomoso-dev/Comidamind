from django.db import models
from django.contrib.auth.models import User
import uuid

class Restriction(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    
     #readme: este atributo era de tipo charset, 
    # lo he cambiado a integer, se podria hacer de tipo choices
    severity = models.IntegerField()
    ingredients = models.ManyToManyField('Ingredient', related_name='restrictions', blank=True)

    def __str__(self):
        return self.name

#readme
#hay modelos que tienen la foto puesta directamente y
#  otros que pasan a traves de este modelo, deberiamos de hacerlos todos de la misma forma
# Photo model
class Photo(models.Model):
    image = models.ImageField(upload_to='photos/')
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name 
        
# FamilyUnit model
class FamilyUnit(models.Model):
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, blank=True)#todo: poner unique constraint
    name = models.CharField(max_length=100)
    #readme
    #cambiado: related_name
    photo = models.ForeignKey(Photo, on_delete=models.SET_NULL, null=True, blank=True, related_name='family_unit')

    # users = models.ManyToManyField(User, related_name="family_units")

    def __str__(self):
        return self.name


class FamilyMember(models.Model):
    GENDER_CHOICES = [('male', 'Male'), ('female', 'Female')]
    ACTIVITY_LEVEL_CHOICES = [('low', 'Low'), ('medium', 'Medium'), ('high', 'High')]
    OBJECTIVE_CHOICES = [('lose', 'Lose weight'), ('keep', 'Keep weight'), ('gain', 'Gain weight')]

    name = models.CharField(max_length=100)
    birth_date = models.DateField()
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES)
    weight = models.FloatField()
    height = models.FloatField()
    activity_level = models.CharField(max_length=50, choices=ACTIVITY_LEVEL_CHOICES)
    photo = models.ImageField(upload_to='photos/', null=True, blank=True)

    family_unit = models.ForeignKey(FamilyUnit, on_delete=models.CASCADE, related_name='members')
    restrictions = models.ManyToManyField(Restriction, related_name="members", blank=True)
    ingredients = models.ManyToManyField('Ingredient', through='IngredientFamilyMember', related_name='family_members')

    # todo relation PhysicalActivity
  
    #readme
    #campo añadido: objetivo del miembro familiar
    objective = models.CharField(max_length=50, choices=OBJECTIVE_CHOICES, default='keep')

    def __str__(self):
        return self.name

#readme
# Borrado porque hecreado dos tipos de categoria distinta
# class Category(models.Model):
#     name = models.CharField(max_length=100)
#     def __str__(self):
#         return self.name

#readme
#Creado a partir del antiguo modelo Category
class RecipeCategory(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
        return self.name

#readme
#Creado a partir del antiguo modelo Category
class IngredientCategory(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name

# Ingredient model 
class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(IngredientCategory, on_delete=models.SET_NULL, null=True, related_name="ingredients")

    def __str__(self):
        return self.name

# Recipe model
class Recipe(models.Model):
    name = models.CharField(max_length=100)
    instructions = models.TextField()
    estimated_time = models.CharField(max_length=50, help_text="Estimated time (e.g., '30 min', '1 hour')")
    diners = models.PositiveIntegerField() # ADD default value
    image = models.ImageField(upload_to='recipes/', null=True, blank=True)
    categories = models.ManyToManyField(RecipeCategory, related_name='recipes')
    members = models.ManyToManyField('FamilyMember', through='RecipeMember', related_name='recipes_with_relation')
    def __str__(self):
        return self.name
    
# Relationship between Recipe and Ingredient
class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='recipe_ingredients')
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, related_name='ingredient_recipes')
    quantity = models.FloatField()
    unit = models.CharField(max_length=20)

# Relationships between Recipe and FamilyMember
class RecipeMember(models.Model):
    recipe = models.ForeignKey('Recipe', on_delete=models.CASCADE)
    member = models.ForeignKey('FamilyMember', on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    like_disklike = models.BooleanField(default=True)  
    save_create = models.BooleanField(default=False)

# Relationships between Ingredient and FamilyMember 
class IngredientFamilyMember(models.Model):
    ingredient = models.ForeignKey('Ingredient', on_delete=models.CASCADE)
    member = models.ForeignKey('FamilyMember', on_delete=models.CASCADE)
    not_like = models.CharField(max_length=10,choices=[('prohibe', 'Prohibe'), ('gusta', 'Gusta')])

    #readme: este atributo era de tipo charset, 
    # lo he cambiado a integer, se podria hacer de tipo choices
    gravity = models.IntegerField()

    def __str__(self):
        return f"{self.member.name} - {self.ingredient.name} ({self.not_like}, {self.gravity})"

# Physical activity models
class PhysicalActivity(models.Model):
    name = models.CharField(max_length=100)

    #readme: no se a que te refieres con este atributo, creo que 
    # este atributo no pertenece a esta clase, lo he borrado
    #position = models.CharField(max_length=100)

    duration = models.IntegerField(help_text="Duration in minutes")
    frequency_per_week = models.IntegerField()
    members = models.ManyToManyField('FamilyMember', related_name="activities", blank=True)
    
# Meal Plan model
class WeeklyMealPlan(models.Model):
    family_member = models.ForeignKey('FamilyMember', on_delete=models.CASCADE, null=True, blank=True, related_name="weeklyMealPlans")
    start_date = models.DateField()
    end_date = models.DateField()
    
# Menu model
class Menu(models.Model):
    #readme: aqui falta el campo foods
    MEAL_CHOICES = [('breakfast', 'Breakfast'), ('snack1', 'Snack1'), ('lunch', 'Lunch'), ('snack2', 'Snack2'), ('dinner', 'Dinner')]

    date = models.DateField()
    recipes = models.ManyToManyField('Recipe', through='MenuRecipe', related_name='menus')
    meal_plan = models.ForeignKey(WeeklyMealPlan, on_delete=models.CASCADE, related_name="menus", null=True, blank=True)
    meal_time = models.CharField(max_length=100, choices=MEAL_CHOICES) 
    
    #readme he borrado el atrubito family member porque ya estaba en el meal_plan

# MenuRecipe relationship model Menu and Recipe
class MenuRecipe(models.Model):
    # PLATE_TYPE_CHOICES = [
    #     ('plato', 'Plato'),
    #     ('postre', 'Postre'),
    # ]
    menu = models.ForeignKey('Menu', on_delete=models.CASCADE)
    recipe = models.ForeignKey('Recipe', on_delete=models.CASCADE)
    # plate_type = models.CharField(max_length=10, choices=PLATE_TYPE_CHOICES)

    def __str__(self):
        return f"{self.menu} - {self.recipe} ({self.plate_type})"
    
# Foods model
class Foods(models.Model):
    MEAL_CHOICES = [('breakfast', 'Breakfast'), ('snack1', 'Snack1'), ('lunch', 'Lunch'), ('snack2', 'Snack2'), ('dinner', 'Dinner')]

    name = models.CharField(max_length=100)
    #readme: este campo debe tener los meal choices
    position = models.CharField(max_length=100, choices=MEAL_CHOICES)  
    plate_count = models.PositiveIntegerField(help_text="Cantidad de platos")
    members = models.ManyToManyField('FamilyMember', related_name='foods', blank=True)
    menu = models.ForeignKey('Menu', on_delete=models.CASCADE, related_name='foods', null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.position})"
# ShoppingList model
class ShoppingList(models.Model):
    family_unit = models.ForeignKey(FamilyUnit, on_delete=models.CASCADE, related_name="shopping_lists")
    creation_date = models.DateField(auto_now_add=True)
    ingredients = models.ManyToManyField(Ingredient, through='ShoppingListItem', related_name='shopping_lists')

# ShoppingListItem relationship model ShoppingList and Ingredient
class ShoppingListItem(models.Model):
    shopping_list = models.ForeignKey(ShoppingList, on_delete=models.CASCADE, related_name="items")
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.FloatField()
    unit = models.CharField(max_length=20)
    
  