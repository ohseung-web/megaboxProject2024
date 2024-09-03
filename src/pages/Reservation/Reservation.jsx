import React, { useState, useEffect } from 'react';
import './Reservation.style.css';
import './../../common/Common.css';
import reset from './images/ico-reset-small.png';
import impossible from './images/bg-seat-condition-impossible.png';
import choice from './images/bg-seat-condition-choice.png';
import ReserationInfo from './ReserationInfo';
import { current } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { plusCount, minusCount, reSet, totalprice } from '../../store1.js';
import { useRef } from 'react';

const Reservation = () => {
  //예매좌석 100좌석 2차원 배열로 지정
  //const seatArray = Array.from(Array(10), () => new Array(10));
  // 좌석 배열을 1부터 100까지 숫자로 채움 고로, 값이 배열에 저장됨
  const seatArray = Array.from(Array(10), (row, rowIndex) =>
    Array.from(Array(10), (col, colIndex) => rowIndex * 10 + colIndex + 1)
  );
  const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; //좌석 열 알파벳

  // 예매인원 구분 countList를 redux를 사용하기 위해 작성한 store.js에 존재하는 변수 가져옴
  let state = useSelector((state) => state); //redux에서 state는 자료를 읽어오기만 할 수 있다.
  let dispatch = useDispatch(); //redux에서 state를 변경할 때 함수를 내보내 준다.

  //좌석 예매시작
  //totalcount = 1이면 짝수번째 자리는 선택불가 되도록 지정한다.
  let seatTableTotalcount = useRef(0);
  const [isClicked, setisClicked] = useState(false);
  const [selectSeat, setSelectSeat] = useState([]);

  //연습
  // 전체 예매 인원수 계산하는 함수
  const seatTableCheckHandler = () => {
    let totalcount = 0;
    state.countList.map((e, i) => {
      totalcount = totalcount + state.countList[i].count;
    });
    seatTableTotalcount.current = totalcount;
  };

  //some 메서드는 배열의 각 요소를 순회하면서 제공된 조건 함수가 하나라도 true를 반환하면 true를 반환합니다.
  const seatTableClick = () => {
    if (seatTableTotalcount.current === 0) {
      alert('예매인원을 선택하세요');
    } else if (seatTableTotalcount.current === 1) {
      // 짝수열만 체크해서 배경색을 보라색으로 변경
      seatArray.some((row) =>
        row.some((_, colIndex) => setisClicked(getSeatStyle(colIndex)))
      );
      //   // 선택한 좌석 담아 주기
    } else if (seatTableTotalcount.current === 2) {
      // 모든 좌석 데이터를 상태로 설정
      const newSeatSelects = [];
      seatArray.forEach((row) => {
        row.forEach(({ rowIndex, colIndex }) => {
          newSeatSelects.push({ rowIndex, colIndex });
        });
      });
      setSelectSeat(newSeatSelects);
      console.log(
        'Selected seats:',
        selectSeat.map((seat, i) => seat[i])
      );
    } 
  };

  console.log('현재인원수 : ' + seatTableTotalcount.current);
  // const [seatArray] = useState(
  //   Array.from({ length: 10 }, (_, rowIndex) =>
  //     Array.from({ length: 10 }, (_, colIndex) => ({ rowIndex, colIndex }))
  //   )
  // );
   console.log(seatArray)
  // 좌석 클릭 핸들러
  const handleSeatClick = (rowIndex, colIndex) => {
    setSelectSeat({ rowIndex, colIndex });
  };
  console.log("선택한 좌석")
  console.log(selectSeat)
  // 예매인원이 1인경우 짝수열만 backgroundImage 변경하는 함수
  const getSeatStyle = (colIndex) => {
    if (seatTableTotalcount.current === 1 && colIndex % 2 !== 0) {
      return { backgroundImage: `url(${impossible})` };
    }
    return { backgroundColor: 'gray' };
    //return colIndex % 2 !== 0 ? { backgroundImage: `url(${impossible})` } : {};
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
                <div className="seat">
                  <table
                    className="seattable"
                    onChange={seatTableCheckHandler()}
                  >
                    <tbody>
                      {seatArray.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td className="alpha">{alpha[rowIndex]}</td>
                          {seatArray[0].map((col, colIndex) => (
                            <td
                              key={`${rowIndex}-${colIndex}`}
                              className='seatTd'
                              value={`${rowIndex},${colIndex}`}
                              onClick={() => handleSeatClick({rowIndex,colIndex})}
                              style={
                                isClicked
                                  ? getSeatStyle(colIndex)
                                  : { backgroundColor: 'gray' }
                              }
                            >
                              {rowIndex+","+colIndex}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
