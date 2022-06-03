import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const AccountOverlay = ({onClick})=>{
    const navigate = useNavigate();
    const [userDetail, setUserDetail]= useState({email:'', password:''});
    const handleForm = async(e)=>{
        e.preventDefault();
        try{
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if(userCredential.user){
                onClick("close");
                navigate("/");
            }
        }
        catch(err){
            toast.error("Bad User Credential")
        }
    }
    const {email, password} = userDetail;
    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setUserDetail(values => ({...values, [name]: value}))
    }
    const onClickHandle =()=>{
        onClick("close");
    }
    return (
        <>
            <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleForm}>
                <div className="mb-4 flex justify-center">
                    <h1 className='text-2xl font-bold'>Log In Form</h1>
                </div>
                <div className="mb-4">
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='email' value={email} type="text" placeholder='Enter Username' onChange={handleChange}/>
                </div>
                <div className="mb-4">
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name='password' value={password} type="password" placeholder="Enter Password" onChange={handleChange}/>
                </div>
                <div className="grid justify-self-stretch">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Log In
                    </button>
                </div>
                <div className="flex justify-center mb-4 mt-4">
                    <Link to='/forgotPassword' onClick={onClickHandle} className="flex items-center items-center text-blue-600" >Forgot Password?</Link>
                </div>
                <hr/>
                <div className="mt-4">
                <div className="flex justify-center">
                    <Link to='/signup' onClick={onClickHandle} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create New Account</Link>
                </div>
                </div>
            </form>
        </>
    )
}
export default AccountOverlay;