import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        //nota mas actual =>
        active: null
    },
    reducers: {
        isSavingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;

        },
        setActiveNote: (state, action) => {
            state.active = action.payload
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {
            state.isSaving = false;

            //Retorna un nuevo arreglo con la nota actualizada
            state.notes = state.notes.map( note => {
                
                //SI la nota tiene el mismo id, se guarda la nota en el nuevo arreglo
                if(note.id === action.payload.id){
                    return action.payload
                }
                //Si no, se retorna la misma nota
                return note
            });

            state.messageSaved = `${action.payload.title}, actualizada correctamente`;
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },

        clearNotesLogout: (state, action) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },

        deleteNoteById: (state, action) => {
            state.active = null;
            //Retorna un nuevo arreglo con la nota actualizada
            state.notes = state.notes.filter( note => note.id !== action.payload );
        }   
    }
});
// Action creators are generated for each case reducer function
export const { isSavingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote,setPhotosToActiveNote, deleteNoteById, clearNotesLogout } = journalSlice.actions;