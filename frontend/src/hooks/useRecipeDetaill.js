import { useState, useEffect, useContext } from "react";
import { StateContext } from "../App";

export default function useRecipeDetaill() { 
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
                recipe:{
                        id: 1,
                        name: "nombre random de receta",
                        picture: "/wellcomeImg.jpg",
                        ingredientList: [
                            {
                                name:"tomato",
                                cuantity:4,
                                unit:null,
                            },{
                                name:"onion",
                                cuantity:100,
                                unit:"grams",
                            },{
                                name:"peper",
                                cuantity:100,
                                unit:"grams",
                            },
                        ],
                        stepList:[
                            "Lorem ipsum dolor sit amet consectetur adipiscing elit mollis torquent malesuada dis, bibendum quisque lacinia tortor semper ",
                            "ac fermentum sociosqu euismod. Consequat felis sed iaculis condimentum natoque habitasse dis egestas curae, ridiculus leo posuere fusce porta nibh hac ad proin, non justo dictum elementum odio euismod",
                            " viverra tincidunt. Fermentum curabitur porttitor sed congue venenatis at lobortis suscipit fringilla tempus maecenas euismod ",
                            "potenti, gravida egestas sociosqu semper sodales himenaeos pulvinar torquent integer risus nunc ante.",
                            "Dictum dapibus tempor et urna pellentesque luctus quis feugiat habitant, mauris felis etiam volutpat magna per potenti vel, dignissim imperdiet non class vivamus ",
                            "conubia torquent orci. Curae senectus posuere mi nascetur cum ac, suscipit elementum interdum aenean odio rhoncus mus, a commodo cras laoreet volutpat. Facilisis ornare ad interdum mus mollis, sociis venenatis luctus ultricies enim",
                            "egestas eros pretium velit.",
                        ],
                        categoryList:[
                            "Lorem",
                            "ipsum",
                            "dolor",
                            "sit",
                            "amet",
                            "consectetur",
                        ],
                        diners:4,
                        timeExpeted:"120",
                    }
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