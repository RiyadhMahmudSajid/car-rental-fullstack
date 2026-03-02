import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebaseConfig';
export const AuthContex = createContext()
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const provider = new GoogleAuthProvider();

    const createUser = (email, password) => {
         setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
         setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () =>{
         setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const logOut = () =>{
         setLoading(true)
        return signOut(auth)
    }

    const upDateUser = (updateData) =>{
        return updateProfile(auth.currentUser,updateData)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
           
           
        })
        return () => {
            unSubscribe()
        }
    }, [])

    const authData = {
        user, setUser, createUser, signInUser,googleLogin,logOut,loading,setLoading,upDateUser
    }

    return <AuthContex value={authData}>
        {children}
    </AuthContex>
};

export default AuthProvider;