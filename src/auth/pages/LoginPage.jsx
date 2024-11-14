import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

export const LoginPage = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar la lógica de autenticación
        console.log('User:', user);
        console.log('Password:', password);
    };
  const { login } = useContext( AuthContext );
  const navigate = useNavigate();

  const onLogin = (user, psswd) => {
    const data = {
        'user': user,
        'password': psswd
    }
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('http://localhost:5000/api/auth/login', options)
    .then(response => {
        if(!response.ok){
            throw new Error('Network response was not ok');
          }
          navigate( lastPath, {
            replace: true
          });
          login( 'Asarmiento' );
          return response.json();
        })
        .then(data => {
        console.log(data.token)
        localStorage.setItem('token', data.token)
        console.log('Respuesta del servidor: ', data)
    })
    .catch(error => {
        console.error('Error al hacer la petición:', error);
    })

    const lastPath = localStorage.getItem('lastPath') || '/';
    console.log('Usuario:', user);
    console.log('Password:', password);
    
    
  }

  return (
    <Container component="main" maxWidth="xs" 
    sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}
    >
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 8,
                padding: 2,
                borderRadius: 1,
                boxShadow: 3,
                backgroundColor: 'white',
            }}
        >
            <Typography component="h1" variant="h5">
                Iniciar Sesión
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Usuario"
                    autoComplete="email"
                    value={user}
                    onChange={(evt) => {setUser(evt.target.value)}}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={(evt) => {setPassword(evt.target.value)}}
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 3, marginBottom: 2 }}
                    onClick={() => {onLogin(user, password)}}
                >
                    Iniciar Sesión
                </Button>
            </form>
        </Box>  
    </Container>
  )
}
