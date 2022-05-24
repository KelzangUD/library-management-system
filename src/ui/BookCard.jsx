import {FaBook, FaPen, FaLanguage} from 'react-icons/fa';
import {MdCategory} from 'react-icons/md'

const BookCard = ({data})=>{
    // console.log("Book Card")
    console.log(data);
    return(
        <div className="max-w-sm bg-white-500 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
                <h1><FaBook/> Title: {data.title}</h1>
            </div>
            <div className='p-5'>
                <h1><FaPen/> Authors: {data.authors.map((item)=>item)}</h1>
            </div>
            <div className='p-5'>
                <h1><MdCategory/> Category: {data.categories}</h1>
            </div>
            <div className='p-5'>
                <h1><FaLanguage/> Language: {data.language}</h1>
            </div>
        </div>
    )
}

export default BookCard;