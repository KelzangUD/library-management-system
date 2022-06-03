import { createContext } from "react";
import { useState, useEffect } from "react";
import BooksServices from "../../services/BooksServices";
import NotificationService from "../../services/NotificationService";
import { getAuth } from "firebase/auth";

const BooksContext = createContext();

export const BooksProvider = ({children})=>{
    const [booksData, setBooksData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [assignedBook, setAssignedBook] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const auth = getAuth()
    const user = (auth.currentUser!==null)?auth.currentUser.email:"No User";
    console.log(user);
    useEffect(()=>{
        getAllBooks();
        getBooksAssigned();
        getAllNotifications();
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
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();
      today = yyyy + '-' +mm+ '-' + dd;  
      const getAllNotifications = async()=>{
        const response = await NotificationService.getAllNotification();
        setNotifications(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
    const notificationDetails = [];
    notifications.map(item=>{
        if(item.user ===user && item.read===false){
            notificationDetails.push(item);
        }
    })
    const notificationNum = notificationDetails.length;
    return(<BooksContext.Provider value={{
        booksData,
        isLoading,
        assignedBook,
        today,
        notificationDetails,
        user,
        notificationNum,
    }}>
        {children}
    </BooksContext.Provider>
    )
}

export default BooksContext;