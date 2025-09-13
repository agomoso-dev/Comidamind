import React, { useState, useContext } from 'react';
import { StateContext } from '../../App';

import Typography from '@mui/material/Typography';
import { Button, Card, Grid, IconButton, Stack, TextField } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

function RecipeFilterSection() {
    const  { nav, famId } = useContext(StateContext);
    const [searchValue, setSearchValue] = useState('');

    return (
        <Stack direction="row" spacing={2} 
                sx={{
                    justifyContent: "center",
                    alignItems:'center',
                }}
        >
            <Button variant="contained" onClick={()=>{nav("/recipe/filter")}}>
                Filter
            </Button>
            <Stack direction="row" spacing={2} 
                    sx={{
                        pading:'18px',
                        justifyContent: "center",
                        alignItems:'center',
                    }}
            >
                <TextField label="Search by recipe name" fullWidth  margin="dense"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                />
                <Button variant="contained" onClick={()=>{nav("/recipe/filter/res")}}>
                    Search
                </Button>
            </Stack> 
        </Stack>  
  )
}

export default RecipeFilterSection;