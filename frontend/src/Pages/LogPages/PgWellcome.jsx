import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button, Grid, IconButton, Stack } from '@mui/material';
import DataFetcherEatingToday from '../../components/eating_today/DataFetcherEatingToday';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { NavLink, useNavigate } from 'react-router-dom';

function PgWellcome() {
    const nav = useNavigate();

    return (
        <Stack direction="column" spacing={2} 
                    sx={{
                        justifyContent: "center",
                        alignItems:'center',
                    }}
            >
            <Typography variant="h2" component="h2">
                Wellcome
            </Typography>
            <Stack direction="row" spacing={2} 
                        sx={{
                            justifyContent: "center",
                            alignItems:'center',
                        }}
                >
                <Stack direction="column" spacing={2} sx={{alignItems:"center"}}>
                    <Typography variant="p" component="p">
                        Wellcome Text. Lorem ipsum is a placeholder or dummy text used in typesetting and graphic design for previewing layouts. It features scrambled Latin text, which emphasizes the design over content of the layout. It is the standard placeholder text of the printing and publishing industries.
                    </Typography>
                    <Button variant="contained" onClick={()=>{nav("/login")}}>
                        Start
                    </Button>
                </Stack>  
                
                <img
                    src={"wellcomeImg.jpg"}
                    alt={"wellcomeImg"}
                    loading="lazy"
                    width="40%" height="40%"
                />
            </Stack>  
        </Stack>
  )
}

export default PgWellcome