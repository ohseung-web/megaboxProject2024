import './MoviesDetail.style.css';
import { useSelector } from 'react-redux';
import { getImageUrl } from '../../hooks/getImageUrl';
import { Link } from 'react-router-dom';

export default function MoviesDetail(){

    const movies = useSelector((state)=>state.cart)
    //console.log(movies)

    return (
        <div className='movieDetailsWrap'>
            <div className="thumnailBox" style={{backgroundImage:`url(${getImageUrl(movies.backdrop_path)})`}}>
                <div className="thumnail">
                    <div className="info">
                        <p className="date">개봉일 {movies.release_date}</p>
                        <h1>{movies.title}</h1>
                        <div className="link">
                            <Link to="" className="count">{movies.vote_count} k</Link>
                            <Link to="">공유하기</Link>
                        </div>
                        <dl className="details">
                            <dt>예매율</dt>
                            <dd>{movies.vote_average}</dd>
                            <dt>누적관객수</dt>
                            <dd>{movies.vote_count}명</dd>
                        </dl>
                    </div>
                    <div className="poster">
                        <img src={getImageUrl(movies.poster_path)} alt={movies.title} />
                        <Link to="/booking">예매</Link>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="originalTitle">"{movies.original_title}"</div>
                <div className="overview">{movies.overview}</div>
            </div>
        </div>
    )
}