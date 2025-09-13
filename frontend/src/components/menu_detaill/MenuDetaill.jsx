import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Card, List, ListItem, ListItemText, ListItemButton, CardActionArea, CardMedia, CardContent, Paper, Grid, Stack } from '@mui/material';

import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { StateContext } from '../../App';
import RecipeCard from '../recipe/RecipeCard';
import MenuDetaillListItem from './MenuDetaillListItem';

function MenuDetaill({data}) {
    const  { nav, setRecipeId } = useContext(StateContext);
    const [open, setOpen] = React.useState(false);
    
      const handleClick = () => {
        setOpen(!open);
      };

    return (
        <Stack direction="column" spacing={2}
            sx={{
                justifyContent: "center",
                alignItems: "stretch",
            }}
        >
            <Typography variant="h3" component="h3">
                {data.day + ' ' +
                data.foodMoment}
            </Typography>
            <List
                sx={{ width: '100%', }}
                component="nav">
                {
                    data.recipeList.map(recipe => 
                        <MenuDetaillListItem data={recipe}/>
                    )
                }
            </List>
        </Stack>
    )

}

export default MenuDetaill;