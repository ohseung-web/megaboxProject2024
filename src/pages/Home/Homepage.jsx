import './Homepage.style.css';
import { usePopularMoviesQuery } from '../../hooks/usePopularMovies'; //박스오피스
import { useSingleMoviesQuery } from '../../hooks/useSingleMovies'; // 큐레이션(단독)
import { getImageUrl } from '../../hooks/getImageUrl';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faPlus,
  faSearch,
  faFilm,
  faTicket,
  faMouse,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as faHeartBlank,
  faCalendarDays,
} from '@fortawesome/free-regular-svg-icons';
//redux
import { useDispatch } from 'react-redux'; //redux action dispatch 연결
// import { addToMovies } from "../../Store"

const Home = () => {
  return (
  <div>
      홈 페이지

      
  </div>
  )
}

export default Home
