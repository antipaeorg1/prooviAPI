import * as React from 'react';
import {useState} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link, useNavigate} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import Alert from "@mui/material/Alert";

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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [alertIsVisible, setAlertIsVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [severity, setSeverity] = useState('warning');

    function showAlert(severity, message) {
        setSeverity(severity);
        setAlertMessage(message);
        setAlertIsVisible(true);
    }
    function resetAlert() {
        setAlertMessage('');
        setAlertMessage('');
        setSeverity('');
    }
    function handleSubmit(e) {
        e.preventDefault();

        if (email === '' || password === '') {
            showAlert('warning', 'Please fill in all the fields!');
            return;
        }

        resetAlert();
        let data = {
            userEmail: email,
            userPassword: password
        };

        let config = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/login',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                // console.log(JSON.stringify(response.data.accessToken));
                showAlert('success', "You have been successfully logged in!")
                sessionStorage.setItem('accessToken', response.data.accessToken);
                setTimeout(() => {
                    navigate('/users')
                },3000)
            })
            .catch((error) => {
                showAlert('error',JSON.stringify(error.response.data.message))
                console.log(error);
            });
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
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {alertIsVisible && (
                            <Alert severity={severity}>{alertMessage}</Alert>
                        )}
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                onClick={(e) => handleSubmit(e)}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="/recover-password" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/register" variant="body2">
                                        {"Don't have an account? Sign Up"}
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