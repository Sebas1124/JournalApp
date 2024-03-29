import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
   name: 'journal',
   initialState: {
      isSaving: false,
      messageSaved: '',
      notes: [],
      active: null,
      sideBar: false,
    },
    reducers: {
        creatingNewNote: ( state, action ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: ( state, action ) => {
            state.active        = action.payload;
            state.messageSaved  = '';
        },
        setNotes: ( state, { payload } ) => {
            state.notes = payload
        },
        setSaving: ( state, action ) => {
            state.isSaving      = true;
            state.messageSaved  = '';
        },
        updateNote: ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( (note) =>{

                if ( note.id === action.payload.id ) {

                    return action.payload;
                }

                return note;
            });

            state.messageSaved = `${ action.payload.title }, actualizada correctamente`
        },
        setPhotosToActiveNote: ( state, action ) => {
            state.active.imageUrls  = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving          = false;
        },
        clearNoteLogout: ( state, action ) => {
            state.isSaving      = false;
            state.messageSaved  = '';
            state.notes         = [];
            state.active        = null;
        },
        deleteNoteById: ( state, action ) => {
            state.notes         = state.notes.filter( ( note ) => ( note.id !== action.payload ));
            state.messageSaved  = `Nota eliminada correctamente`
            state.active        = null;
        },
        openSideBarMenu: ( state, action ) => {
            state.sideBar = true;
        },
        closeSideBarMenu: ( state, action ) => {
            state.sideBar = false;
        }
    }
});

export const {
    addNewEmptyNote,
    clearNoteLogout,
    creatingNewNote,
    deleteNoteById,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updateNote,
    openSideBarMenu,
    closeSideBarMenu
} = journalSlice.actions;
