import { useContext, useState } from "react";

import BooksContext from "../context/bookContext/BooksContext";

import {TiTick} from "react-icons/ti";
import {MdDelete} from "react-icons/md";

const Notification = ()=>{
    const {notificationDetails} = useContext(BooksContext);
    const [read, setRead] = useState(false);
    const readHandle = (id)=>{
        console.log(id);
    }
    const deleteHandle =(id)=>{
        console.log(id);
    }
    const bgColor = read?"#F6FBF4":"#EFEFEF";
    return (
        <> 
            <div className="relative inline-block text-left">
                <div  className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" >
                    <div>
                        {
                            notificationDetails.map((item)=>(
                                <div key={item.id} className="text-gray-700 block px-4 py-2 text-sm" style={{backgroundColor: bgColor}}>
                                    <header>
                                        <button onClick={()=>readHandle(item.id)} className="flex float-left items-center"><TiTick/> Read</button>
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