import './Bookingpage.style.css';
import './../../common/Common.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import BookinglistCard from './BookinglistCard';
import { useSelector } from 'react-redux';

const Booking = () => {
  // TMDB 이미지 파일 가져오는 방법 =>  <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}/>

  // new Date(dayCate.date).getDate() => 날짜의 일을 구한다.(1,2,3,4...)
  // new Date(dayCate.date).getDay() => 날짜의 요일을 구한다. (0(일),1(월),2(화),3(수),4(목),5(금),6(토))
  // btn 자료
  // redux를 사용하기 위해 작성한 store.js에 존재하는 변수 가져옴
  let dayCate = useSelector((state) => {return state.dayCate});
 
  // 날짜의 요일을 한글로 담는다.
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  // 요일 btutton클릭시 button 배경색과 border색 변경하는 토글
  const [btnActive, setBtnActive] = useState(false);
  const toggleActive = (e) => {
    setBtnActive((prev) => {
      return e.target.value;
    });
  };
  let startDay = new Date(dayCate[0].date).getDate();
  console.log("최초데이터 : " + startDay);

  return (
    <>
      <div className="bookingContainer">
        <h3>빠른예매</h3>
        <div className="date-area">
          {dayCate.map((d, i) => {
            return (
              <Link to={`/booking/BookinglistCard/${d.date}`}>
                <button
                  key={d.id}
                  value={i}
                  type="button"
                  className={i == btnActive ? 'active' : ''}
                  onClick={toggleActive}
                  style={{
                    color:
                      new Date(d.date).getDay() == 6
                        ? '#3b5fcb'
                        : new Date(d.date).getDay() == 0
                        ? '#e81002'
                        : 'black',
                  }}
                  date-data={d.date}
                >
                  <span>{new Date(d.date).getDate()}</span>
                  <em>·{week[new Date(d.date).getDay()]}</em>
                </button>
               </Link>
            );
          })}
        </div>
        <div className="bookingWrap">
          <BookinglistCard />
        </div>
      </div>
    </>
  );

};


export default Booking;
