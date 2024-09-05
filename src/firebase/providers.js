import { GoogleAuthProvider } from "firebase/auth";
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