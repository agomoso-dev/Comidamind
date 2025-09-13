import { useState, useEffect, useContext } from "react";
import { StateContext } from "../App";

export default function useRegister(user, mail, pw, pw2) { 
    const API_ENDPOINT = "http://127.0.0.1:5000/users/";

    const [error, seterror] = useState(false);
    const [msg, setmsg] = useState('');
    const [loading, setloading] = useState(true);

    const  {nav, 
          userName, setUserName, 
          famId, setfamId,
          userLastName, setUserLastName,
          userEmail, setUserEmail,
         } = useContext(StateContext);

    const data = {
        username : user , password : pw, email : mail
    }
    console.log(data)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data) 
    };
 
    useEffect(() => {
    const fetchData = async () => {
        setloading(true);
        seterror(false);
        console.log('pw: ' + pw) 
        try{
            //TODO: API FREE VALIDATION
            if( (!pw == pw2) ) throw { message: "Error!: pasword not the same"};
            if( (!pw.trim()) ) throw { message: "Error!: pasword not valid"};


            const response = await fetch( API_ENDPOINT, requestOptions);
            console.log('checkpoint '+ 1)
            console.log( response)
            const responseJson = await response;
            //TODO: api LOG IN VALIDATION
            console.log('checkpoint '+ 2)
            console.log( responseJson)

            
            if( responseJson.error ) throw { message: responseJson.error.message };
            if( responseJson.status != 200 ) throw { message: "the user could not be created" };
            console.log('checkpoint '+ 3)
        } catch (error) {
            console.log('error')
            seterror(true);
            setmsg(error.message) ;
        } finally {
            setloading(false); 
        }
    }
    fetchData();
    },[user, mail, pw, pw2])

  return {
    error:error,
    msg:msg,
    loading:loading,
  };
}