import { useContext, useEffect, useState } from 'react';
import BooksServices from '../services/BooksServices';

import { toast } from 'react-toastify';

import {FaEdit} from 'react-icons/fa';
import {MdDelete} from 'react-icons/md';

const BooksRequested = ({auth})=>{
    const [bookRequestedData, setBookRequestedData] = useState([]);
    const user = auth.currentUser.email;
    console.log(user);
    useEffect(() => {
        getBookRequestedDetails();
      },[]);
    const getBookRequestedDetails = async () => {
        try {
          const response = await BooksServices.getRequestedBookDetail();
          console.log(response.docs);
          setBookRequestedData(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (err) {
            console.log(err);
          toast.error("Error fetching book requested details")
        }
      };
    // console.log("book requested")
    // console.log(bookRequestedData);
    const booksRequest = [];
    bookRequestedData.map((item)=>{
        if(item.user===user){
            booksRequest.push(item);
        }
    })
    console.log("book requested by user")
    console.log(booksRequest);
    const deleteRequest = async(id)=>{
        await BooksServices.deleteBookRequest(id);
        getBookRequestedDetails();
    }
    return (
        <div>
            <h1>Books Requested</h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Title</th>
                    <th scope="col" className="px-6 py-3">Author(s)</th>
                    <th scope="col" className="px-6 py-3">Category</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Urgency</th>
                    <th scope="col" className="px-6 py-3">Edit/Delete</th>
                </tr>
            </thead>
            <tbody>
                    {
                        booksRequest.map((item)=>(
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item.id}>
                                <th scope="row" className="px-6 py-4">{item.title}</th>
                                <td className="px-6 py-4">{item.authors.map((item)=>(item))}</td>
                                <td className="px-6 py-4">{item.categories}</td>
                                <td className="px-6 py-4">{item.date}</td>
                                <td className="px-6 py-4">{item.urgency}</td>
                                <td className="px-6 py-4 flex">
                                    <button className='flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-2'><FaEdit/>Edit</button>
                                    <button onClick={()=>deleteRequest(item.id)} className='flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2'><MdDelete/>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
            </tbody>
        </table>
        </div>
    )
}

export default BooksRequested;