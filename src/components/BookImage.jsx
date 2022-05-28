const BookImage = ({imageUrl, alt})=>{
    return (
        <>
            <img className='p-2' src={imageUrl} alt={alt}/>
        </>
    )
}
export default BookImage;