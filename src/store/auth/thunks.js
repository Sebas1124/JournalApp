import { checkingCredentials, logout, login } from "./";
import { RegisterUserWithEmailPassword, signInWithGoogle, LogInWithEmailPassword, LogoutFirebase } from './../../firebase/providers';

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

    }
}

export const startGoogleSignIn = () => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) )
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await RegisterUserWithEmailPassword({ email, password, displayName })
        
        if ( !ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login({ uid, displayName, email, photoURL }) );
    }
}

export const startEmailPasswordLogin = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const { ok, uid, displayName, photoURL, errorMessage } = await LogInWithEmailPassword({ email, password });

        if ( !ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login({ uid, displayName, email, photoURL }) )
    }
}
export const startLogout = () => {
    return async( dispatch ) => {

        await LogoutFirebase();

        dispatch( logout({}) );

    }
}