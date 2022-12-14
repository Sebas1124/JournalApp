import { async } from '@firebase/util';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            // User Information
            displayName, email, photoURL, uid
        }


    } catch (error) {

        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorCode, errorMessage
        }
        
    }
}

export const LogInWithEmailPassword = async({ email, password }) => {
    try {
        
        const result = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { displayName, photoURL, uid } = result.user;

        return {
            ok: true,
            // User Information
            displayName, email, photoURL, uid
        }


    } catch (error) {

        return {
            ok: false, 
            errorMessage: 'Las credenciales no coinciden',
        }
        
    }
}

export const RegisterUserWithEmailPassword = async({ email, password, displayName }) => {

    try {

        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;

        await updateProfile( FirebaseAuth.currentUser, { displayName });
        
        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {

        return {
            ok: false, 
            errorMessage: error.message,
        }
    }

}

export const LogoutFirebase = async() => {

    return await FirebaseAuth.signOut();

}