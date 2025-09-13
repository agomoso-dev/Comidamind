import { useState, useEffect } from "react";

export default function useAllMenuList(fam) { 

    
    const API_ENDPOINT = `https://api.weatherapi.com/v1/current.json?key=${'59b0a04d42264d33861121600251102'}&q=granada`;

    const [error, seterror] = useState(false);
    const [msg, setmsg] = useState(null);
    const [data, setdata] = useState(null);
    const [loading, setloading] = useState(true);

    const date = new Date();

    useEffect(() => {
    const fetchData = async () => {
        setloading(true);
        seterror(false);
        console.log('fetchData 2 ') 
        try{
            if( (!(date + '').trim()) ) throw { message: "Date Format Error"};
            const response = await fetch( API_ENDPOINT);
            const responseJson = await response.json();
            console.log(responseJson)
            setdata ({
                familyId: fam,
                dayList:[
                    {
                        day: date,
                        foodMomentList: [
                            {
                                name: 'Breakfast',
                                menuList: [
                                    {
                                        id: 1,
                                        famMemberList:[
                                            {
                                                id: 1,
                                                name: "maricarmen",
                                                picture: null,
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: 'Lunch',
                                menuList: [
                                    {
                                        id: 1,
                                        famMemberList:[
                                            {
                                                id: 1,
                                                name: "maricarmen",
                                                picture: null,
                                            },
                                            {
                                                id: 2,
                                                name: "Jose",
                                                picture: null,
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: 'Dinner',
                                menuList: [
                                    {
                                        id: 1,
                                        famMemberList:[
                                            {
                                                id: 1,
                                                name: "maricarmen",
                                                picture: null,
                                            }
                                        ]
                                    }
                                ]
                            },
                        ],
                    },{
                        day: date,
                        foodMomentList: [
                            {
                                name: 'Breakfast',
                                menuList: [
                                    {
                                        id: 1,
                                        famMemberList:[
                                            {
                                                id: 1,
                                                name: "maricarmen",
                                                picture: null,
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: 'Lunch',
                                menuList: [
                                    {
                                        id: 1,
                                        famMemberList:[
                                            {
                                                id: 1,
                                                name: "maricarmen",
                                                picture: null,
                                            },
                                            {
                                                id: 2,
                                                name: "Jose",
                                                picture: null,
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: 'Dinner',
                                menuList: [
                                    {
                                        id: 1,
                                        famMemberList:[
                                            {
                                                id: 1,
                                                name: "maricarmen",
                                                picture: null,
                                            }
                                        ]
                                    }
                                ]
                            },
                        ],
                    },{
                        day: date,
                        foodMomentList: [
                            {
                                name: 'Breakfast',
                                menuList: [
                                    {
                                        id: 1,
                                        famMemberList:[
                                            {
                                                id: 1,
                                                name: "maricarmen",
                                                picture: null,
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: 'Lunch',
                                menuList: [
                                    {
                                        id: 1,
                                        famMemberList:[
                                            {
                                                id: 1,
                                                name: "maricarmen",
                                                picture: null,
                                            },
                                            {
                                                id: 2,
                                                name: "Jose",
                                                picture: null,
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: 'Dinner',
                                menuList: [
                                    {
                                        id: 1,
                                        famMemberList:[
                                            {
                                                id: 1,
                                                name: "maricarmen",
                                                picture: null,
                                            }
                                        ]
                                    }
                                ]
                            },
                        ],
                    },{
                        day: date,
                        foodMomentList: [
                            {
                                name: 'Breakfast',
                                menuList: [
                                    {
                                        id: 1,
                                        famMemberList:[
                                            {
                                                id: 1,
                                                name: "maricarmen",
                                                picture: null,
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: 'Lunch',
                                menuList: [
                                    {
                                        id: 1,
                                        famMemberList:[
                                            {
                                                id: 1,
                                                name: "maricarmen",
                                                picture: null,
                                            },
                                            {
                                                id: 2,
                                                name: "Jose",
                                                picture: null,
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: 'Dinner',
                                menuList: [
                                    {
                                        id: 1,
                                        famMemberList:[
                                            {
                                                id: 1,
                                                name: "maricarmen",
                                                picture: null,
                                            }
                                        ]
                                    }
                                ]
                            },
                        ],
                    },{
                        day: date,
                        foodMomentList: [
                            {
                                name: 'Breakfast',
                                menuList: [
                                    {
                                        id: 1,
                                        famMemberList:[
                                            {
                                                id: 1,
                                                name: "maricarmen",
                                                picture: null,
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: 'Lunch',
                                menuList: [
                                    {
                                        id: 1,
                                        famMemberList:[
                                            {
                                                id: 1,
                                                name: "maricarmen",
                                                picture: null,
                                            },
                                            {
                                                id: 2,
                                                name: "Jose",
                                                picture: null,
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: 'Dinner',
                                menuList: [
                                    {
                                        id: 1,
                                        famMemberList:[
                                            {
                                                id: 1,
                                                name: "maricarmen",
                                                picture: null,
                                            }
                                        ]
                                    }
                                ]
                            },
                        ],
                    },
                ],
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