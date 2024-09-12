import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { signInWithPopup } from "firebase/auth";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider) // (authConfig, provider)
        const user = result.user;

        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage,
        }
    }
}

export const registerUserWithEmailPassword = async({email, password, displayName}) => {
    try{

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        console.log(resp);

        //TODO: actualizar el displayName en firebase
        //
        await updateProfile(FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid,
            photoURL, email, displayName
        }
    } catch(error) {
        return {
            ok: false,
            errorMessage: error.message,
        }
    }
}

export const loginWithEmailPassword = async({email, password}) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        console.log(resp.user);
        const { uid, displayName,photoURL } = resp.user; 

        return {
            ok: true, 
            uid, displayName, email, photoURL
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async() => {
    return await FirebaseAuth.signOut();
}