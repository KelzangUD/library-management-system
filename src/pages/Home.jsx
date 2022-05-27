import { useContext } from "react";
import BooksContext from "../context/bookContext/BooksContext";

import Spinner from "../components/Spinner";
import BookCard from "../ui/BookCard";

const Home = ()=>{
    const {booksData, isLoading} =useContext(BooksContext);
    // console.log(booksData)
    if(isLoading){
        return <Spinner/>
    }
    
    return (
        <div className="container">
            <div className="grid grid-cols-6 gap-5 pt-5 pb-5">
            {
                booksData.map((book)=>(
                    <div key={book.id}>
                        <BookCard  data={book}/>
                    </div>
                ))
            }
        </div>
        </div>
    );
}

export default Home;