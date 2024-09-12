import { Alert, Button, Grid, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { AuthLayout } from "../layout/AuthLayout"
import { useTheme } from "@emotion/react";
import { useForm } from "../../components/useForm";
import { useMemo, useState } from "react";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";

const formData = {
    email: 'jahir@gmail.com',
    password: 'danicaro',
    displayName: 'Jahir Samperio'
}

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
    password: [(value) => value.length >= 6, 'El password debe de tener mas de 6 caracteres'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio']
}


export const RegisterPage = () => {

    const dispatch = useDispatch();

    const { status, errorMessage } = useSelector(state => state.auth);

    const isCheckingAuthentication = useMemo( () => status === 'checking', [status] )

    const [formSubmitted, setFormSubmitted] = useState(false)

    const {
        displayName, email, onInputChange, password, formState,
        isFormValid, emailValid, passwordValid, displayNameValid
    } = useForm(formData, formValidations)

    // console.log(displayNameValid);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true)
        console.log(formState)
        dispatch( startCreatingUserWithEmailPassword(formState) );
    }


    return (
        <AuthLayout title="Crear cuenta">
            <h1>Form Valid {isFormValid ? 'Valido' : 'Invalido'}</h1>
            <form onSubmit={ onSubmit } className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label='Nombre completo'
                            type='text'
                            placeholder="Jahir Samperio"
                            fullWidth
                            name="displayName"
                            value={ displayName }
                            onChange={ onInputChange }
                            error={!!displayNameValid && formSubmitted} //Una vez que el formulario se ha enviado
                            helperText={displayNameValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label='Correo'
                            type='email'
                            placeholder="correo@gmail.com"
                            fullWidth
                            name="email"
                            value={ email }
                            onChange={ onInputChange }
                            error={!!emailValid && formSubmitted} //Una vez que el formulario se ha enviado
                            helperText={emailValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ marginTop: 2 }}>
                        <TextField
                            label='Contraseña'
                            type='password'
                            placeholder="Contraseña"
                            fullWidth
                            name="password"
                            value={ password }
                            onChange={ onInputChange }
                            error={!!passwordValid && formSubmitted} //Una vez que el formulario se ha enviado
                            helperText={passwordValid}
                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 2 }}>
                        <Grid 
                            item 
                            xs={12}
                            display={ !!errorMessage ? '' : 'none' }
                        >
                            <Alert severity="error">{errorMessage}</Alert>
                        </Grid>  
                        <Grid item xs={12}>
                            <Button 
                                disabled={isCheckingAuthentication}
                                type="submit" 
                                variant="contained" 
                                fullWidth 
                            >
                                Crear cuenta
                            </Button>
                        </Grid>  
                    </Grid>
                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{mr:1}}>¿Ya tienes cuenta?</Typography>
                        <RouterLink component={RouterLink} color="inherit" to='/auth/login'>
                            Ingresar
                        </RouterLink>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
