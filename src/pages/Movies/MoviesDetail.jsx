import './MoviesDetail.style.css';
import { useSelector } from 'react-redux';

export default function MoviesDetail(){

    const movies = useSelector((state)=>state.cart)
    console.log(movies)

    return (
        <div className='movie-details-wrap'>
            <p>MoviesDetail</p>
            <div>
                <h1>{movies.title}</h1>
                <h1>{movies.map((data, index)=>(
                    <span key={index}>
                        {data.title}
                    </span>
                ))}</h1>
            </div>
        </div>
    )
}