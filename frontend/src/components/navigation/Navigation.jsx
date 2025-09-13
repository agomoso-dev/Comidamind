import {Button, AppBar } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom'
import React, {useContext, useState} from 'react'
import { StateContext } from '../../App';

function Navigation() {
    const  { nav, famId } = useContext(StateContext);

    return (
        <nav>
            <Button onClick={()=> { nav("/home")} } color='inherit'>
                Home
            </Button>
            <Button onClick={()=> { nav("/recipe")} } color='inherit'>
                Recipes
            </Button>
            <Button onClick={()=> { nav("/family")} } color='inherit'>
                Family
            </Button>
            <Button onClick={()=> { nav("/help")} } color='inherit'>
                Help
            </Button>
        </nav>
    )
}

export default Navigation;