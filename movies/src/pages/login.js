import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from "../contexts/userContext";
import { useContext } from 'react';
import { CardHeader, Card, Typography, CardContent, Grid, TextField, Button } from '@mui/material';
import { authenticateUser } from '../api/users-api';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const { logIn, setToken } = useContext(UserContext)

    const onLogin = async (e) => {
        e.preventDefault();
        await authenticateUser(email, password)
            .then((success) => {
                // Logged in
                logIn(email);
                const token = success.token.split(' ')[1];
                console.log(token);
                setToken(token)
                navigate("/home")
            })
            .catch((error) => {
                console.error(error.message);
                setErrorMessage(error.message);
            })
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
                                    <Grid container style={{ justifyContent: 'center' }}>
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