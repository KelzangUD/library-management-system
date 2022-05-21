import {FaHome, FaUser} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = ()=>{
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
                    <Link to='/auth' className='btn btn-ghost btn-sm-rounded-bth'><FaUser className='inline pr-2 text-3xl'/></Link>
                </div>
            </div>
            </nav>
    )
}

export default Navbar;