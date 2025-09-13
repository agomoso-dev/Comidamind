import React, { useState, useContext } from 'react';
import { StateContext } from '../../App';

import { Box, Button, Divider, Link, TextField, Typography } from '@mui/material';

import { NavLink, useNavigate } from 'react-router-dom';
import LogInComp from '../../components/log_in/logInComp';

/**
 * Login Component
 * 
 * This component renders a login form with fields for email and password,
 * along with links for password recovery and registration. It also includes
 * a submit button to initiate the login process.
 * 
 * @returns {JSX.Element} The rendered login form component.
 */
function PgPwRecovery() {

  const  {nav, 
      userName, setUserName, 
      famId, setfamId,
      userLastName, setUserLastName,
      userEmail, setUserEmail,
     } = useContext(StateContext);
  
    
  const [password, setPassword] = useState('');
  const [logInRes, setLogInRes] = useState(null);

  function logInHandler(e){
    console.log("logInHandler start")
    e.preventDefault();
    console.log("logInHandler pw: " + password)
    setLogInRes(<LogInComp pw={password}/>);
    console.log("logInHandler end")
  }

  return (
    <Box
      sx={{
        width: 600,
        margin: 'auto',
        marginTop: '100px',
        padding: 7,
        boxShadow: 2,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h3" align="center" sx={{ marginBottom: 5 }}>
        Password Recovery
      </Typography>
      {logInRes}
      <form onSubmit={(e)=>logInHandler(e)}>
          <TextField label="Correo electrónico" fullWidth required margin="dense"
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
          />
  
          <TextField label="Contraseña" type="password" fullWidth required margin="dense"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column', 
              alignItems: 'flex-start', 
              marginTop: 2,
              gap: 1, 
            }}
          >
              <Link href="-" underline="hover">
                ¿Olvidaste tu contraseña?
              </Link>

              <Link href="/register" underline="hover">
                ¿No tienes cuenta aún?
              </Link>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center', 
              marginTop: 3,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: '70%', 
                height: '60px', 
                fontSize: '1.2rem', 
              }}
            >
              Iniciar
            </Button>
          </Box>
      </form>
      {/* Divider with "OR" */}
      <Divider sx={{ marginY: 3 }}>OR</Divider>

      {/* Button to log in with Google */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width: '50%',
            height: '60px',
            fontSize: '1rem',
          }}
        >
          Iniciar sesión con Google
        </Button>
      </Box>
    </Box>
  );
}

export default PgPwRecovery;