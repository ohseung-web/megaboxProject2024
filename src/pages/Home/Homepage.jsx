import "./Homepage.style.css"
import { usePopularMoviesQuery } from "../../hooks/usePopularMovies" //박스오피스
import { useSingleMoviesQuery } from "../../hooks/useSingleMovies" // 큐레이션
import { getImageUrl } from "../../hooks/getImageUrl"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faPlus, faSearch, faFilm, faTicket, faMouse } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartBlank, faCalendarDays } from "@fortawesome/free-regular-svg-icons"
//redux
import { useDispatch } from "react-redux" //redux action dispatch 연결
import { addToMovies } from "../../Store"


const Home = () => {
    const {data, isLoading, isError, error} = usePopularMoviesQuery()
    const {dataSin, isLoadingSin, isErrorSin, errorSin} = useSingleMoviesQuery()
    const [boxOffices, SetBoxOffices] = useState([])
    const [boxSingle, SetBoxSingle] = useState([])
    
    useEffect(()=>{
        if(data){SetBoxOffices(data)}
        if(dataSin){SetBoxSingle(dataSin);}
        console.log(boxOffices)
        console.log(boxSingle) //왜안나와..?
        
    },[isLoadingSin, isLoading])
    //if(isLoading) return '<p>is Loadings...</p>';

    //redux 상태업데이트함수(Link onclick으로 새로운 값 대입)
    const dispatchEvent = useDispatch();
    const handleAddToMovies = (data) => {
        dispatchEvent(addToMovies(data));
    }
    
    return (
    <main>
        <div className="visual_bg">
            {/* ===============1. 박스오피스 */}
            <div className="box-office">
                <div className="title">
                    <h1>박스 오피스</h1>
                    <Link to="/movies" className="movie_more">더 많은 영화보기 <FontAwesomeIcon icon={faPlus} /></Link>
                </div>
                <ul className="movie-list">
                    {boxOffices.slice(0, 4).map((data, index)=>{
                        //console.log('return in', getImageUrl()) //https://image.tmdb.org/t/p/w400undefined
                        return(
                            <li key={data.id}>
                                <div className="info">
                                    <Link to={`/moviesdetail?MovieNo=${data.id}`} onClick={()=>handleAddToMovies(data)}>
                                        <div className="poster">
                                            <span>{index+1}</span>
                                            <img src={getImageUrl(data.poster_path)} alt={data.title} />
                                        </div>
                                        <div className="overview">
                                            <p>{data.overview}</p>
                                            <h2 className="vote">전체 관람 인원<span>{data.vote_average}</span></h2>
                                        </div>
                                    </Link>
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
            <div className="searchLink">
                <div className="search">
                    <input type="text" placeholder="영화명을 입력해주세요" />
                    <button type="button" className="searchBtn"><FontAwesomeIcon icon={faSearch} /></button>
                </div>
                <Link to="" className="calender"><FontAwesomeIcon icon={faCalendarDays} /><span>상영시간표</span></Link>
                <Link to="/movies" className="film"><FontAwesomeIcon icon={faFilm} /><span>박스오피스</span></Link>
                <Link to="/booking" className="ticket"><FontAwesomeIcon icon={faTicket} /><span>빠른예매</span></Link>
            </div>
            <div className="mouse"><FontAwesomeIcon icon={faMouse} /></div>
        </div>
        {/* ===========3. 혜택 */}
        {/* ===========3-1. 혜택-이벤트 배너 및 혜택 영화 소개 */}
        {/* ===========3-2. 혜택-vip~멤버십~이벤트~스토어 */}
        {/* ===========4. 큐레이션 */}
        <div className="curationWrap">
            <div className="curation">
                <div className="title">
                    <h1>큐레이션</h1>
                    <Link to="/movies/singlemovie">큐레이션 더보기</Link>
                </div>
                <div className="container">
                    <ul>
                        {boxSingle.map((data,index)=>(
                            <li key={index}>{data.title}</li>
                        ))}
                    </ul>
                    
                </div>
            </div>
        </div>
        {/* ===========5. 메가박스 안내 */}
        {/* ===========5-1. 안내-돌비, 프라이빗 등 관 안내  */}
        {/* ===========5-2. 안내-공지사항  */}
        {/* ===========5-3. 안내-고객센터, 문의, 접수, 대관예매 등  */}
    </main>
    )
}

export default Home
