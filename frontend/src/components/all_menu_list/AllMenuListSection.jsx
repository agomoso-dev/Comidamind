import React, { useState, useContext } from 'react';
import { StateContext } from '../../App';

import Typography from '@mui/material/Typography';
import { Button, Card, Grid, IconButton, Stack, TextField } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import AllMenuList from './AllMenuList';

function AllMenuListSection({apiRes}) {
    const  { nav, famId } = useContext(StateContext);
    const [searchValue, setSearchValue] = useState('');

    if (apiRes.loading) return <p>loading...</p>
    if (apiRes.error) return <p>ERROR: {apiRes.msg}</p>
    
    return (
        <AllMenuList data={apiRes.data}></AllMenuList>
    )
}

export default AllMenuListSection;