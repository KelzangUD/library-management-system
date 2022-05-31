import {db} from '../firebase.config';
import { doc,collection, addDoc} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';

import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

const BookingOverlay = ({id,title,authors,categories,user})=>{
    const [isOpen, setIsOpen] = useState(false);
    const [requestFormData, setRequestFormData] = useState({
        id:{},
        title: '',
        authors: [],
        categories:'',
        date: '',
        urgency:'',
        comment:'',
    })
    const {comment} = requestFormData;
    const auth = getAuth();
    // let user =auth.currentUser.email; 
    const navaigate = useNavigate();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' +mm+ '-' + dd;
    
    const cancleHandle = (e)=>{
        e.preventDefault();
        setIsOpen(false);
    }
    const closeOverlay = () => {
        setIsOpen(false);
      };
    const onChangeHandle = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setRequestFormData(values => ({...values, [name]: value}))

    }
    const handleForm = async(e)=>{
        e.preventDefault();
        requestFormData.id = id;
        requestFormData.user = user;
        requestFormData.title=title;
        requestFormData.authors = authors;
        requestFormData.categories=categories;
        if(requestFormData.comment===''||requestFormData.date===''||requestFormData.urgency===''){
            toast.error("Some details are missing");
        }
        else{
            // console.log(requestFormData);
            const {id, title, authors, categories, user, date, urgency, comment} = requestFormData;
            try{
                const docRef = await addDoc(collection(db, "bookRequest"), {
                    id,
                    title,
                    authors,
                    categories,
                    user,
                    date,
                    urgency,
                    comment,
                  });
                  console.log("Document written with ID: ", docRef.id);
                toast.success('You have successfully requested for a book');
                closeOverlay();
                navaigate("/");       
            }
            catch(err){
                console.log(err);
                toast.error("Faild to request a book");
            }
        }
    }
    return (
        <>
            <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleForm}>
                <div className="mb-4 flex justify-center">
                    <h1 className='text-2xl font-bold'>Booking Form</h1>
                </div>
                <div className="mb-4 mt-4">
                    <p className='text-xl'>Select a date</p>
                    <input onChange={onChangeHandle} name="date"  className='bg-gray-50 border border-gray-300' type="date" min={today}/>
                </div>
                <div className="mb-4 mt-4">
                    <p className='text-xl'>Urgency</p>
                    <fieldset id="urgency">
                        <div className="flex items-center mb-4">
                            <input onChange={onChangeHandle} id="option-1" type="radio" name="urgency" value="very urgent" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="option-1" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Very Urgent
                            </label>
                        </div>
                        
                        <div className="flex items-center mb-4">
                            <input onChange={onChangeHandle} id="option-2" type="radio" name="urgency" value="urgent" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="option-2" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Urgent
                            </label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input onChange={onChangeHandle} id="option-3" type="radio" name="urgency" value="less urgent" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="option-3" className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Less Urgent
                            </label>
                        </div>
                    </fieldset>
                </div>
                <div className="mb-4 mt-4">
                    <p className='text-xl'>Notes or comments</p>
                    <textarea name="comment" className='border border-gray-300 p-2' rows="6" cols="60" value={comment} onChange={onChangeHandle}>
                    </textarea>
                </div>
                <div className="mt-4">
                <div className="flex justify-center space-x-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    <button onClick={cancleHandle} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancle</button>
                </div>
                </div>
            </form>
        </>
    )
}
export default BookingOverlay;