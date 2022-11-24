// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDBOnq_v5YX5__noHk-0sOvtt9qSfiD3nE",
  authDomain: "reactjournalapp-71931.firebaseapp.com",
  projectId: "reactjournalapp-71931",
  storageBucket: "reactjournalapp-71931.appspot.com",
  messagingSenderId: "121821265808",
  appId: "1:121821265808:web:930d52dce68d5f9c293d15",
  measurementId: "G-Z5T56VCTCV"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );

const FirebaseAnalytics = getAnalytics( FirebaseApp );