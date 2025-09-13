import React, { useState, useContext } from 'react';
import { StateContext } from '../../App';

import Typography from '@mui/material/Typography';
import { Button, Card, Grid, IconButton, Stack, TextField } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuDetaill from './MenuDetaill';

function MenuDetaillSection({apiRes}) {
    const  { nav, famId } = useContext(StateContext);
    const [searchValue, setSearchValue] = useState('');

    if (apiRes.loading) return <p>loading...</p>
    if (apiRes.error) return <p>ERROR: {apiRes.msg}</p>
    
    return (
        <MenuDetaill data={apiRes.data}></MenuDetaill>
    )
}

export default MenuDetaillSection;