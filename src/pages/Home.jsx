import { useContext } from "react";
import BooksContext from "../context/bookContext/BooksContext";

import BookCard from "../ui/BookCard";

const Home = ()=>{
    const {booksData} =useContext(BooksContext);
    // console.log(booksData)
    return(
        <div className="container">
            <div className="grid grid-cols-3 gap-3 pt-5 pb-5">
            {
                booksData.map((book)=>(
                    <div key={book.id}>
                        <BookCard  data={book}/>
                    </div>
                ))
            }
        </div>
        </div>
    )
}

export default Home;