import React from 'react';
import './Bookingpage.style.css';
import './../../common/Common.css';
import { useState, useEffect } from 'react';
import { useParams , Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';


function BookinglistCard() {
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
      });
    // .then((json) => console.log(json))
    // .catch((err) => console.error('error:' + err));
    }, []);

  // useParams()로 넘겨받은 매개변수 값인 Paramdate의 일자만 추출한다.
 // const inputDate = Paramdate;
  let { Paramdate } = useParams(); 
  const newDate = new Date(Paramdate);
  const day = newDate.getDate();
 
  // redux를 사용하기 위해 작성한 store.js에서 받아온 자료
  let startDay = new Date(dayCate[0].date).getDate();
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
                 .filter((movies) => new Date(movies.release_date).getDate() === startDay ?  
                 new Date(movies.release_date).getDate() === startDay: new Date(movies.release_date).getDate() === day)
                //.filter((movies) => new Date(movies.release_date).getDate() === day )
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
