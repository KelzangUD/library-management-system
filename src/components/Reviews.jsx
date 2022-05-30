import {BiCommentDetail} from 'react-icons/bi';

const Reviews = ({bookData})=>{
    const {reviews} = bookData;
    // console.log(reviews);
    return (
        <>
            <div><p className='text-xl flex justify-center items-center'><BiCommentDetail className='mx-2'/> Reviews Section</p></div>
                    {'reviews'in bookData?(
                        reviews.map((item)=>(
                            <div className='contanier my-3 bg-slate-100 p-6' key={item.name}>
                                <header>
                                    <p className='font-semibold text-blue-600'>{item.name}</p>
                                </header>
                                <main className='pt-2'>
                                    <p><i>{item.review}</i></p>
                                </main>
                            </div>
                        ))
                    )
                    :<p className='flex justify-center text-xl text-red-500'>Review Not Availble</p>}
        </>
    )
}
export default Reviews;