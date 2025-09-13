import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Grid, Stack } from '@mui/material';
import useFamilyMemberList from '../../hooks/useFamilyMemberList';
import FamilyMemberCard from './FamilyMemberCard';
import { StateContext } from '../../App';

function FamilyMemberList({data}) {
    const  { nav, famId } = useContext(StateContext);
    
    //const columnSize = 12/data.foodMomentList.length

    return (
        <Grid container spacing={2}>
            {
                data.famMemberList.map(member => 
                    <FamilyMemberCard member={member}/>
                )
            }
        </Grid>
    )
}

export default FamilyMemberList