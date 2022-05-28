import {useAuthStatus} from '../hooks/useAuthStatus';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"

import { toast } from 'react-toastify';
import Overlay from 'react-overlay-component';

import {FaStar, FaBookmark} from 'react-icons/fa';

const BookDetails = ({bookData})=>{
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const navaigate = useNavigate();
    let {authors, available, averageRating, categories,description, publishedDate,publisher, title} = bookData;
    const {loggedIn} = useAuthStatus();
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
    const handleForm = ()=>{
        console.log('clicked');
        toast.success('You have successfully requested for a book');
        closeOverlay();
        navaigate("/");

    }
    const cancleHandle = (e)=>{
        e.preventDefault();
        setIsOpen(false);
    }
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
            <Overlay className="PopupBox" isOpen={isOpen} closeOverlay={closeOverlay} >
            <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleForm}>
                <div className="mb-4 flex justify-center">
                    <h1 className='text-2xl font-bold'>Booking Form</h1>
                </div>
                <div className="mb-4 mt-4">
                    <p>Select a date</p>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <div className="mb-4 mt-4">
                    <p>Urgency</p>
                    <fieldset id="urgency">
                        <input type="radio" value="value1" name="urgency"/>
                        <input type="radio" value="value2" name="urgency"/>
                        <input type="radio" value="value3" name="urgency"/>
                    </fieldset>
                </div>
                <div className="mb-4 mt-4">
                    <p>Notes or comments</p>
                    <textarea>

                    </textarea>
                </div>
                <div className="mt-4">
                <div className="flex justify-center space-x-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    <button onClick={cancleHandle} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancle</button>
                </div>
                </div>
            </form>
            </Overlay>
        </>
    )
}

export default BookDetails;