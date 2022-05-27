import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export const useAuthStatus = ()=>{
    const [loggedIn, setLoggedIn]= useState(false);
    useEffect(()=>{
        const auth = getAuth();
        onAuthStateChanged(auth, (user)=>{
            user?setLoggedIn(true):setLoggedIn(false);
        })
    })
    return {loggedIn}
}