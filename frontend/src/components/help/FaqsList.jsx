import React, { useContext, useState } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import { StateContext } from '../../App';

    
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import FaqCard from './FaqCard';

export default function FaqsList({data}) {
    const  { nav, famId } = useContext(StateContext);

  return (
    <List
      sx={{ width: '100%', }}
      component="nav"
    >
        {
            data.faqsList.map(faq => 
                <FaqCard data={faq}/>
            )
        }
    </List>
  );
}