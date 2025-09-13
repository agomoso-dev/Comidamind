import { useContext, useEffect, useState } from "react";
import { StateContext } from "../App";

export default function useMenuDetaill() { 
    const  { nav, famId, menuId } = useContext(StateContext);
    
    const API_ENDPOINT = 'http://127.0.0.1:5000/menu/';

    const [error, seterror] = useState(false);
    const [msg, setmsg] = useState(null);
    const [data, setdata] = useState(null);
    const [loading, setloading] = useState(true);

    const eatDate = new Date();

    useEffect(() => {
    const fetchData = async () => {
        setloading(true);
        seterror(false);
        console.log('fetchData 2 ') 
        try{
            if( (!(famId + '').trim()) ) throw { message: "Id Format Error"};
            const response = await fetch( API_ENDPOINT+menuId);
            const responseJson = await response.json();
            console.log(responseJson)
                    
            const recipeList = responseJson.recipes.map(recipe => {
                const ingredientList = recipe.recipe_ingredients.map( ingredient => {
                    return {
                            name:ingredient.ingredient.name,
                            cuantity:ingredient.quantity,
                            unit:ingredient.unit,
                        }
                })
                return {
                    recipePos:recipe.name, 
                    recipe:{
                        id: recipe.id,
                        name: recipe.name,
                        picture: "/wellcomeImg.jpg",
                        ingredientList: ingredientList,
                        stepList:[
                            recipe.instructions,
                        ],
                        categoryList:null,
                        diners:recipe.diners,
                        timeExpeted:recipe.estimated_time,
                    }
                }
            })
            setdata ({
                day: responseJson.date,
                foodMoment:responseJson.meal_time,

                recipeList:recipeList,
            });
            if( responseJson.error ) throw { message: responseJson.error.message };
        } catch (error) {
            console.log('error')
            seterror(true);
            setmsg(error.message) ;
        } finally {
            setloading(false);
        }
    }
    fetchData();
    },[])

  return {
    error:error,
    msg:msg,
    data:data,
    loading:loading,
  };
}