import React, { useState, useContext } from 'react';
import { StateContext } from '../../App';

import Typography from '@mui/material/Typography';
import { Button, Grid, IconButton, Stack } from '@mui/material';
import FamilyMemberList from '../../components/family/FamilyMemberList';
import FamilyMemberListSection from '../../components/family/FamilyMemberListSection';

function PgFamily() {
    
    const  { nav, famId } = useContext(StateContext);

    return (
        <Stack direction="column" spacing={2} 
                    sx={{
                        justifyContent: "center",
                        alignItems:'center',
                    }}
            >
            <Stack direction="row" spacing={2} 
                    sx={{
                        justifyContent: "center",
                        alignItems:'center',
                    }}
                >
                <Typography variant="h2" component="h2">
                    Family 
                </Typography>
                <Button variant="contained" onClick={()=>{nav("/family/add")}}>
                    Add Member
                </Button>
            </Stack>

            <FamilyMemberListSection/>
            <Button variant="contained" onClick={()=>{nav("/family/invite")}}>
                Invite Family Member
            </Button>
        </Stack>  
  )
}

export default PgFamily;