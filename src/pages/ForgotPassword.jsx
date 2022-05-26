import {getAuth, sendPasswordResetEmail} from 'firebase/auth';
import {toast} from 'react-toastify';

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


const ForgotPassword = ()=>{
    const [email, setEmail] = useState();
    const navigate = useNavigate();
    const handleChange = (e)=>{
        setEmail(e.target.value)
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const auth = getAuth();
            await sendPasswordResetEmail(auth,email);
            toast.success('Email was sent. Check your mail and reset password');
            navigate('/')
        }
        catch(err){
            toast.error('Could not send email');
        }

    }

    return (
        <div className="flex justify-center mt-10">
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4 flex justify-center">
                    <h1 className='text-2xl font-bold'>Password Reset Form</h1>
                </div>
                <hr/>
                <div className="mb-4 mt-4">
                    <label className="font-semibold">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='email' type="email" placeholder='Enter Your Email' value={email} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Send Link
                    </button>
                    <Link to='/' className="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</Link>
                </div>
            </form>
        </div>
    )
}

export default ForgotPassword;