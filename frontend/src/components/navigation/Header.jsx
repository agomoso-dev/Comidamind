
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React, {useState} from 'react'
import Navigation from './Navigation';
import { NavLink, useNavigate } from 'react-router-dom'

function Header({navigation}) {
  const nav = useNavigate();

  return (
      <AppBar position="static">
        <Toolbar>
          {/* Application title */}
          <Typography
            variant="h6"
            onClick={()=>{nav("/")}}
            sx={{
              flexGrow: 1,
              fontSize: { xs: '1rem', sm: '1.5rem' },
            }}
          >
            ComidaMind
          </Typography>
  
          {/* Navigation buttons */}
          {navigation}
        </Toolbar>
      </AppBar>
    );
}

export default Header;