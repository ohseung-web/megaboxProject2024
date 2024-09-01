import { usePopularMoviesQuery } from "../../../hooks/usePopularMovies"
import { useState, useEffect } from "react"
import { getImageUrl } from "../../../hooks/getImageUrl"
import { Link } from "react-router-dom"
import './TabContent.style.css'
import all46x46 from '../all_46x46.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartBlank, faHeart, faPlus } from "@fortawesome/free-regular-svg-icons"
//redux
import { useDispatch } from "react-redux" //redux action dispatch 연결
import { addToMovies } from "../../../Store2";


export default function BoxOffices(){
    const {data, isLoading, isError, error} = usePopularMoviesQuery()
    const [boxOffices, SetBoxOffices] = useState([])

    useEffect(()=>{
        if(data){
            SetBoxOffices(data)
        }else{console.log('error')}
    },[isLoading])

    //redux 상태업데이트함수(Link onclick으로 새로운 값 대입)
    const dispatchEvent = useDispatch();
    const handleAddToMovies = (data) => {
        dispatchEvent(addToMovies(data));
    }

    return (
        <>
            {/* ===============1. 박스오피스 */}
            <div className="box-office tab-container">
                <ul className="movie-list">
                    {boxOffices.slice(0, 20).map((data, index)=>{
                        return(
                            <li key={data.id}>
                                <div className="info">
                                    {/* <Link to="/moviesdetail"> */}
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
                                <div className="info_detail">
                                    <h2 className="title">
                                        <img src={all46x46} alt="" className="allAgeIcon" />
                                        <span className="name">{data.title}</span>{/* 영화 메뉴 영역에서만 존재 클래스 */}
                                    </h2>
                                    <p>
                                        <span className="count">투표수 {data.vote_count}</span>
                                        <span>개봉일 {data.release_date}</span>
                                    </p>
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

        </>
    )
}