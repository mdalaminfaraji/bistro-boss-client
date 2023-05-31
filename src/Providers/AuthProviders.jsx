import React, { createContext, useState } from 'react';
import { getAuth } from "firebase/auth";
import { app } from '../firebase/firebase.config';
const auth = getAuth(app);
export const AuthContext=createContext(null);
const AuthProviders = ({children}) => {
 const [user, setUser]=useState(null);
 const [loading, setLoading]=useState(true);
    const authInfo={
        user, loading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;