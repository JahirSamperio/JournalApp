import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, isSavingNewNote, setActiveNote, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    return async(dispatch, getState) => {

        dispatch(isSavingNewNote());

        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        //configuaracion de base de datos
        const newDoc = doc(collection( FirebaseDB, `${uid}/journal/notes` ));
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id

        dispatch(addNewEmptyNote( newNote ));
        dispatch(setActiveNote(newNote));
    }
}

export const startSaveNote = () => {
    return async(dispatch, getState) => {

        dispatch(setSaving());

        const {uid} = getState().auth;

        //Solo guarda la nota que esta activa
        const {active:note} = getState().journal;

        const noteToFireStore = {...note};

        //Eliminas el id de la note
        delete noteToFireStore.id;

        //Referencia al documento
        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`);

        //Actualiza la nota
        await setDoc(docRef, noteToFireStore, {merge: true}); //Merge agrega o mantiene campos si es uqe no habia

        dispatch(updateNote(note));
    }
} 

export const startLoadingFiles = ( files = []) => {
    return async( dispatch, getState ) => {
        dispatch(setSaving());

        console.log(files);

        const fileUploadPromises = [];

        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ));
        }

        const photosUrls = await Promise.all( fileUploadPromises );

        dispatch(setPhotosToActiveNote(photosUrls));


    }
}