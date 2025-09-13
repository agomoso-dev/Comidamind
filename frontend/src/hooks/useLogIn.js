import { useState, useEffect, useContext } from "react";
import { StateContext } from "../App";

export default function useLogIn(user, pw) { 

    
    const API_ENDPOINT = 'http://127.0.0.1:5000/login/';

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
        username : user , password : pw,
    }
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
    };

    useEffect(() => {
    const fetchData = async () => {
        setloading(true);
        seterror(false); 
        console.log('pw: ' + pw) 
        try{
            //TODO: API FREE VALIDATION
            if( (!pw.trim()) ) throw { message: "Error!: pasword not valid"};
            if( (!user.trim()) ) throw { message: "Error!: username not valid"};

            const response = await fetch( API_ENDPOINT, requestOptions);
            const responseJson = await response.json();
            // console.log("AAAAAAAAAA");
            // console.log(responseJson);
            setfamId(responseJson.familyId);
            
            if( response.error ) throw { message: responseJson.error.message };
            if( response.status != 200 ) throw { message: "Error at login" };
        } catch (error) {
            console.log('error')
            seterror(true);
            setmsg(error.message) ;
        } finally {
            setloading(false);
        }
    }
    fetchData();
    },[user, pw])

  return {
    error:error,
    msg:msg,
    loading:loading,
  };
}