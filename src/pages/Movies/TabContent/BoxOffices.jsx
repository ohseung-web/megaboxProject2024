import { usePopularMoviesQuery } from '../../../hooks/usePopularMovies';
import { useState, useEffect } from 'react';
import { getImageUrl } from '../../../hooks/getImageUrl';
import { Link } from 'react-router-dom';
import './TabContent.style.css';
import all46x46 from '../all_46x46.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons'
import {
  faHeart as faHeartBlank,
  faHeart,
  faPlus,
} from '@fortawesome/free-regular-svg-icons';
//redux
import { useDispatch } from 'react-redux'; //redux action dispatch 연결
// import { addToMovies } from '../../../Store';

export default function BoxOffices() {
  /* const {data, isLoading, isError, error} = usePopularMoviesQuery()
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
    } */

  return (
    <>
      {/* ===============1. 박스오피스 */}
      <div className="box-office tab-container"></div>
    </>
  );
}
