import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      status:'checking', // 'checking' , 'not-authenticaded', 'authenticaded'
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: null,
    },
    reducers: {
        login: ( state, { payload } ) => {
            state.status = 'authenticaded'; // 'checking' , 'not-authenticaded', 'authenticaded'
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: ( state, { payload } ) => {
            state.status = 'not-authenticaded'; // 'checking' , 'not-authenticaded', 'authenticaded'
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage;
        },
        checkingCredentials: ( state ) => {
            state.status = 'checking';
        }
    }
});


export const { login, logout, checkingCredentials } = authSlice.actions;