import "./Homepage.style.css"
import { usePopularMoviesQuery, getImageUrl } from "../../hooks/usePopularMovies"
import { useState, useEffect } from "react"

const Home = () => {
    const {data, isLoading, isError, error} = usePopularMoviesQuery()
    const [boxOffices, SetBoxOffices] = useState([])
    
    useEffect(()=>{
        if(data){
            SetBoxOffices(data)
            console.log('data ==>', data)
        }else{console.log('error')}
        
    },[isLoading])
    //if(isLoading) return '<p>is Loadings...</p>';
    
    return (
    <main>
        <div className="box-office">
            <div className="title">
                <h1>박스 오피스</h1>
                <a href="#" className="movie_more">더 많은 영화보기</a>
            </div>
            <ul className="movie-list">
                {boxOffices.slice(0, 4).map((data, index)=>{
                    console.log(data.release_dates)
                    //console.log('return in', getImageUrl()) //https://image.tmdb.org/t/p/w400undefined
                    return(
                        <li key={data.id}>
                            <div className="info">
                                <div className="poster">
                                    <span>{index+1}</span>
                                    <img src={getImageUrl(data.poster_path)} alt={data.title} />
                                </div>
                                <div className="overview">
                                    <p>{data.overview}</p>
                                    <h2 className="vote">전체 관람 인원<span>{data.vote_average}</span></h2>
                                </div>
                            </div>
                            <div className="vote_reservation">
                                <button type="button" className="count">{data.vote_count}</button>
                                <button type="button" className="reservation" title="영화 예매하기">예매</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    </main>
    )
}

export default Home
