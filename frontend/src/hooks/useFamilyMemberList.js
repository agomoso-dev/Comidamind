import { useState, useEffect, useContext } from "react";
import { StateContext } from "../App";

export default function useFamilyMemberList() { 
    const  { nav, famId } = useContext(StateContext);
    
    const API_ENDPOINT = "http://127.0.0.1:5000/FamilyUnit/" + famId + "/";

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

            const famMemberList = responseJson.members.map(member => 
                    member = {
                        id: 0,
                        name: member.name,
                        picture: "wellcomeImg.jpg",
                        weight: member.weight, 
                        height: member.height,
                        sedentarism:member.activity_level,
                        objective:member.objective
                    }
            )

            setdata ({
                familyId: famId,
                famMemberList:famMemberList,
            });
            console.log(responseJson.members)
            if( response.error ) throw { message: responseJson.error.message };
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