import { useContext } from "react";
import BooksContext from "../context/bookContext/BooksContext";
import { getAuth } from "firebase/auth";

const BooksAssigned = ()=>{
    const {assignedBook} = useContext(BooksContext);
    const auth = getAuth();
    let user = auth.currentUser.email;
    console.log(assignedBook);
    let assigedBooks = [];
    assignedBook.map((item)=>{
        if(item.user==user){
            assigedBooks.push(item);
        }
    })
    console.log(assigedBooks);
    return (
        <div>
        <h1>Books Assigned</h1>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Author(s)</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Urgency</th>
                        <th scope="col" className="px-6 py-3">Comment</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            assigedBooks.map((item)=>(
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item.id}>
                                    <th scope="row" className="px-6 py-4">{item.title}</th>
                                    <td className="px-6 py-4">{item.authors.map((item)=>(item))}</td>
                                    <td className="px-6 py-4">{item.date}</td>
                                    <td className="px-6 py-4">{item.urgency}</td>
                                    <td className="px-6 py-4">{item.comment}</td>
                                </tr>
                            ))
                        }
                </tbody>
            </table>
        </div>
    )
}
export default BooksAssigned;