import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { useTheme } from "@emotion/react";
import { useForm } from "../../components/useForm";
import { useDispatch, useSelector } from "react-redux";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks";
import { useMemo } from "react";
import { loginWithEmailPassword } from "../../firebase/providers";

export const LoginPage = () => {

    const { status, errorMessage } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

    const { email, onInputChange, password } = useForm({
        email: 'jahirsampe@gmail.com',
        password: 'danicaro'
    })

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const onSubmit = (event) => {
        event.preventDefault();
        dispatch(checkingAuthentication());
    }

    const onSignIn = (email, password) => {
        dispatch(startLoginWithEmailPassword(email, password));
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn())
    }

    return (
        <AuthLayout title="Login">
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label='Correo'
                            type='email'
                            placeholder="correo@gmail.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label='Contraseña'
                            type='password'
                            placeholder="Contraseña"
                            fullWidth
                            name="password"
                            value={password}
                            onChange={onInputChange}

                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
                        <Grid
                            item
                            xs={12}
                            display={!!errorMessage ? '' : 'none'}
                        >
                            <Alert severity="error">{errorMessage}</Alert>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth onClick={() => onSignIn(email, password)}>
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticating}
                                variant="contained"
                                fullWidth
                                onClick={onGoogleSignIn}
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container direction='row' justifyContent='end'>
                        <RouterLink component={RouterLink} color="inherit" to='/auth/register'>
                            Crear una cuenta
                        </RouterLink>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
