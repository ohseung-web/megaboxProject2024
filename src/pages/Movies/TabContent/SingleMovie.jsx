import { useSingleMoviesQuery } from '../../../hooks/useSingleMovies';
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
import { useDispatch } from 'react-redux';
// import { addToMovies } from "../../../Store"

export default function SingleMovie() {
  /* const {data, isLoading, isError, error} = useSingleMoviesQuery()
    const [boxSingle, SetboxSingle] = useState([])
    useEffect(()=>{
        if(data){
            SetboxSingle(data)
        }
    },[isLoading])

    const dispatchEvent = useDispatch();
    const handleAddToMovies = (data)=>{
        dispatchEvent(addToMovies(data));
    } */

  return (
    <>
      <div className="box-office tab-container"></div>
    </>
  );
}
