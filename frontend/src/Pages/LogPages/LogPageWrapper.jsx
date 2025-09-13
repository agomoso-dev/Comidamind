import { Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import LogNavigation from '../../components/navigation/LogNavigation';
import Header from '../../components/navigation/Header';
import Footer from '../../components/navigation/Footer';

function LogPageWraper({page}) {
    return (
        <>
        <Header navigation={<LogNavigation/>}></Header>
            <Container sx={{padding:"5%", paddingBottom:"10%", }}>
                {page}
            </Container>
        <Footer navigation={<LogNavigation/>}></Footer>
        </>
    )
}

export default LogPageWraper