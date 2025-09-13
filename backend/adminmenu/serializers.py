# import serializer from rest_framework
from rest_framework import serializers 
from django.contrib.auth.models import User
# import model from models.py
from .models import FamilyUnit, FamilyMember, WeeklyMealPlan, MenuRecipe, Menu, Recipe, RecipeCategory, Ingredient, RecipeIngredient

from pprint import pprint

class IngredientSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.ReadOnlyField()
    class Meta:
        model = Ingredient
        fields = ['id', 'name',]

class RecipeCategorySerializer(serializers.HyperlinkedModelSerializer ):
    id = serializers.ReadOnlyField()

    class Meta:
        model = RecipeCategory
        fields = ['id', 'name']


class RecipeIngredientSerializer(serializers.HyperlinkedModelSerializer ):
    ingredient = IngredientSerializer()

    class Meta:
        model = RecipeIngredient
        fields = ['ingredient', 'quantity', 'unit',]

class RecipeSerializer(serializers.HyperlinkedModelSerializer ):
    categories = RecipeCategorySerializer()
    id = serializers.ReadOnlyField()
    recipe_ingredients=RecipeIngredientSerializer(many=True)
    
    class Meta:
        model = Recipe
        fields = ['id', 'name', 'instructions', 'estimated_time', 'diners', 'image', 'categories', 'recipe_ingredients']

class MenuSerializer(serializers.HyperlinkedModelSerializer ):
    id = serializers.ReadOnlyField() 
    recipes=RecipeSerializer(many=True)
    
    class Meta:
        model = Menu
        fields = ['id', 'date', 'meal_time', 'recipes']

class MealPlanSerializer(serializers.HyperlinkedModelSerializer ):
    menus= MenuSerializer(many=True)
    id = serializers.ReadOnlyField()

    class Meta:
        model = WeeklyMealPlan
        fields = ['id', 'start_date', 'end_date', 'menus']

class FamilyMemberSerializer(serializers.HyperlinkedModelSerializer ):
    weeklyMealPlans=MealPlanSerializer(many=True)
    id = serializers.ReadOnlyField()

    class Meta:
        model = FamilyMember
        #todo relaations: restrictions ingredients PhysicalActivity
        fields = ['id', 'name', 'birth_date', 'gender', 'weight', 'height', 'activity_level', 'photo', 'objective', 'weeklyMealPlans']

class UserSerializer(serializers.HyperlinkedModelSerializer):
    lookup_field= 'username' 
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        fields = ['username', 'password', 'email']

class FamilyUnitSerializer(serializers.HyperlinkedModelSerializer ):
    id = serializers.ReadOnlyField()
    user= UserSerializer()
    members = FamilyMemberSerializer(many=True) 

    # specify model and fields
    class Meta:   
        model = FamilyUnit
        fields = ['id', 'name', 'user', 'members']
 
    def create(self, validated_data):
        user = validated_data.pop('user')
        user = User.objects.create_user(**user) 
        members=validated_data.pop('members')
        fam= FamilyUnit.objects.create(user= user, **validated_data,)
        return fam
    
 
