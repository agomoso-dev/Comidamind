import React, { useState, useContext } from 'react';
import { StateContext } from '../../App';

import Typography from '@mui/material/Typography';
import { Button, Grid, IconButton, Stack } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import RecipeFilterSection from '../../components/recipe/RecipeFilterSection';
import RecipeListSection from '../../components/recipe/RecipeListSection';
import RecipeCard from '../../components/recipe/RecipeCard';
import useRecipeDetaill from '../../hooks/useRecipeDetaill';
import RecipeDetaillSection from '../../components/recipe/RecipeDetaillSection';

function PgRecipeDetaill() {
    const  { nav, famId } = useContext(StateContext);

    const apiRes = useRecipeDetaill();

    return (
        <RecipeDetaillSection apiRes={apiRes}/>
    )
}

export default PgRecipeDetaill;