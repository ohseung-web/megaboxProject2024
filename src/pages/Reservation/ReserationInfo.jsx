import React from 'react';
import { useState,useEffect } from 'react';
import './Reservation.style.css';
import './../../common/Common.css';
import choice from './images/bg-seat-condition-choice-s.png';
import finish from './images/bg-seat-condition-finish-s.png';
import impossible from './images/bg-seat-condition-impossible-s.png';
import common from './images/bg-seat-condition-common-s.png';
import poster from './images/hero.jpg';
import age from './images/age12.png';

const ReserationInfo = () =>{

  //좌석 선택
  const seatChoice = [
    {id:0,chooseseat : '-'},
    {id:1,chooseseat : '-'},
    {id:2,chooseseat : '-'},
    {id:3,chooseseat : '-'},
    {id:4,chooseseat : '-'},
    {id:5,chooseseat : '-'},
    {id:6,chooseseat : '-'},
    {id:7,chooseseat : '-'},
    ];

  return (
    <>
         <div className="movieTitle">
            <img src={age} alt="" />
            <span>영웅<em>2D</em></span>
          </div>
          <div className="movieDesc">
              <div className="theaterDesc">
                <p>강남대로(씨티)<br />1관</p>
                <br />
                <p>2024.08.19(월)</p>
                <div className="time">
                    <button type="button" className="now">
                      20:50~23:04<i className="fa-solid fa-angle-up"></i>
                    </button>
                    <ul className="other">
                      <li className="otherTime">
                        <a href="#">20:50~23:04</a>
                      </li>
                    </ul>
                </div>
              </div>
              <div className="poster">
                <img src={poster} alt="" />
            </div>
          </div>
          <div className="movieDetail">
            <div className="detail_left">
             <ul>
                  <li>
                    <img src={choice} alt="" />
                    <span>선택</span>
                  </li>
                  <li>
                    <img src={finish} alt="" />
                    <span>예매완료</span>
                  </li>
                  <li>
                    <img src={impossible} alt="" />
                    <span>선택불가</span>
                  </li>
                  <li>
                    <img src={common} alt="" />
                    <span>일반</span>
                  </li>
              </ul>
            </div>
            <div className="detail_right">
              <p>선택좌석</p>
              <div className="seatchoice">
                {seatChoice.map((choice,i)=>{
                  return(
                    <div key={choice.id} className="choice">{choice.chooseseat}</div>
                  )
                })}
              </div>
            </div>
          </div>
          <div class="reserveStatus">
            <div class="choicecount">
              <span>성인</span>
              <em>1</em>
            </div>
          </div>
          <div className="moviePrice">
              <div className="pricetitle">최종결제금액</div>
              <div className="price">
                <span>10,000</span>
                <em>원</em>
              </div>
          </div>
          <div className="movieButton">
              <button className="beforebtn">이전</button>
              <button className="nextbtn">다음</button>
          </div>
    </>
  )

}

export default ReserationInfo;