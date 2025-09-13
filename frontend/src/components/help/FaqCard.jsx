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

export default function FaqCard({data}) {
    const  { nav, famId } = useContext(StateContext);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={data.question} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary={data.answer} />
          </ListItem>
        </List>
      </Collapse>
    </Card>
  );
}