import {useAuthStatus} from '../hooks/useAuthStatus';
import { getAuth } from 'firebase/auth';
import {useState, useEffect} from 'react';

import { toast } from 'react-toastify';
import Overlay from 'react-overlay-component';
import BookingOverlay from './BookingOverlay.jsx';
import BooksServices from '../services/BooksServices';

import {FaStar, FaBookmark} from 'react-icons/fa';

const BookDetails = ({bookData, id})=>{
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([]);
    const [bookRequestedData, setBookRequestedData]=useState([]);
    const [user, setUser] = useState('');
    const auth = getAuth();
   
    let {authors, available, averageRating,categories,description, publishedDate,publisher, title} = bookData;
    const {loggedIn} = useAuthStatus(); 
    useEffect(()=>{
        setUser((loggedIn===true)?auth.currentUser.email:"Not logged in")
    },[loggedIn])
    const bookHandle = ()=>{
        loggedIn?setIsOpen(true):toast.error('Please sign in to book an item');
    }
    const closeOverlay = () => {
        setIsOpen(false);
    };
      const configs = {
        animate: true,
        escapeDismiss: true,
    };
    useEffect(() => {
        if (id !== undefined && id !== "") {
          getBook();
          getBookRequestedDetails();
        }
      }, [id]);
      const getBook = async () => {
        try {
          const response = await BooksServices.getBook(id);
          setData(response.data());
        } catch (err) {
          toast.error("Error fetching book details")
        }
      };
      const getBookRequestedDetails = async () => {
        try {
          const response = await BooksServices.getRequestedBookDetail();
          setBookRequestedData(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (err) {
            toast.error("Error fetching book requested details")
        }
      };
    let users = [];
    bookRequestedData.map((item)=>{
        if(item.title===title){
            users.push(item.user);
        }
    })
    return (
        <div key={id}>
            <header>
                <h1 className='font-bold text-3xl'> {title}</h1>
                <p className='font-semibold text-base my-3'>{authors.map((item)=><i className='mr-3 bg-teal-500 text-white py-1 px-3 rounded-full'>{item}</i> )}</p>
                {('averageRating' in bookData)?<p className='flex items-center'><FaStar className='mx-2'/> {averageRating} / 5.0</p>:<p>No Rating</p> }
            </header>
            <hr className='my-2'/>
            <main>
                <p>{description}</p>
            </main>
            <hr className='my-2'/>  
            <div className='flex items-center'>
                <p className='mx-2'><span className='text-slate-500'>Category:</span> {categories}</p>
                <p className='mx-2'><span className='text-slate-500'>Publisher:</span> {publisher}</p>
                <p className='mx-2'><span className='text-slate-500'>Published Date:</span>{publishedDate}</p>
                {
                available?
                (users.includes(user)?
                <p className='rounded-full bg-teal-200 hover:bg-teal-300 py-1 px-4 flex items-center'>Requested</p>
                :<button className='rounded-full bg-green-200 hover:bg-green-300 py-1 px-4 flex items-center' 
                onClick={bookHandle}><FaBookmark className='pr-2'/> Book</button>):
                <p className='rounded-full bg-red-200 hover:bg-red-300 py-1 px-4 flex items-center'>Not Available</p>
                }
            </div>
            <Overlay configs={configs} className="PopupBox" isOpen={isOpen} closeOverlay={closeOverlay} >
                <BookingOverlay id={id} title={title} authors={authors} categories={categories} user={user}/>
            </Overlay>
        </div>
    )
}

export default BookDetails;