import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from "../contexts/userContext";
import { useContext } from 'react';
import { useEffect } from 'react';
import { CardHeader, Card, Typography, CardContent, Grid, TextField, Button } from '@mui/material';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const { loggedIn, logIn } = useContext(UserContext)
    useEffect(() => { if (loggedIn) { navigate("/home") } })

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                logIn();
                navigate("/home")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                setErrorMessage(error.message);
                console.log(errorCode, errorMessage)
            });

    }

    return (
        <>
            <main >
                <section style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}>
                    <Card sx={{ maxWidth: 400 }}>
                        <CardHeader title={
                            <Typography variant="h5" component="p" style={{ textAlign: 'center' }}>
                                LOG IN
                            </Typography>
                        } />
                        <CardContent>
                            <Grid container>
                                <form>
                                    <TextField
                                        id="email-address"
                                        label="Email address"
                                        variant="outlined"
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        sx={{ width: 350 }}
                                        style={{ padding: 10 }}
                                    />

                                    <TextField
                                        id="password"
                                        label="Password"
                                        variant="outlined"
                                        type="password"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ padding: 10 }}
                                    />
                                    <Grid container style={{justifyContent: 'center'}}>
                                        <Button
                                            color="secondary"
                                            variant="contained"
                                            type="submit"
                                            onClick={onLogin}
                                        >
                                            Login
                                        </Button>
                                    </Grid>
                                </form>
                            </Grid>
                            <Grid container>
                                <p className="text-sm text-white text-center">
                                    No account yet? {' '}
                                    <NavLink to="/signup">
                                        Sign up
                                    </NavLink>
                                </p>
                            </Grid>
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        </CardContent>
                    </Card>
                </section>
            </main>
        </>
    )
}

export default Login