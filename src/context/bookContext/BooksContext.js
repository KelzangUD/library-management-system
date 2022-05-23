import { createContext } from "react";
import { useState, useEffect } from "react";

import { db } from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";

const BooksContext = createContext();

export const BooksProvider = ({children})=>{
    const [booksData, setBooksData] = useState([]);
    useEffect(()=>{
        getDocs(collection(db,'books')).then((snapshot)=>{
            let results=[];
            snapshot.docs.forEach(book=>{
                results.push({id:book.id, ...book.data()})
            })
            setBooksData(results);
            // console.log(results);
        })
    },[])
    return(<BooksContext.Provider value={{
        booksData,
    }}>
        {children}
    </BooksContext.Provider>
    )
}

export default BooksContext;