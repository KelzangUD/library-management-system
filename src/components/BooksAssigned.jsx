import { useContext } from 'react';
import BooksContext from '../context/bookContext/BooksContext';

const BooksAssigned = ()=>{
    const {booksData} = useContext(BooksContext);
    return (
        <div>
        <h1>Books Assigned</h1>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Author(s)</th>
                        <th scope="col" className="px-6 py-3">Category</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Urgency</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            booksData.map((item)=>(
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={item.id}>
                                    <th scope="row" className="px-6 py-4">{item.title}</th>
                                    <td className="px-6 py-4">{item.authors.map((item)=>(item))}</td>
                                    <td className="px-6 py-4">{item.categories}</td>
                                    <td className="px-6 py-4">Date</td>
                                    <td className="px-6 py-4">Urgency</td>
                                </tr>
                            ))
                        }
                </tbody>
            </table>
        </div>
    )
}
export default BooksAssigned;