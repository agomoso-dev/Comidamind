import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Card, Grid, Stack } from '@mui/material';
import { StateContext } from '../../App';

function MenuPreviewCard({menu,state, idmenu}) {
    const  { nav, famId, setMenuId} = useContext(StateContext);
    return (
        <Card component="span"
                sx={{  padding: '5px', }}
                onClick={()=>{nav("/menu/detaill"); setMenuId(idmenu)}}
                hidden={!state}
            >
            <Typography variant="h4" component="h4" >
                {
                    menu + ' '
                }
            </Typography>
        </Card>
    )

}

export default MenuPreviewCard