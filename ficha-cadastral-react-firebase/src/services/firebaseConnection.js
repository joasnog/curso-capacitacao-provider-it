import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-6BnD_12KlMUV6MRWWdA6_W3I6yVLlbk",
    authDomain: "curso-react-e9b8f.firebaseapp.com",
    projectId: "curso-react-e9b8f",
    storageBucket: "curso-react-e9b8f.appspot.com",
    messagingSenderId: "112785887416",
    appId: "1:112785887416:web:c9bf3903f9bf0d905d244d",
    measurementId: "G-2KBJLXX1X3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app)

export { db, auth };