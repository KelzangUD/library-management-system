import { Link } from 'react-router-dom';
import Overlay from 'react-overlay-component';
import { useState } from 'react';

import {FaHome, FaUser} from 'react-icons/fa';

const Navbar = ()=>{
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser]= useState({userName:'', password:''});

    const closeOverlay = () => {
        setIsOpen(false);
      };

    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setUser(values => ({...values, [name]: value}))
    }
    const handleForm = (e)=>{
        e.preventDefault();
        console.log(user);
    }
    return (
        <nav className="flex items-center justify-between shadow-lg flex-wrap bg-gray-700 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link to='/'><FaHome className='inline pr-2 text-3xl'/></Link>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-white font-bold">
                <div className="text-sm lg:flex-grow">
                <Link to='/' className='btn btn-ghost btn-sm-rounded-bth pr-4 text-xl'>HOME</Link>
                <Link to='/about' className='btn btn-ghost btn-sm-rounded-bth text-xl'>ABOUT</Link>
                </div>
                <div>
                    <button className='btn btn-ghost btn-sm-rounded-bth' onClick={() => {setIsOpen(true);}}><FaUser className='inline pr-2 text-3xl'/></button>
                </div>
            </div>
            <Overlay className="PopupBox" isOpen={isOpen} closeOverlay={closeOverlay} >
            <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleForm}>
                <div className="mb-4 flex justify-center">
                    <h1 className='text-2xl font-bold'>Log In Form</h1>
                </div>
                <div className="mb-4">
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='userName' value={user.userName} type="text" placeholder='Enter Username' onChange={handleChange}/>
                </div>
                <div className="mb-4">
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name='password' value={user.password} type="password" placeholder="Enter Password" onChange={handleChange}/>
                </div>
                <div className="grid justify-self-stretch">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Log In
                    </button>
                </div>
                <div className="flex justify-center mb-4 mt-4">
                    <p className="flex items-center items-center text-blue-600">Forgot Password?</p>
                </div>
                <hr/>
                <div className="mt-4">
                <div className="flex justify-center">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Create New Account
                    </button>
                </div>
                </div>
            </form>
            </Overlay>
            </nav>
    )
}

export default Navbar;