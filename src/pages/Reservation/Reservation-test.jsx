import React, { useState, useEffect } from 'react';
import './Reservation.style.css';
import './../../common/Common.css';
import reset from './images/ico-reset-small.png';
import ReserationInfo from './ReserationInfo.jsx';
import { current } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { plusCount, minusCount, reSet, totalprice } from '../../store.js';
import { useRef } from 'react';

const Reservation = () => {
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
  let state = useSelector((state) => state); //redux에서 state는 자료를 읽어오기만 할 수 있다.
  let dispatch = useDispatch(); //redux에서 state를 변경할 때 함수를 내보내 준다.

  //좌석 예매시작
  //totalcount = 1이면 짝수번째 자리는 선택불가 되도록 지정한다.
  let seatTableTotalcount = useRef(0);
  let seatTableRef = useRef(false);
  const [isClicked, setisClicked] = useState(false);

  const seatTableCheckHandler = () => {
    let totalcount = 0;
    state.countList.map((e, i) => {
      totalcount = totalcount + state.countList[i].count;
    });
    seatTableTotalcount.current = totalcount;
  };

  // 조건부 배경 이미지 스타일
  const backgroundStyle = {
    backgroundImage: isClicked
      ? 'url(/images/bg-seat-condition-impossible.png)'
      : 'none',
    backgroundSize: 'cover', // 이미지를 컨테이너에 맞게 조정
    backgroundPosition: 'center', // 이미지 위치 조정
  };

  const seatTableClick = () => {
    if (seatTableTotalcount.current === 0) {
      alert('예매인원을 선택하세요');
    } else if (seatTableTotalcount.current === 1) {
      // Check for even columns
      const hasEvenColumn = seatArray.some((row) =>
        row.some((seat) => seat.number % 2 === 0)
      );
      alert(
        hasEvenColumn
          ? '짝수 열이 있는 좌석이 선택되었습니다.'
          : '짝수 열이 있는 좌석이 없습니다.'
      );
    } else if (seatTableTotalcount.current === 2) {
      // 모든 좌석 데이터를 상태로 설정
      console.log(
        'Selected seats:',
        selectSeat.map((seat) => seat.id).join(', ')
      );
    }
  };
  return (
    <>
      <div className="Resercontainer">
        <h3>빠른예매</h3>
        <div className="line"></div>
        <div className="reserve">
          <div className="reserve_left">
            <div className="reserve_header">
              <span>관람인원선택</span>
              <button
                type="button"
                className="resetbtn"
                onClick={() => {
                  dispatch(reSet());
                }}
              >
                <img src={reset} alt="" />
                &nbsp;<span>초기화</span>
              </button>
            </div>
            <div className="screen">
              <div className="screen_header">
                {state.countList.map((e, i) => {
                  return (
                    //  <CountCard key={reservCountList[i].id} reservCountList={reservCountList[i]} i={i+1} />
                    <div key={state.countList[i].id} className="distinguishCnt">
                      <span>{state.countList[i].listname}</span>
                      <button
                        className="minus"
                        onClick={() => {
                          dispatch(minusCount(state.countList[i].id));
                        }}
                      >
                        -
                      </button>
                      <label className="cnt">{state.countList[i].count}</label>
                      <button
                        className="plus"
                        onClick={() => {
                          dispatch(plusCount(state.countList[i].id));
                        }}
                      >
                        +
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="screen_seat">
                <p className="screentext">SCREEN</p>
                <div
                  className="seat"
                  dangerouslySetInnerHTML={{ __html: SeatTable() }}
                ></div>
              </div>
            </div>
          </div>
          <div className="reserve_right">
            <ReserationInfo />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reservation;
