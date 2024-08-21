import "./Homepage.style.css"
import { usePopularMoviesQuery, getImageUrl } from "../../hooks/usePopularMovies"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartBlank } from "@fortawesome/free-regular-svg-icons"

const Home = () => {
    const {data, isLoading, isError, error} = usePopularMoviesQuery()
    const [boxOffices, SetBoxOffices] = useState([])
    
    useEffect(()=>{
        if(data){
            SetBoxOffices(data)
            //console.log('data ==>', data)
        }else{console.log('error')}
        
    },[isLoading])
    //if(isLoading) return '<p>is Loadings...</p>';
    
    return (
    <main>
        {/* ===============1. 박스오피스 */}
        <div className="box-office">
            <div className="title">
                <h1>박스 오피스</h1>
                <a href="#" className="movie_more">더 많은 영화보기 <FontAwesomeIcon icon={faPlus} /></a>
            </div>
            <ul className="movie-list">
                {boxOffices.slice(0, 4).map((data, index)=>{
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
                                <button type="button" className="count"><FontAwesomeIcon icon={faHeartBlank} /> {data.vote_count}</button>
                                <Link to="/booking" className="reservation" title="영화 예매하기">예매</Link>
                                {/* 예매 클릭 시 pages/Booking/BookingPage.jsx 이동 */}
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
        {/* ===========2. 영화 예매 및 시간표, 박스오피스, 빠른 예매 링크 */}
        {/* ===========3. 혜택 */}
        {/* ===========3-1. 혜택-이벤트 배너 및 혜택 영화 소개 */}
        {/* ===========3-2. 혜택-vip~멤버십~이벤트~스토어 */}
        {/* ===========4. 큐레이션 */}
        {/* ===========5. 메가박스 안내 */}
        {/* ===========5-1. 안내-돌비, 프라이빗 등 관 안내  */}
        {/* ===========5-2. 안내-공지사항  */}
        {/* ===========5-3. 안내-고객센터, 문의, 접수, 대관예매 등  */}
    </main>
    )
}

export default Home
