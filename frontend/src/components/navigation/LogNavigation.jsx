import {Button, AppBar } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom'
import React, {useState} from 'react'

function LogNavigation() {
    const nav = useNavigate();

    return (
        <nav>
            <Button onClick={()=> { nav("/login")} } color='inherit'>
                LogIn
            </Button>
            <Button onClick={()=> { nav("/register")} } color='inherit'>
                Register
            </Button>
        </nav>
    )
}

export default LogNavigation;