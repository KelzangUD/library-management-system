import { getAuth } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {IoIosLogOut} from 'react-icons/io';

const Profile = ()=>{
    const auth = getAuth();
    const navigate = useNavigate();
    const logoutHandle = ()=>{
        auth.signOut();
        navigate('/');
        toast.success("You Have Logout from the Application");
    }
    return (
        <div className="container mt-5">
            <header className="flex float-right">
                <button className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full inline-flex items-center" onClick={logoutHandle}><IoIosLogOut className='mr-2'/>Log Out</button>
            </header>
        </div>
    )
}
export default Profile;