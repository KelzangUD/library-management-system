import { getAuth } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {IoIosLogOut} from 'react-icons/io';
import BooksRequested from '../components/BooksRequested';
import BooksAssigned from '../components/BooksAssigned';

import { useState } from 'react';

const Profile = ()=>{
    const auth = getAuth();
    const navigate = useNavigate();
    const [booksAssigned, setBooksAssigned]=useState(true);
    const logoutHandle = ()=>{
        auth.signOut();
        navigate('/');
        toast.success("You Have Logout from the Application");
    }
    return (
        <div className="container mt-5">
            <header className="flex float-right my-8">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-2" onClick={()=>setBooksAssigned(prevState=>!prevState)}>Switch {booksAssigned?"Requested":"Assigned"}</button>
                <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center" onClick={logoutHandle}><IoIosLogOut className='mr-2'/>Log Out</button>
            </header>
            <main className='container relative overflow-x-auto shadow-md sm:rounded-lg'>
                {
                    booksAssigned?<BooksAssigned auth={auth}/>:<BooksRequested auth={auth}/> 
                }      
            </main>
        </div>
    )
}
export default Profile;