
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useEffect, useRef } from "react";
import BooksServices from "../services/BooksServices";
import { toast } from "react-toastify";

const EditBookRequest = ()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const { id,title,date,urgency,comment } = location.state;
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' +mm+ '-' + dd;
    const option1 = useRef();
    const option2 = useRef();
    const option3 = useRef();
    let updateDate = {
        date,
        urgency,
        comment, 
    }
    
    useEffect(()=>{
        switch(urgency){
            case "very urgent":
                option1.current.setAttribute("checked", "checked")
                break;
            case "urgent":
                option2.current.setAttribute("checked", "checked");
                break;
            default:
                option3.current.setAttribute("checked", "checked");
                break;
        }
    },[]);
    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        updateDate[name]= value;
    }
    const submitHandle = async(e)=>{
        e.preventDefault();
        try{
            await BooksServices.updateBookRequested(id,updateDate);
            toast.success("Updated Successfully");
            navigate("/profile");
        }
        catch(err){
            console.log(err);
            toast.error("Failed to update Details")
        }
        console.log(id);
        console.log(updateDate);

    }

    return (
        <div className="container flex justify-center">
            <form className="px-8 pt-6 pb-8 my-4 bg-gray-200 shadow-md rounded" onSubmit={submitHandle}>
                <div className="mb-4 flex justify-center">
                    <h1 className='text-2xl font-bold'>Edit Book Request Form</h1>
                </div>
                <div className="mb-4 flex justify-center">
                    <h1 className='text-2xl font-bold'>Title: {title}</h1>
                </div>
                <div className="mb-4 mt-4">
                    <p className='text-xl'>Select a date</p>
                    <input onChange={handleChange}  name="date"  className='bg-gray-50 border border-gray-300' type="date" min={today}/>
                </div>
                <div className="mb-4 mt-4">
                    <p className='text-xl'>Urgency</p>
                    <fieldset id="urgency" className="flex">
                        <div className="flex items-center mb-4">
                            <input onChange={handleChange}  ref={option1} id="option1" type="radio" name="urgency" value="very urgent" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="option1" className="block  text-sm font-medium text-gray-900 dark:text-gray-300 ml-2 mr-4">
                            Very Urgent
                            </label>
                        </div>
                        
                        <div className="flex items-center mb-4">
                            <input onChange={handleChange}  ref={option2} id="option2" type="radio" name="urgency" value="urgent" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="option2" className="block ml-2 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Urgent
                            </label>
                        </div>

                        <div className="flex items-center mb-4">
                            <input onChange={handleChange}  ref={option3} id="option3" type="radio" name="urgency" value="less urgent" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="option3" className="block ml-2 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Less Urgent
                            </label>
                        </div>
                    </fieldset>
                </div>
                <div className="mb-4 mt-4">
                    <p className='text-xl'>Notes or comments</p>
                    <textarea onChange={handleChange}  name="comment" className='border border-gray-300 p-2' rows="6" cols="60">
                    </textarea>
                </div>
                <div className="mt-4">
                <div className="flex justify-center space-x-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    <Link to="/profile" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancle</Link>
                </div>
                </div>
            </form>
        </div>
    )
}
export default EditBookRequest;