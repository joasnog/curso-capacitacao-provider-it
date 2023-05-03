// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBKn7Oe5IIBOgjAG1eWGmvp-5SwgUiyzJo",
    authDomain: "provider-chat-f39ee.firebaseapp.com",
    projectId: "provider-chat-f39ee",
    storageBucket: "provider-chat-f39ee.appspot.com",
    messagingSenderId: "663030408319",
    appId: "1:663030408319:web:692306a47270603c450b4a",
    measurementId: "G-P14E871FWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth
export const auth = getAuth(app);
export const db = getFirestore(app);


