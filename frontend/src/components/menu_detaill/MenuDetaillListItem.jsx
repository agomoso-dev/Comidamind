import React, { useContext, useState } from 'react';
import { Button, Grid, Stack, Card } from '@mui/material';
import { StateContext } from '../../App';

    
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import RecipeCard from '../recipe/RecipeCard';

export default function MenuDetaillListItem({data}) {
    const  { nav, famId } = useContext(StateContext);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card>
        <ListItemButton onClick={handleClick} sx={{ width: '100%', }}>
        <ListItemText primary={data.recipePos} sx={{ width: '100%', }}/>
        {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}>
            <RecipeCard recipe={data.recipe}/>
            </ListItem>
        </List>
        </Collapse>
    </Card>
  );
}