import { useState, useContext } from "react";
import Notification from '../components/Notification';
import {IoMdNotifications} from 'react-icons/io';
import LinkUi from "../ui/LinkUi";
import BooksContext from "../context/bookContext/BooksContext";

const ProfileButton = ({FaUser})=>{
    const [notification, setNotification] = useState(false);
    const [showNotification,setShowNotification] = useState(true);
    const notificationHandle = ()=>{
        console.log("Notification Clicked");
        setNotification(prevState=>!prevState);
        setShowNotification(prevState=>!prevState);
    }
    const {notificationNum}= useContext(BooksContext);
    console.log(notificationNum);
    return(
        <>
            <div className='mr-6'>
                <button onClick={notificationHandle} className='btn btn-ghost btn-sm-rounded-bth'><IoMdNotifications className='inline pr-2 text-3xl'/></button>
                {
                    (notificationNum>0&&showNotification)&&<p className="notifications">{notificationNum}</p>
                }
                {
                    notification && <Notification/> 
                }
            </div>
            <div className='mr-6'>
                <LinkUi to="/profile" className="btn btn-ghost btn-sm-rounded-bth" text={<FaUser className='inline pr-2 text-3xl'/>}/>
            </div>
        </>
    )
}
export default ProfileButton;