import { Link} from 'react-router-dom';

const BookCard = ({data, index})=>{
    const bookTitle = data.title;
    // console.log(data.id);
    return(
        <div className='container'>
            <Link to={`/book/${bookTitle}`} state={{id: data.id}}>
            <img src={data.imageUrl} alt={data.title} style={{height:"200px", width:"150px"}}/>
            </Link>
        </div>
    )
}

export default BookCard;