import './Bookingpage.style.css';
// import './src/common/Common.css';
import React from 'react';
import { useState, useEffect } from 'react';

const Booking = () => {
  // TMDB에서 가져온 영화정보를 담는 변수지정
  const [movies, setMovies] = useState([]);

  const fetch = require('node-fetch');

  const url =
    'https://api.themoviedb.org/3/discover/movie?certification_country=south%20korea&include_adult=false&include_video=false&language=ko-kr&page=1&primary_release_year=2024&primary_release_date.gte=2024-8-1&primary_release_date.lte=2024-8-7&sort_by=popularity.desc';

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
      })
      .then((json) => console.log(json))
      .catch((err) => console.error('error:' + err));
  }, []);

  return (
    <div className="bookingContainer">
      <h3>예매 페이지</h3>
      {/* <div className="date-area">
          <button
            type="button"
            date-data="2024.08.01"
            className={btnActive ? 'active' : ''}
            onClick={toggleActive}
          >
            <span>1</span>
            <em>·목</em>
          </button>
          <button
            type="button"
            date-data="2024.08.02"
            className={btnActive ? 'active' : ''}
            onClick={toggleActive}
          >
            <span>2</span>
            <em>·금</em>
          </button>
          <button
            id="sat"
            type="button"
            date-data="2024.08.03"
            className={btnActive ? 'active' : ''}
            onClick={toggleActive}
          >
            <span>3</span>
            <em>·토</em>
          </button>
          <button
            id="holi"
            type="button"
            date-data="2024.08.04"
            className={btnActive ? 'active' : ''}
            onClick={toggleActive}
          >
            <span>4</span>
            <em>·일</em>
          </button>
          <button
            type="button"
            date-data="2024.08.05"
            className={btnActive ? 'active' : ''}
            onClick={toggleActive}
          >
            <span>5</span>
            <em>·월</em>
          </button>
          <button
            type="button"
            date-data="2024.08.06"
            className={btnActive ? 'active' : ''}
            onClick={toggleActive}
          >
            <span>6</span>
            <em>·화</em>
          </button>
          <button
            type="button"
            date-data="2024.08.07"
            className={btnActive ? 'active' : ''}
            onClick={toggleActive}
          >
            <span>7</span>
            <em>·수</em>
          </button>
        </div> */}
      {movies.map((movie, i) => {
        return (
          <div key={movie.id} className="bookinglist">
            <p>{movie.id}</p>
            <p>{movie.title}</p>
            <p>{movie.release_date}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            />
            {/* <img src={movie.backdrop_path} /> */}
          </div>
        );
      })}
    </div>
  );
};

export default Booking;
