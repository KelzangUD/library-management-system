const BookCard = ({data})=>{
    // console.log("Book Card")
    // console.log(data);
    return(
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
                <h1>Title: {data.title}</h1>
            </div>
        </div>
    )
}

export default BookCard;