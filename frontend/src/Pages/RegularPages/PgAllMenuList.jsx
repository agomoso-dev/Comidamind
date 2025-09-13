import React, { useState, useContext } from 'react';
import { StateContext } from '../../App';

import Typography from '@mui/material/Typography';
import { Button, Grid, IconButton, Stack } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import RecipeFilterSection from '../../components/recipe/RecipeFilterSection';
import RecipeListSection from '../../components/recipe/RecipeListSection';
import useAllMenuList from '../../hooks/useAllMenuList';
import AllMenuListSection from '../../components/all_menu_list/AllMenuListSection';

function PgAllMenuList() {
    const  { nav, famId } = useContext(StateContext);

    const  apiRes = useAllMenuList();

    return (
        <Stack direction="column" spacing={2} 
                    sx={{
                        justifyContent: "center",
                        alignItems:'center',
                    }}
            >
            <Typography variant="h2" component="h2">
                All Menus
            </Typography>
            <AllMenuListSection apiRes={apiRes}></AllMenuListSection>
        </Stack>  
  )
}

export default PgAllMenuList;