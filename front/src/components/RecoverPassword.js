import * as React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import axios from "axios";
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                prooviAPI
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


const defaultTheme = createTheme();

export default function SignInSide() {

    const [email, setEmail] = useState('');
    const [alertIsVisible, setAlertIsVisible] = useState(false);
    const navigate = useNavigate();


    function handleSubmit(e) {
        e.preventDefault();
        if (email === '') {
            setAlertIsVisible(true);

        } else {
            setAlertIsVisible(false)

            let data = {
                userEmail: email
            };

            let config = {
                method: 'POST',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/reset-password',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setTimeout(() => {
                        navigate('/')
                    },2000)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }



    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    {alertIsVisible && (
                        <Alert severity="warning">Please fill in the Email</Alert>
                    )}
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Recover Password
                        </Typography>
                        <Box component="form" sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                onClick={(e) => handleSubmit(e)}
                            >
                                Send Password to Email
                            </Button>
                            <Grid container alignItems="center" justifyContent="center" spacing={3}>
                                <Grid item>
                                    <Link to="/" variant="body2">
                                        Login
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/register" variant="body2">
                                        Sign up
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{mt: 5}}/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}