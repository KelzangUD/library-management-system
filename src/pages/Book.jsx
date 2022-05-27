import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react';

const Book = ()=>{
    const [bookData, setBooksData] = useState([]);
    const location = useLocation()
    const { id } = location.state;
    // console.log(`id value for book is ${id}`);

    const docRef = doc(db, 'books', id);
    useEffect(()=>{
        getDoc(docRef).then((doc)=>{
            // console.log(doc.data());
            setBooksData(doc.data());
        })
    },[])
    console.log(bookData);
    return (
        <div className='container grid grid-cols-2 pt-5'>
            <div>
                <img src={bookData.imageUrl} alt={bookData.title}/>
            </div>
            <div>
                <header>
                <h1>Title: {bookData.title}</h1>
                <p>Authors: {bookData.authors.map((item)=>(
                    <span>{item}</span>
                ))}</p>
                <p>Category: {bookData.categories}</p>
                <p>Publisher: {bookData.publisher}</p>
                <p>Published Date: {bookData.publishedDate}</p>
                </header>
                <main>
                    <p>Description:</p>
                    <p>{bookData.description}</p>
                    <p>Average Rating: {bookData.averageRating}</p>
                    <button>Check Reviews</button>
                </main>
            </div>
        </div>
    )
}
export default Book;