import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Button } from '@mui/material';
import Navigation from './Navigation';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Footer({navigation}) {
  return (
    <Box
        component="footer"
        position='fixed'
        bottom={0}
        left={0}
        right={0}
        sx={{
            backgroundColor: 'lightgrey',
        }}
    >
        <Container maxWidth="sm">
            {navigation}
            <Copyright />
        </Container>
    </Box>
  );
}