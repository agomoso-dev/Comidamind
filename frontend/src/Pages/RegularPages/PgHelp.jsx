import React, { useState, useContext } from 'react';
import { StateContext } from '../../App';

import Typography from '@mui/material/Typography';
import { Button, Grid, IconButton, Stack } from '@mui/material';
import DataFetcherEatingToday from '../../components/eating_today/DataFetcherEatingToday';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { NavLink, useNavigate } from 'react-router-dom';
import useFaqsList from '../../hooks/useFaqsList';
import FaqsList from '../../components/help/FaqsList';

function PgHelp() {
    const  { nav, famId } = useContext(StateContext);
    const  faqs = useFaqsList();

    return (
        <Stack direction="column" spacing={2} 
                    sx={{
                        justifyContent: "center",
                        alignItems:'center',
                    }}
            >
            <Typography variant="h2" component="h2">
                Help
            </Typography>
            <Typography variant="h3" component="h3">
                FAQs
            </Typography>
            <FaqsList data={faqs}/>
            <Typography variant="h3" component="h3">
                Do you need more help?
            </Typography>
            <Button variant="contained" onClick={()=>{nav("/contact")}}>
                Contact
            </Button>
        </Stack>  
  )
}

export default PgHelp;