import React from 'react';
import './Bookingpage.style.css';
import './../../common/Common.css';
import { useState, useEffect } from 'react';
import { useParams , Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';

function BookinglistCard({selectDate}) {
  // TMDB에서 가져온 영화정보를 담는 변수지정
  const [movies, setMovies] = useState([]);   
  
  // redux를 사용하기 위해 작성한 store.js에 존재하는 변수 가져옴
  let url = useSelector((state) => {return state.url});
  let options = useSelector((state) => {return state.options});
  let dayCate = useSelector((state) => {return state.dayCate});

   // useEffect()를 이용하여 return()안이 랜더링 될 때 위의 TMDB에서 불러온 url과 options을 json으로 response(응답)받는다, 그런 다음 그  자료를 setMovies의 변수에 저장한다.
   useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        setMovies(res.results);
        console.log(res.results); // fetch한 영화 데이터 확인
      });
    // .then((json) => console.log(json))
    // .catch((err) => console.error('error:' + err));
    }, [url,options]);
    
  // toDateString() => 주어진 일자를 'Mon Aug 05 2024'문자 형식으로 출력하는 함수
  // paramDate는 booking 페이지에 넘겨준 날짜이다.
  const paramDate = new Date(selectDate).toDateString();
  
  // redux를 사용하기 위해 작성한 store.js에서 받아온 시작일자
  const startDate = new Date(dayCate[0].date).toDateString();

  return (
    <>
          <div className="movie-choice">
            <p className="movie">영화</p>
            <div className='btnALL'>
                <button type="button" className="btnAllchoice">
                  전체
                </button>
                <button type="button" className="btnCuration">
                  큐레이션
                </button>
            </div>
            <div className="list-area">
              {movies
                .filter((movie) => new Date(movie.release_date).toDateString() === paramDate )
                .map((movie, i) => {
                  return (
                   <Link to={`/Reservation`} key={movie.id}>
                      <div key={movie.id} className="bookinglist">
                        <span className='age-all'>ALL</span>
                        <p className='movie-tit'>{movie.title}</p>
                        {/* <p>{date.getDate( movie.release_date )}</p> */}
                      </div>
                   </Link>  
                  );
                })}
            </div>
          </div>
    </>
  );
}

export default BookinglistCard;
