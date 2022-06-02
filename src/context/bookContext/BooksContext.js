import { createContext } from "react";
import { useState, useEffect } from "react";

import BooksServices from "../../services/BooksServices";

const BooksContext = createContext();

export const BooksProvider = ({children})=>{
    const [booksData, setBooksData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [assignedBook, setAssignedBook] = useState([]);
    useEffect(()=>{
        getAllBooks();
        getBooksAssigned();
    },[])

    const getAllBooks = async()=>{
        const response = await BooksServices.getAllBooks();
        setBooksData(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoading(false);
    } 
    const getBooksAssigned = async () => {
        try {
          const response = await BooksServices.getAllAssigned();
          console.log(response.docs);
          setAssignedBook(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (err) {
            console.log(err);
        }
      };   
    return(<BooksContext.Provider value={{
        booksData,
        isLoading,
        assignedBook,
    }}>
        {children}
    </BooksContext.Provider>
    )
}

export default BooksContext;