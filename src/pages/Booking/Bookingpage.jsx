import './Bookingpage.style.css';

// import './src/common/Common.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Bookinglist from './Bookinglist';

const Booking = () => {
  // new Date(dayCate.date).getDate() => 날짜의 일을 구한다.(1,2,3,4...)
  // new Date(dayCate.date).getDay() => 날짜의 요일을 구한다. (0(일),1(월),2(화),3(수),4(목),5(금),6(토))
  // btn 자료
  const dayCate = [
    { id: 0, date: '2024-08-05' },
    { id: 1, date: '2024-08-06' },
    { id: 2, date: '2024-08-07' },
    { id: 3, date: '2024-08-08' },
    { id: 4, date: '2024-08-09' },
    { id: 5, date: '2024-08-10' },
    { id: 6, date: '2024-08-11' },
  ];

  // 날짜의 요일을 한글로 담는다.
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  // 요일 btutton클릭시 button 배경색과 border색 변경하는 토글
  const [btnActive, setBtnActive] = useState(false);
  const toggleActive = (e) => {
    setBtnActive((prev) => {
      return e.target.value;
    });
  };

  return (
    <>
      <div className="bookingContainer">
        <h3>빠른예매</h3>
        <div className="date-area">
          {dayCate.map((d, i) => {
            return (
              <Link to={`/booking/Bookinglist/${d.date}`}>
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
          <Bookinglist />
        </div>
      </div>
    </>
  );
};

export default Booking;
