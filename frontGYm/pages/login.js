import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const axios = require('axios');

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {/*'Copyright © '*/}
      <Link color="inherit" href="https://mui.com/">
        
      </Link>{' '}
      {/*new Date().getFullYear()*/}
      {/*'.'*/}
    </Typography>
  );
}

//const theme = createTheme();

export default function SignInSide() {

  const [username, setusername] = React.useState('');
  const handleChangeusername = (event) =>{
    setusername(event.target.value)
    //console.log(username)
  }

  const [password, setpassword] = React.useState('');
  const handleChangepassword = (event) =>{
    setpassword(event.target.value)
    //console.log(password)
  }

  const login =(event)=>{
    //window.location.href="/pagos"
    var user = {
      username: username,
      password: password
    }
    console.log(user)
    axios.post('http://localhost:8080/api/users/login', user
    ).then(res=>{
      console.log(res)
      window.location.href="/pagos"
      //Swal.fire(alert3).then(setOpen(false)).then(window.location.reload())
    }).catch(error => console.log(error))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    //<ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://i.ibb.co/Kr3JkJ4/1571485195-164961-1.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Box
  display="flex"
  justifyContent="center"
  alignItems="center"
>
<img src="https://i.ibb.co/BBjBxrj/stan-Icon-1.png"
              width="300" 
              height="300" />
        </Box>
            
            <Typography component="h1" variant="h3">
               Login
            </Typography>
            <Box component="form" noValidate onSubmit={login} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={handleChangeusername}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handleChangepassword}
              />
{/*<FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
          />*/}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                //onClick={login}
              >
                Ingresar
              </Button>
              
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    
  );
}