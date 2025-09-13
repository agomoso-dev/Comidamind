import React, { useContext, useState } from 'react';
import { Button, Grid, Stack, Typography } from '@mui/material';
import { StateContext } from '../../App';
import EatingTodayComp from '../eating_today/EatingTodayComp';

function AllMenuList({data}) {
    const  { nav, famId } = useContext(StateContext);
    
    //const columnSize = 12/data.foodMomentList.length

    return (
        <Stack direction="column" spacing={2} 
                    sx={{
                        justifyContent: "center",
                        alignItems:'center',
                    }}
            >
            {data.dayList.map(day=>
                <Stack direction="column" spacing={2} 
                        sx={{
                            justifyContent: "center",
                            alignItems:'center',
                        }}
                >
                    <Typography variant="h3" component="h3">
                        {day.day.getDate() + '/' + (day.day.getMonth() + 1) + '/' + (1900 + day.day.getYear())} 
                    </Typography>
                    <EatingTodayComp data={day}></EatingTodayComp>
                </Stack>
            )}
        </Stack>
    )
}

export default AllMenuList