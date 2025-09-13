import React, { useState, useContext } from 'react';
import { StateContext } from '../../App';

import Typography from '@mui/material/Typography';
import { Button, Grid, IconButton, Stack } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import RecipeFilterSection from '../../components/recipe/RecipeFilterSection';

function PgFilteredRecipes() {
    const  { nav, famId } = useContext(StateContext);

    return (
        <Stack direction="column" spacing={2} 
                    sx={{
                        justifyContent: "center",
                        alignItems:'center',
                    }}
            >
            <Typography variant="h2" component="h2">
                Filtered Recipes
            </Typography>
            <Stack direction="row" spacing={2} 
                    sx={{
                        justifyContent: "center",
                        alignItems:'center',
                    }}
            >
                <Button variant="contained" onClick={()=>{nav("/recipe")}}>
                    Quit Filter
                </Button>
                <RecipeFilterSection/>
            </Stack> 
            
            
        </Stack>  
  )
}

export default PgFilteredRecipes;