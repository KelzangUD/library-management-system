import { useEffect, useState, useContext } from "react";
import NotificationService from "../services/NotificationService";
import { toast } from "react-toastify";
import BooksContext from "../context/bookContext/BooksContext";
import {TiTick} from "react-icons/ti";
import {MdDelete} from "react-icons/md";

const Notification = ()=>{
    const [read, setRead] = useState(false);
    const [notifications, setNotifications]=useState([]);
    const {user} = useContext(BooksContext);
    const value = {
        read: true,
    }
    useEffect(()=>{
        getAllNotifications();
    },[])
    const getAllNotifications = async()=>{
        const response = await NotificationService.getAllNotification();
        setNotifications(response.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    const notificationDetails = [];
    notifications.map(item=>{
        if(item.user ===user && item.read===false){
            notificationDetails.push(item);
        }
    })
    const deleteHandle =async(id)=>{
        // console.log(id);
        try{
            await NotificationService.deleteNotification(id);
            setRead(true);
            getAllNotifications();
            toast.success("Notification is removed successfully");
        }
        catch(err){
            console.log(err);
        }
    }
    const bgColor = read?"#F6FBF4":"#EFEFEF";
    const notificationClick=async(id)=>{
        console.log(id);
        try{
            await NotificationService.updateNotificationDetails(id, value);
            toast.success("Notification marked as read");
            setRead(true);
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <> 
            <div className="relative inline-block text-left">
                <div  className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" >
                    <div>
                        {
                            notificationDetails.map((item)=>(
                                <div key={item.id} onClick={()=>notificationClick(item.id)} className="cursor-pointer text-gray-700 block px-4 py-2 text-sm m-2" style={{backgroundColor: bgColor}}>
                                    <header>
                                        <button onClick={()=>notificationClick(item.id)} className="flex float-left items-center"><TiTick/> Read</button>
                                        <button onClick={()=>deleteHandle(item.id)} className="flex float-right items-center"><MdDelete/> Remove </button>
                                    </header>
                                    <main className="mt-6">
                                        <p>Book Title {item.title} is {item.type}</p>
                                    </main>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>  
        </>
    )
}
export default Notification;