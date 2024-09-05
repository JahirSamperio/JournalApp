import { signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = () => {
    return async(dispatch) => {
        console.log('checking....')
        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials())

        const result = await signInWithGoogle();
        console.log({result})
        if(!result.ok) dispatch(logout(result.errorMessage))

        dispatch(login(result))

    }
}