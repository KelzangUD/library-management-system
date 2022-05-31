import { useLocation } from 'react-router-dom';

import Reviews from '../components/Reviews';
import BookDetails from '../components/BookDetails';
import BookImage from '../components/BookImage';

import BooksServices from '../services/BooksServices';
import { toast } from 'react-toastify';

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
    useEffect(() => {
        console.log("The id here is : ", id);
        if (id !== undefined && id !== "") {
          getBook();
        }
      }, [id]);
      const getBook = async () => {
        try {
          const response = await BooksServices.getBook(id);
        //   console.log("the record is :", response.data());
          setBooksData(response.data());
        } catch (err) {
          toast.error("Error fetching book details")
        }
      };
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