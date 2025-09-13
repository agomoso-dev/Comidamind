import { useState, useEffect, useContext } from "react";
import { StateContext } from "../App";

export default function useRecipeList() { 
    const  { nav, famId } = useContext(StateContext);
    
    const API_ENDPOINT = `https://api.weatherapi.com/v1/current.json?key=${'59b0a04d42264d33861121600251102'}&q=granada`;

    const [error, seterror] = useState(false);
    const [msg, setmsg] = useState(null);
    const [data, setdata] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {
    const fetchData = async () => {
        setloading(true);
        seterror(false);
        console.log('fetchData 2 ') 
        try{
            if( (!(famId + '').trim()) ) throw { message: "Id Format Error"};
            const response = await fetch( API_ENDPOINT);
            const responseJson = await response.json();
            console.log(responseJson)
            setdata ({
                familyId: famId,
                recipeList:[
                    {
                        id: 1,
                        name: "nombre random de receta",
                        picture: "wellcomeImg.jpg",

                    }, {
                        id: 2,
                        name: "habra que probar diferentes longitudes",
                        picture: "wellcomeImg.jpg",
                    }, {
                        id: 3,
                        name: "tralalerotralala",
                        picture: "wellcomeImg.jpg", 

                    }, {
                        id: 4,
                        name: "extreamelly long name extextreamelly long name reamelly long name ",
                        picture: "wellcomeImg.jpg",
                    }]
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