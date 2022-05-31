import { db } from "../firebase.config";

import {collection,getDocs,getDoc,addDoc,updateDoc,deleteDoc,doc} from "firebase/firestore";

const bookCollectionRef = collection(db, "books");
const bookRequestedRef = collection(db, "bookRequest");
class BookDataService {
//   addBooks = (newBook) => {
//     return addDoc(bookCollectionRef, newBook);
//   };

  updateBook = (id, updatedBook) => {
    const bookDoc = doc(db, "books", id);
    return updateDoc(bookDoc, updatedBook);
  };

  deleteBook = (id) => {
    const bookDoc = doc(db, "books", id);
    return deleteDoc(bookDoc);
  };

//   getAllBooks = () => {
//     return getDocs(bookCollectionRef);
//   };

  getBook = (id) => {
    const bookDoc = doc(db, "books", id);
    return getDoc(bookDoc);
  };
  getRequestedBookDetail = ()=>{
    return getDocs(bookRequestedRef);
  }
  deleteBookRequest = (id) => {
    const bookDoc = doc(db, "bookRequest", id);
    return deleteDoc(bookDoc);
  };
}

export default new BookDataService();