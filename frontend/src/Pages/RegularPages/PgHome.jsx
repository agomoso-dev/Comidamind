import React, { useState, useContext } from 'react';
import { StateContext } from '../../App';

import Typography from '@mui/material/Typography';
import { Button, Grid, IconButton, Stack } from '@mui/material';
import DataFetcherEatingToday from '../../components/eating_today/DataFetcherEatingToday';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function PgHome() {

    const  { nav, famId } = useContext(StateContext);

    const [eatDate, setEatDate] = useState(new Date());

    //const [eatingTodayComp, setEatingTodayComp] = useState(<DataFetcherEatingToday fam={famId} day={eatDate.getTime()} />);

    function eatDateAfter() {
        console.log('eat_date_after')
        setEatDate(new Date(eatDate.getTime() + (1 * 24 * 60 * 60 * 1000)))
    }

    function eatDateBefore() {
        console.log('eat_date_before')
        setEatDate(new Date(eatDate.getTime() - (1 * 24 * 60 * 60 * 1000)))
    }

    function formatDate() {
        let date=eatDate.getDate();
        if (date<10){
            date='0'+date
        }
        let month=eatDate.getMonth() + 1;
        if (month<10){
            month='0'+month
        }

        return date + '/' + month + '/' + (1900 + eatDate.getYear());
    }

    function formatDateForApi() {
        let date=eatDate.getDate();
        if (date<10){
            date='0'+date
        }
        let month=eatDate.getMonth() + 1;
        if (month<10){
            month='0'+month
        }

        return (1900 + eatDate.getYear())+ '-' + month + '-' + date ;
    }

    return (
        <Stack direction="column" spacing={2} 
                    sx={{
                        justifyContent: "center",
                        alignItems:'center',
                    }}
            >
            <Typography variant="h2" component="h2">
                What are we eating today?
            </Typography>
            <Stack direction="row" spacing={4} 
                sx={{
                    justifyContent: "center",
                }}
            >
                <Typography variant="h3" component="h3">
                    Date: 
                </Typography>
                <IconButton aria-label="Day Before" color="inherit" onClick={()=>eatDateBefore()}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h3" component="h3">
                    {formatDate()}
                </Typography>
                <IconButton aria-label="Day After" color="inherit" onClick={()=>eatDateAfter()}>
                    <ArrowForwardIcon />
                </IconButton>
            </Stack>    
            <DataFetcherEatingToday fam={famId} day={formatDateForApi()} />
            {/* <Button variant="contained" onClick={()=>{nav("/menu/all")}}>
                See All Menus
            </Button> */}
        </Stack>  
  )
}

export default PgHome