import React, { useState, useContext } from 'react';
import { StateContext } from '../../App';

import Typography from '@mui/material/Typography';
import { Button, Grid, IconButton, Stack } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import RecipeFilterSection from '../../components/recipe/RecipeFilterSection';
import RecipeListSection from '../../components/recipe/RecipeListSection';
import MenuDetaillSection from '../../components/menu_detaill/MenuDetaillSection';
import useMenuDetaill from '../../hooks/useMenuDetaill';

function PgMenuDetaill() {
    const  { nav, famId } = useContext(StateContext);
    const  apiRes = useMenuDetaill();
    return (
        
        <Stack direction="column" spacing={2} 
                    sx={{
                        justifyContent: "center",
                        alignItems:'center',
                    }}
            >
            <Typography variant="h2" component="h2">
                Menu Detaill Title
            </Typography>
            <MenuDetaillSection apiRes={apiRes}/>
            <Button variant="contained" onClick={()=>{nav("/menu/all")}}>
                See All Menus
            </Button>
        </Stack>  
  )
}

export default PgMenuDetaill;