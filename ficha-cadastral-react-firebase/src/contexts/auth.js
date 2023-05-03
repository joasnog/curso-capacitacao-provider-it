import { createContext, useEffect, useState } from "react";
import { auth, db } from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { AuthException } from "../exceptions/authException";

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(false);
    const navigator = useNavigate();

    useEffect(() => {
        async function loadUser() {
            const storageUser = localStorage.getItem('admin');

            if (storageUser) {
                setUser(JSON.parse(storageUser));
            }
        }

        loadUser();
    }, [])

    async function signIn(email, password) {
        setAuthLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const uid = result.user.uid;
                const docRef = doc(db, "admins", uid);
                const docSnap = await getDoc(docRef);

                const userData = {
                    'id': uid,
                    'name': docSnap.data().name,
                    'avatarUrl': docSnap.data().avatarUrl,
                    'email': result.user.email,
                }

                setUser(userData);
                storageUser(userData);
                navigator('/dashboard')
            }).catch((err) => {
                throw AuthException(err.code);
            }).finally(() => setAuthLoading(false))
    }

    async function signUp(name, email, password) {
        setAuthLoading(true);
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const uid = result.user.uid;
                const userData = {
                    'id': uid,
                    'name': name,
                    'avatarUrl': null,
                    'email': result.user.email,
                }
                await setDoc(doc(db, "admins", uid), userData)
                    .then(() => {
                        setUser(userData);
                        storageUser(userData);
                        navigator('/dashboard');
                    });
            }).catch((err) => {
                throw AuthException(err.code);
            }).finally(() => setAuthLoading(false));
    }

    async function logout() {
        await signOut(auth);
        localStorage.removeItem('admin');
        setUser(null);
    }

    async function signInWithGoogle() {
        setAuthLoading(true);
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(async (result) => {
                const user = result.user;
                const userData = {
                    'id': user.uid,
                    'name': user.displayName,
                    'avatarUrl': user.photoURL,
                    'email': user.email,
                };

                await setDoc(doc(db, "admins", user.uid), userData)
                    .then(() => {
                        setUser(userData);
                        storageUser(userData);
                        navigator('/dashboard');
                    });
            }).catch((err) => {
                throw AuthException(err.code);
            }).finally(() => setAuthLoading(false));
    }

    function storageUser(data) {
        localStorage.setItem('admin', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                signIn,
                signInWithGoogle,
                signUp,
                logout,
                authLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

