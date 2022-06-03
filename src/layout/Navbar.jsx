import {useAuthStatus} from '../hooks/useAuthStatus';
import {FaHome, FaUser} from 'react-icons/fa';
import LinkUi from '../ui/LinkUi';
import SignInButton from '../components/SignInButton';
import ProfileButton from '../components/ProfileButton';

const Navbar = ()=>{
    const {loggedIn} = useAuthStatus();
    return(
        <>
        <nav className="flex items-center justify-between shadow-lg flex-wrap bg-gray-700 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <LinkUi to="/" text={<FaHome className='inline pr-2 text-3xl'/>}/>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-white font-bold">
                <div className="text-sm lg:flex-grow">
                <LinkUi to="/about" className="btn btn-ghost btn-sm-rounded-bth text-xl" text="ABOUT"/>
                </div>
                {
                    loggedIn?<ProfileButton FaUser={FaUser}/>:<SignInButton  FaUser={FaUser}/>
                }
            </div>
            </nav>
        </>
    ) 
}

export default Navbar; 