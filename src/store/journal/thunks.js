import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from './../../firebase/config';
import { addNewEmptyNote, setActiveNote, creatingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from "./";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async( dispatch, getState ) => {

        //Crear tarea y Deshabilitar botón
        dispatch( creatingNewNote() );

        //Uid del usuario para almacenar info en Firebase
        const { uid } = getState().auth;

        const date1 = new Date();
        const result = new Date(date1.valueOf() + date1.getTimezoneOffset()).toLocaleString();

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: result,
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`) );
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id

        //! dispatch
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) )


    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        if ( !uid ) throw new Error('El id del usuario no existe');

        const resp = await loadNotes( uid );

        dispatch( setNotes( resp ) );
    }

}

export const startSetNote = ( data ) => {
    return async( dispatch, getState ) => {

        dispatch( setActiveNote( data ) );

    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };

        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await setDoc( docRef, noteToFireStore, { merge: true } );

        dispatch( updateNote( note ) );

    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        const fileUploadPromises = [];

        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) )
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote( photosUrls ) );
    }
}
export const startDeletingNote = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ) );

        
    }
}