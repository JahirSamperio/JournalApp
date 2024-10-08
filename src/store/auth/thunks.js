import { deleteDoc, doc } from "firebase/firestore/lite"
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { loadNotes } from "../../helpers/loadNotes"
import { clearNotesLogout, deleteNoteById, setNotes } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"
import { FirebaseDB } from "../../firebase/config"

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

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async(dispatch) => {
        dispatch( checkingCredentials() );

        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName})

        if( !ok ) return dispatch(logout({errorMessage}))

        dispatch(login({ uid, displayName, email, photoURL}))
    }
}

export const startLoginWithEmailPassword = (email, password) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());

        const {ok, errorMessage, uid, displayName, photoURL} = await loginWithEmailPassword({email, password});
        
        if(!ok) return dispatch(logout({errorMessage}));

        dispatch(login({uid, displayName, email, photoURL}))
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();

        dispatch(clearNotesLogout());
        dispatch(logout({}));
    }
}


export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        if(!uid) throw new Error('El UID no existe')
            
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/jouranl/notes/${ note.id }`);
        const resp = await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id))
    }
}