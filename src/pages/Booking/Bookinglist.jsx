import React from 'react';
import './Bookingpage.style.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Bookinglist() {
  // TMDB에서 가져온 영화정보를 담는 변수지정
  const [movies, setMovies] = useState([]);

  //npm install node-fetch@2 설치한다.
  const fetch = require('node-fetch');

  const url =
    'https://api.themoviedb.org/3/discover/movie?certification_country=south%20korea&include_adult=false&include_video=false&language=ko-kr&page=1&primary_release_year=2024&primary_release_date.gte=2024-8-5&primary_release_date.lte=2024-8-11&sort_by=popularity.desc';

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2M3NGNhNDY3YzFjMmNjMTk4NmZlOGM2ZWYzODEwYSIsIm5iZiI6MTcyMzYzMzA0Ni41NjExOSwic3ViIjoiNjZiNWJiMDE3NThkNDE5NDBjMDcxMmY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ZIqt5EHhpmYObEOJHuPm4TNXlnH9b2aQKbJLpDaPWng',
    },
  };

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

  let { Paramdate } = useParams();

  // useParams()로 넘겨받은 매개변수 값인 Paramdate의 일자만 추출한다.
  const inputDate = Paramdate;
  const newDate = new Date(inputDate);
  const day = newDate.getDate();
  console.log(Paramdate);
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
                .filter((movies) => new Date(movies.release_date).getDate() === day)
                .map((movie, i) => {
                  return (
                    <div key={i} className="bookinglist">
                      <span className='age-all'>ALL</span>
                      <p className='movie-tit'>{movie.title}</p>
                      {/* <p>{date.getDate( movie.release_date )}</p> */}
                    </div>
                  );
                })}
            </div>
          </div>
    </>
    
  );
}

export default Bookinglist;
