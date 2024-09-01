import "./Homepage.style.css"
import { usePopularMoviesQuery } from "../../hooks/usePopularMovies" //박스오피스
import { useSingleMoviesQuery } from "../../hooks/useSingleMovies" // 큐레이션(단독)
import { getImageUrl } from "../../hooks/getImageUrl"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faPlus, faSearch, faFilm, faTicket, faMouse } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartBlank, faCalendarDays } from "@fortawesome/free-regular-svg-icons"
//redux
import { useDispatch } from "react-redux" //redux action dispatch 연결
import { addToMovies } from "../../Store2"


const Home = () => {
    const {data:dataPopular, isLoading:isLoadingPopular} = usePopularMoviesQuery()
    const {data:dataSingle, isLoading:isLoadingSingle} = useSingleMoviesQuery()
    const [boxOffices, SetBoxOffices] = useState([])
    const [boxSingle, SetBoxSingle] = useState([])
    
    useEffect(()=>{
        if(dataPopular){
            SetBoxOffices(dataPopular); 
            SetBoxSingle(dataSingle)
        }
        console.log(dataPopular)
        console.log(dataSingle)
        
    },[isLoadingPopular, isLoadingSingle])
    //if(isLoading) return '<p>is Loadings...</p>';
    //if(isLoadingSin) return <div>Loading...</div>;
    //if(errorSin) return <div>error single movies...</div>;

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
                    <Link to="/movies" className="moreView">더 많은 영화보기 <FontAwesomeIcon icon={faPlus} /></Link>
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
                    <Link to="/movies/singlemovie" className="moreView">큐레이션 더보기 <FontAwesomeIcon icon={faPlus} /></Link>
                </div>
                <div className="container">
                    {/* 대표 큐레이션 포스터 */}
                    {boxSingle.slice(0,1).map((dataS,indexS)=>(
                        <div className="bigThum" key={indexS}>
                            <Link to={`/moviesdetail?MovieNo=${dataS.id}`} onClick={()=>handleAddToMovies(dataS)}>
                                <img src={getImageUrl(dataS.poster_path)} alt={dataS.title} />
                            </Link>
                            <div className="link">
                            <Link to={`/moviesdetail?MovieNo=${dataS.id}`} onClick={()=>handleAddToMovies(dataS)}>상세정보</Link>
                                <Link to="/booking" className="reservation">예매</Link>
                            </div>
                        </div>
                    ))}
                    <div className="contents">
                        {/* 대표 큐레이션 제목+내용 */}
                        {boxSingle.slice(0,1).map((dataS,indexS)=>(
                            <div className="titleContent" key={indexS}>
                                <p className="subTitle">#필름소사이어티</p>
                                <h2>{dataS.title}</h2>
                                <p>{dataS.overview}</p>
                            </div>
                        ))}
                        {/* 추가 큐레이션 리스트 */}
                        <ul className="curationList">
                            {boxSingle.slice(1,5).map((dataS,indexS)=>(
                                <li key={indexS}>
                                    <Link to={`/moviesdetail?MovieNo=${dataS.id}`} onClick={()=>handleAddToMovies(dataS)}>
                                        <span><img src={getImageUrl(dataS.poster_path)} alt={dataS.title} /></span>
                                        <span>{dataS.title}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
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
