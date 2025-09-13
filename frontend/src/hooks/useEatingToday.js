import { useState, useEffect, useContext } from "react";
import { StateContext } from "../App";

export default function useEatingToday(date) { 

    const  { nav, famId, menuId } = useContext(StateContext);
    
    const API_ENDPOINT = 'http://127.0.0.1:5000/FamilyUnit/';

    const [error, seterror] = useState(false);
    const [msg, setmsg] = useState(null);
    const [data, setdata] = useState(null);
    const [loading, setloading] = useState(true);

    console.log('fetchData 1 ' + date) 

    
    const getData = {
        date : date,
        famid: famId
    }
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(getData).toString()
    }; 

    useEffect(() => {
    const fetchData = async () => {
        setloading(true);
        seterror(false);
        console.log('fetchData 2 ') 
        try{
            if( (!(date + '').trim()) ) throw { message: "Date Format Error"};
            const response = await fetch( API_ENDPOINT , requestOptions);
            const responseJson = await response.json();
            console.log(responseJson)


            const famMemberList = responseJson.members.map(famMember => 
                    {
                        let breakfast = false;
                        let snack1 = false;
                        let lunch = false;
                        let snack2 = false;
                        let dinner = false;

                        let idbreakfast = 0;
                        let idsnack1 = 0;
                        let idlunch = 0;
                        let idsnack2 = 0;
                        let iddinner = 0;
                        
                        famMember.weeklyMealPlans.map(weeklyMealPlan=>{
                            weeklyMealPlan.menus.map(menu=> {
                                if(menu.meal_time=='breakfast' && menu.date==date){
                                    breakfast=true;
                                    idbreakfast=menu.id;
                                }else if(menu.meal_time=='snack1' && menu.date==date){
                                    snack1=true
                                    idsnack1=menu.id;
                                }else if(menu.meal_time=='lunch' && menu.date==date){
                                    lunch=true
                                    idlunch=menu.id;
                                }else if(menu.meal_time=='snack2' && menu.date==date){
                                    snack2=true
                                    idsnack2=menu.id;
                                }else if(menu.meal_time=='dinner' && menu.date==date){
                                    dinner=true
                                    iddinner=menu.id;
                                }
                            })
                        })
                        
                        return {
                            memberid: famMember.id,
                            membername: famMember.name,
                            breakfast:breakfast,
                            snack1:snack1,
                            lunch:lunch,
                            snack2:snack2,
                            dinner:dinner,
                            idbreakfast:idbreakfast,
                            idsnack1:idsnack1,
                            idlunch:idlunch,
                            idsnack2:idsnack2,
                            iddinner:iddinner,
                        }
                    }
                )

            setdata ({
                familyId: famId,
                day: date,
                famMemberList: famMemberList,
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
    },[date])

  return {
    error:error,
    msg:msg,
    data:data,
    loading:loading,
  };
}