import { useContext } from "react";
import BooksContext from "../context/bookContext/BooksContext";

import BookCard from "../ui/BookCard";

const Home = ()=>{
    const {booksData} =useContext(BooksContext);
    console.log(booksData)
    return(
        <div className="container grid grid-cols-4 gap-4">
            {
                booksData.map((book)=>(
                    <div key={book.id}>
                        <BookCard  data={book}/>
                    </div>
                ))
            }
        </div>
    )
}

export default Home;