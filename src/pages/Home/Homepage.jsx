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
  /* const {data:dataPopular, isLoading:isLoadingPopular} = usePopularMoviesQuery()
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
     */
  return (
    <main>
      homepage
      {/*  */}
      {/* ===========5. 메가박스 안내 */}
      {/* ===========5-1. 안내-돌비, 프라이빗 등 관 안내  */}
      {/* ===========5-2. 안내-공지사항  */}
      {/* ===========5-3. 안내-고객센터, 문의, 접수, 대관예매 등  */}
    </main>
  );
};

export default Home;
