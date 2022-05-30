import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useLocation } from 'react-router-dom';

import Reviews from '../components/Reviews';
import BookDetails from '../components/BookDetails';
import BookImage from '../components/BookImage';

import { useState, useEffect } from 'react';

const Book = ()=>{
    const [bookData, setBooksData] = useState({
        authors: [],
        available:false,
        averageRating:0,
        categories: '',
        description: '',
        imageUrl:'',
        reviews: [],
        title: '',
    });
    const location = useLocation()
    const { id } = location.state;
    // console.log(`id value for book is ${id}`);

    useEffect(()=>{
        getDoc(doc(db, 'books', id)).then((doc)=>{
            // console.log(doc);
            setBooksData(doc.data());
        })
    },[])
    // console.table(bookData);
    let {imageUrl, title} = bookData;

    return (
            <div className='container grid pt-5 pb-5'>
                <div className='flex'>
                    <div className='border-2 basis-1/4'>
                        <BookImage imageUrl={imageUrl} alt={title} />
                    </div>
                    <div className='mx-8 basis-3/4'>
                        <BookDetails bookData= {bookData} id={id}/>
                    </div>
                </div>
                <hr className='my-5'/>
                <div>
                    <Reviews bookData={bookData}/>
                </div>
            </div>
    )
}
export default Book;