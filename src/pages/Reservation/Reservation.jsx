import React, { useState, useEffect } from 'react';
import './Reservation.style.css';
import './../../common/Common.css';
import reset from './images/ico-reset-small.png';
import ReserationInfo from './ReserationInfo';
import { current } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const  Reservation = () => {

//예매좌석 100좌석 2차원 배열로 지정
const seatArray = Array.from(Array(10), () => new Array(10));

const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; //좌석 열 알파벳

// screen 좌석 테이블
// React에서 사용하는 innerHtml => <div className="seat" dangerouslySetInnerHTML={{__html:SeatTable()}}>
  function SeatTable() {
  let seatTable = "<table class='seattable' >";
  for (let i = 0; i < seatArray.length; i++) {
    seatTable += '<tr>';
    seatTable += "<td class='alpha'>" + alpha[i] + '</td>';
    for (let j = 0; j < seatArray[0].length; j++) {
      seatTable += '<td class="seatTd">' + (j + 1) + '</td>';
    }
    seatTable += '</tr>';
  }
  seatTable += '</table>';

  return seatTable;
}

// 예매인원 구분 countList를 redux를 사용하기 위해 작성한 store.js에 존재하는 변수 가져옴
 let countList = useSelector((state) => {return state.countList} )
 const [reservCountList] = useState(countList);

  return(
   <>
      <div className="Resercontainer">
        <h3>빠른예매</h3>
        <div className="line"></div>
        <div className="reserve">
          <div className="reserve_left">
              <div className="reserve_header">
                  <span>관람인원선택</span>
                  <button type="button" className="resetbtn">
                  <img src={reset} alt="" />&nbsp;<span
                  >초기화</span>
                  </button>  
              </div>
              <div className="screen">
                <div className="screen_header">
                  {countList.map((e,i)=>{
                    return(
                     <CountCard key={reservCountList[i].id} reservCountList={reservCountList[i]} i={i+1} />
                    ) 
                  })}
                </div>
              <div className="screen_seat">
                  <p className="screentext">SCREEN</p>
                  <div className="seat" dangerouslySetInnerHTML={{__html:SeatTable()}}></div>
              </div>
            </div>  
          </div>
          <div className="reserve_right">
              <ReserationInfo />
          </div>
        </div>
      </div>
    </>
   )
}

// 예매인원 
const CountCard = (props) =>{
  const [reservationCount, setReservationCount] = useState(0);

  //예매인원 plus되는 함수 
  const reservPlusCountHandler = () =>{
    if(reservationCount < 8){
      setReservationCount(current => current + 1)
       for(let i=0; i<props.reservCountList.length; i++){
        props.reservCountList[i].count = setReservationCount;
       }
    }else{
      alert("예매인원은 최대 8명까지 가능합니다.")
    }
  }
  // 예매인원 minus되는 함수
  const reservMinusCountHandler = () =>{
    if(reservationCount == 0){
       alert("최소 예매인원은 1명 입니다.")
       setReservationCount(current => 0)
       for(let i=0; i<props.reservCountList.length; i++){
        props.reservCountList[i].count = setReservationCount;
       }
    }else{
      setReservationCount(current => current - 1)
       for(let i=0; i<props.reservCountList.length; i++){
        props.reservCountList[i].count = setReservationCount;
       }
    }
  }
  
  console.log(reservationCount);
  return(
    <>
       <div key={props.reservCountList.id} className="distinguishCnt">
          <span>{props.reservCountList.listname}</span>
          <button className="minus" onClick={reservMinusCountHandler}>{props.reservCountList.minus}</button>
          <label className="cnt">{reservationCount}</label>
          <button className="plus" onClick={reservPlusCountHandler}>{props.reservCountList.plus}</button>
      </div>
    </>
  )
}
export default Reservation;
