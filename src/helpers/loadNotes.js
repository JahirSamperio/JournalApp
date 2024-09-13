import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async(uid = '') => {
    if(!uid) throw new Error('El UID no existe');

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`); //Apunta a la ruta de la base de datos

    const docs = await getDocs(collectionRef); //Se hace la consulta a la base de datos

    const notes = [];
    docs.forEach( doc => {
        notes.push({id: doc.id, ...doc.data()});
    })
    return notes
}