import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { app } from '../firebase/firebase.config';
const auth = getAuth(app);
export const AuthContext=createContext(null);
const AuthProviders = ({children}) => {
 const [user, setUser]=useState(null);
 const [loading, setLoading]=useState(true);

const createUser=(email, password)=>{
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
};

const signIn=(email, password)=>{
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
}

const updateUserProfile=(name, photo)=>{
  return  updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
      });
}

const logOut=()=>{
    setLoading(true);
    return signOut(auth);
}



 useEffect(()=>{
    const unSubscribe=onAuthStateChanged(auth, currentUser=>{
        setUser(currentUser);
        console.log('current user', currentUser);
        setLoading(false);
    });
    return ()=>{
        return unSubscribe();
    }
 })
    const authInfo={
        user, loading, createUser,signIn, logOut, updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;