import { Google } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { useTheme } from "@emotion/react";
import { useForm } from "../../components/useForm";
import { useDispatch } from "react-redux";
import { checkingAuthentication, startGoogleSignIn } from "../../store/auth/thunks";

export const LoginPage = () => {
    const dispatch = useDispatch();

    const {email, onInputChange, password} = useForm({
        email: 'jahirsampe@gmail.com',
        password: 'danicaro'
    })

    const onSubmit = ( event ) => {
        event.preventDefault();
        console.log(email, password)
        dispatch(checkingAuthentication());
    }

    const onGoogleSignIn = () => {

        console.log('onGoogleSignIn')
        dispatch(startGoogleSignIn())
    }

    return (
        <AuthLayout title="Login">
            <form onSubmit={onSubmit}>
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
                        <Grid item xs={12} sm={6}>
                            <Button type="submit" variant="contained" fullWidth>
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button 
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
