import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from "../contexts/userContext";
import { useContext } from 'react';
import { Card, CardContent, Grid, CardHeader, Typography, TextField, Button } from '@mui/material';
import { registerUser } from '../api/users-api';

const Signup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const { loggedIn } = useContext(UserContext)
    console.log(loggedIn)

    const onSubmit = async (e) => {
        e.preventDefault()
        await registerUser(email, password)
            .then((success) => {
                // Signed in
                console.log(success);
                navigate("/login")
            })
            .catch((error) => {
                console.error(error.message);
                setErrorMessage(error.message);
            })
    }

    return (
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
                            SIGN UP
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
                                        onClick={onSubmit}
                                    >
                                        Sign up
                                    </Button>
                                </Grid>
                                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            </form>
                        </Grid>
                        <Grid container>
                            <p>
                                Already have an account?{' '}
                                <NavLink to="/login" >
                                    Sign in
                                </NavLink>
                            </p>
                        </Grid>
                    </CardContent>
                </Card>
            </section>
        </main >
    )
}

export default Signup