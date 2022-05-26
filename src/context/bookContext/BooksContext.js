import { createContext } from "react";
import { useState, useEffect } from "react";

import { db } from "../../firebase.config";
import { collection, getDocs } from "firebase/firestore";

const BooksContext = createContext();

export const BooksProvider = ({children})=>{
    const [booksData, setBooksData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        getDocs(collection(db,'books')).then((snapshot)=>{
            let results=[];
            snapshot.docs.forEach(book=>{
                results.push({id:book.id, ...book.data()})
            })
            setBooksData(results);
            setIsLoading(false);
            // console.log(results);
        })
    },[])
    return(<BooksContext.Provider value={{
        booksData,
        isLoading,
    }}>
        {children}
    </BooksContext.Provider>
    )
}

export default BooksContext;