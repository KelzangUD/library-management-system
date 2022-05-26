import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {db} from '../firebase.config';
import { setDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// import {MdPerson, MdEmail, MdLock} from 'react-icons/md';

const CreateAccount = ()=>{
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
    });

    const {name, email, password} = formData;
    const handleChange = (e)=>{
        // e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setFormData(prevValue => ({...prevValue, [name]: value}))
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(formData);
        try{
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(db, 'users', user.uid), formData);
            formData.timestamp = serverTimestamp();
            setFormData({
                name:'',
                email:'',
                password:'',
            });
            navigate("/");
        }
        catch(err){
            // console.log(err.message);
            let message = err.message==='Firebase: Error (auth/email-already-in-use).'?'User Already Exist for this Email':'Registration Failed';
            toast.error(message);

        }
    }

    return (
        <div className="flex justify-center mt-10">
            <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4 flex justify-center">
                    <h1 className='text-2xl font-bold'>Create Account Form</h1>
                </div>
                <hr/>
                <div className="mb-4 mt-4">
                    <label className="font-semibold"> Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='name' type="text" placeholder='Enter Your Name' value={name} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="font-semibold">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='email' type="email" placeholder='Enter Your Email' value={email} onChange={handleChange} />
                </div>
                <div className="mb-4">
                    <label className="font-semibold">Password</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name='password' type="password" placeholder="Enter Password" value={password} onChange={handleChange}/>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign Up
                    </button>
                    <Link to='/' className="text-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</Link>
                </div>
            </form>
        </div>
    )
}
export default CreateAccount;