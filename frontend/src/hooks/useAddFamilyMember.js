import { useState, useEffect, useContext } from "react";
import { StateContext } from "../App";

export default function useAddFamilyMember(data) { 
    const API_ENDPOINT = "http://127.0.0.1:5000/familyMember/";

    const [error, seterror] = useState(false);
    const [msg, setmsg] = useState('');
    const [loading, setloading] = useState(true);

    const  {nav, 
          userName, setUserName, 
          famId, setfamId,
          userLastName, setUserLastName,
          userEmail, setUserEmail,
         } = useContext(StateContext);
         
    console.log(data)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
    };
 
    useEffect(() => {
    const fetchData = async () => {
        setloading(true);
        seterror(false);
        try{
            //prevalidation
            //if( (!pw == pw2) ) throw { message: "Error!: pasword not the same"};

            const response = await fetch( API_ENDPOINT, requestOptions);
            const responseJson = await response.json();
            


            if( response.error ) throw { message: response.error.message };
            if( response.status != 200 ) throw { message: "The Family Member could not be created" };
        } catch (error) {
            console.log('error')
            seterror(true);
            setmsg(error.message) ;
        } finally {
            setloading(false); 
        }
    }
    fetchData();
    },[data])

  return {
    error:error,
    msg:msg,
    loading:loading,
  };
}