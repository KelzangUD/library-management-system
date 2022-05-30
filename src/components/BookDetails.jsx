import {useAuthStatus} from '../hooks/useAuthStatus';
import { getAuth } from 'firebase/auth';
import {useState} from 'react';



import { toast } from 'react-toastify';
import Overlay from 'react-overlay-component';
import BookingOverlay from './BookingOverlay.jsx';

import {FaStar, FaBookmark} from 'react-icons/fa';

const BookDetails = ({bookData, id})=>{
    const [isOpen, setIsOpen] = useState(false);
    // console.log(today)
    let {authors, available, averageRating, categories,description, publishedDate,publisher, title} = bookData;
    const {loggedIn} = useAuthStatus();
    const auth = getAuth();
    let user =auth.currentUser.email;
    console.log(bookData); 
    console.log(user);
    const bookHandle = ()=>{
        if(loggedIn){
            setIsOpen(true);
        }
        else{
            toast.error('Please sign in to book an item');
        }
    }
    const closeOverlay = () => {
        setIsOpen(false);
      };
      const configs = {
        animate: true,
        escapeDismiss: true,
    };
    let users = [];
    return (
        <>
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
                {available?<button className='rounded-full bg-green-200 hover:bg-green-300 py-1 px-4 flex items-center' onClick={bookHandle}><FaBookmark className='pr-2'/> Book</button>:<p className='rounded-full bg-red-200 hover:bg-red-300 py-1 px-4 flex items-center'>Not Available</p>}
            </div>
            <Overlay configs={configs} className="PopupBox" isOpen={isOpen} closeOverlay={closeOverlay} >
                <BookingOverlay id={id}/>
            </Overlay>
        </>
    )
}

export default BookDetails;