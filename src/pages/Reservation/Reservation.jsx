import React, { useState, useEffect } from 'react';
import './Reservation.style.css';
import reset from './images/ico-reset-small.png';
import ReserationInfo from './ReserationInfo';

const  Reservation = () => {

//예매좌석 100좌석 2차원 배열로 지정
const seatArray = Array.from(Array(10), () => new Array(10));

const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; //좌석 열 알파벳

// screen 좌석 테이블
// React에서 사용하는 innerHtml => <div className="seat" dangerouslySetInnerHTML={{__html:SeatTable()}}>
function SeatTable(){
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

// 예매인원 구분 count
 const countList =[
   {id:'audalt',listname:'성인',minus:'-',count:0,plus:'+'},
   {id:'teenager',listname:'청소년',minus:'-',count:0,plus:'+'},
   {id:'child',listname:'어린이',minus:'-',count:0,plus:'+'},
   {id:'oldman',listname:'경로',minus:'-',count:0,plus:'+'},
   {id:'disabled',listname:'우대',minus:'-',count:0,plus:'+'},
 ]

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
                  {countList.map((cntlist,i)=>{
                    return(
                      <div key={cntlist.id} className="distinguishCnt">
                        <span>{cntlist.listname}</span>
                        <button className="minus">{cntlist.minus}</button>
                        <label className="cnt">{cntlist.count}</label>
                        <button className="plus">{cntlist.plus}</button>
                    </div>
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
export default Reservation;
