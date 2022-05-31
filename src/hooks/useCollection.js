import { useState, useEffect } from "react";

import { db } from "../firebase.config";
import { collection, onSnapshot } from "firebase/firestore";


export const useCollection = (c)=>{
    const [documents,setDocuments] = useState(null)
    useEffect(()=>{
        // for real time data
        let ref = collection(db, c)
        const unsub = onSnapshot(ref, (snapshot)=>{
            let results =[];
            snapshot.docs.forEach(doc=>{
                results.push({...doc.data(), id:doc.id})
            })
            setDocuments(results);
        })
        return ()=> unsub();
    },[c])
    console.log(documents);
    return {documents}
}
