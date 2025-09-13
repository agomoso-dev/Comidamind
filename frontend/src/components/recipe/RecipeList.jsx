import React, { useContext, useState } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import { StateContext } from '../../App';
import RecipePreviewCard from './RecipePreviewCard';

function RecipeList({data}) {
    const  { nav, famId } = useContext(StateContext);
    
    //const columnSize = 12/data.foodMomentList.length

    return (
        <Grid container spacing={5}>
            {
                data.recipeList.map(recipe => 
                    <Grid size={3}><RecipePreviewCard recipe={recipe} /></Grid>
                )
            }
        </Grid>
    )
}

export default RecipeList