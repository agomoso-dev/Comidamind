import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button, Grid, IconButton, Stack } from '@mui/material';
import DataFetcherEatingToday from '../../components/eating_today/DataFetcherEatingToday';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { NavLink, useNavigate } from 'react-router-dom';

function FormInviteFamilyMember() {
    const nav = useNavigate();

    return (
        <Stack direction="column" spacing={2} 
                    sx={{
                        justifyContent: "center",
                        alignItems:'center',
                    }}
            >
            <Typography variant="h3" component="h3">
                Invite Family Member
            </Typography>
                <Button variant="contained" onClick={()=>{nav("/family")}}>
                    Add Member
                </Button>
        </Stack>  
  )
}

export default FormInviteFamilyMember;