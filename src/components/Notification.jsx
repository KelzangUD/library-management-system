import { useState } from "react";

import {TiTick} from "react-icons/ti";
import {MdDelete} from "react-icons/md";

const Notification = ()=>{
    const [read, setRead] = useState(false);
    let bgColor = read?"#F6FBF4":"#EFEFEF";
    return (
        <>
            <div className="relative inline-block text-left">
                <div className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" >
                    <div>
                        <div className="text-gray-700 block px-4 py-2 text-sm" style={{backgroundColor: bgColor}}>
                            <header>
                                <button className="flex float-left items-center"><TiTick/> Read</button>
                                <button className="flex float-right items-center"><MdDelete/> Remove </button>
                            </header>
                            <main className="mt-6">
                                Notification Message
                            </main>
                        </div>
                        <div className="text-gray-700 block px-4 py-2 text-sm" style={{backgroundColor: bgColor}}>
                            <header>
                                <button className="flex float-left items-center"><TiTick/> Read</button>
                                <button className="flex float-right items-center"><MdDelete/> Remove </button>
                            </header>
                            <main className="mt-6">
                                Notification Message
                            </main>
                        </div>
                        <div className="text-gray-700 block px-4 py-2 text-sm" style={{backgroundColor: bgColor}}>
                            <header>
                                <button className="flex float-left items-center"><TiTick/> Read</button>
                                <button className="flex float-right items-center"><MdDelete/> Remove </button>
                            </header>
                            <main className="mt-6">
                                Notification Message
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Notification;