import React, { useState, useContext } from 'react';
import { StateContext } from '../../App';

import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import RegisterComp from '../../components/log_in/RegisterComp';

/**
 * Register Component
 * 
 * This component renders a registration form with fields for name, email, password,
 * and password confirmation. It validates that both passwords match and meet security requirements.
 * 
 * @returns {JSX.Element} The rendered registration form component.
 */
function PgRegister() {
  const  {nav, 
    userName, setUserName, 
    famId, setfamId,
    userLastName, setUserLastName,
    userEmail, setUserEmail,
   } = useContext(StateContext);

  
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [RegisterRes, setRegisterRes] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("RegisterHandler start")
    setRegisterRes();
    setRegisterRes(<RegisterComp user={userName} mail={userEmail} pw={password} pw2={confirmPassword}/>);
    console.log("RegisterHandler end")
  };

  return (
    <Box
      sx={{
        width: 500,
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
        REGISTRO
      </Typography>
      {RegisterRes}
      <form onSubmit={(e)=>{handleSubmit(e)}} enctype="multipart/form-data" class="form-horizontal" novalidate="">
        <TextField label="Nombre" fullWidth required margin="dense" 
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <TextField label="Apellidos" fullWidth margin="dense" 
          onChange={(event) => setUserLastName(event.target.value)}
        />
        <TextField label="Correo electrónico" fullWidth required margin="dense"
          value={userEmail}
          onChange={(event) => setUserEmail(event.target.value)}
        />

        <TextField label="Contraseña" type="password" fullWidth required margin="dense"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <TextField label="Repita la contraseña" type="password" fullWidth required margin="dense"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

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
            Registrarse
          </Button>
        </Box>
      </form>

      <Divider sx={{ marginY: 3 }}>OR</Divider>

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

export default PgRegister;