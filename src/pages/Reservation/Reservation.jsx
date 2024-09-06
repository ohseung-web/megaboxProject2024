import React, { useState, useEffect } from 'react';
import './Reservation.style.css';
import './../../common/Common.css';
import reset from './images/ico-reset-small.png';
import impossible from './images/bg-seat-condition-impossible.png';
import choice from './images/bg-seat-condition-choice.png';
import ReserationInfo from './ReserationInfo';
import { current } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { plusCount, minusCount, reSet } from '../../Store.js';
import { useRef } from 'react';

const Reservation = () => {
  //예매좌석 100좌석 2차원 배열로 지정
  //const seatArray = Array.from(Array(10), () => new Array(10));
  // 좌석 배열을 1부터 100까지 숫자로 채움 고로, 값이 배열에 저장됨
  const seatArray = Array.from(Array(10), (row, rowIndex) =>
    Array.from(Array(10), (col, colIndex) => rowIndex * 10 + colIndex + 1)
  );
  // const [seatArray] = useState(
  //   Array.from({ length: 10 }, (_, rowIndex) =>
  //     Array.from({ length: 10 }, (_, colIndex) => ({ rowIndex, colIndex }))
  //   )
  // );
  const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; //좌석 열 알파벳

  // 예매인원 구분 countList를 redux를 사용하기 위해 작성한 store.js에 존재하는 변수 가져옴
  let state = useSelector((state) => state); //redux에서 state는 자료를 읽어오기만 할 수 있다.
  let dispatch = useDispatch(); //redux에서 state를 변경할 때 함수를 내보내 준다.

  //좌석 예매시작
  // seatTableTotalcount 전체 예매인원수를 담는 변수
  let seatTableTotalcount = useRef(0);
  // 마우스 오버저장하는 변수
  const [hoverSeat, setHoverSeat] = useState(null);
  // 선택한 좌석 행번호, 열번호 저장하는 변수
  const [selectSeat, setSelectSeat] = useState([]);
  // 예매인원 총금액 변수
  const [totalPrice, setTotalPrice] = useState(0);
  // 예매인원 구분(성인, 청소년, 어린이, 경로, 우대)변수
  const [choicePeople, setChoicePeople] = useState('');

  // 전체 예매 인원수 계산하는 함수
  const seatTableCheckHandler = () => {
    let totalcount = 0;
    state.countList.map((e, i) => {
      totalcount = totalcount + state.countList[i].count;
    });
    seatTableTotalcount.current = totalcount;
  };

  // 클릭한 좌석의 행번호, 열번호를 selectSeat의 배열에 저장하는 함수
  // some 메서드는 배열의 각 요소를 순회하면서 제공된 조건 함수가 하나라도 true를 반환하면 true를 반환합니다.
  // 전체예매 인원수가 선택한 좌석의 인원수보다 크면 더이상 선택할 수 없도록 alert창 띄운다.
  const handleSeatClick = (rowIndex, colIndex) => {
    if (seatTableTotalcount.current === 0) {
      alert('예매인원을 선택하세요');
    } else if (seatTableTotalcount.current > selectSeat.length) {
      setSelectSeat((prev) => {
        const isSeatSelected = selectSeat.some(
          (seat) => seat.rowIndex === rowIndex && seat.colIndex === colIndex
        );
        if (isSeatSelected) {
          //좌석이 이미 선택된경우, 좌석취소
          return prev.filter(
            (seat) =>
              !(seat.rowIndex === rowIndex && seat.colIndex === colIndex)
          );
        } else {
          //좌석이 선택되지 않은경우, 선택
          return [...prev, { rowIndex, colIndex }];
        }
      });
    } else if (seatTableTotalcount.current === selectSeat.length) {
      alert('이미 좌석을 모두 선택하였습니다.');
    }
   // choiceCountHandler();
   // totalPriceHandler();
   // choicePeopleHandler();
  };

  let seatCount = selectSeat.length; // 선택한 좌석수
  let adultCount = state.countList[0].count; // 선택한 성인 인원수
  let teenagerCount = state.countList[1].count; //선택한 청소년 인원수
  let childernCount = state.countList[2].count; //선택한 어린이 인원수
  let seniorCount = state.countList[3].count; // 선택한 경로 인원수
  let spacialCount = state.countList[4].count; // 선택한 우대 인원수

  // 예매좌석을 선택할때 마다 useEffect()가 실행된다.
  useEffect(()=>{
    // 예매인원 선택우선 순위 좌석 클릭 할때마다 인원수 증가하는 함수
    const choiceCountHandler = () => {
      let adult = 0, teenager = 0, childern = 0, senior = 0, spacial = 0;

      for (let i = 0; i < seatCount; i++) {
        if (i < adultCount) adult++;
        else if (i < adultCount + teenagerCount) teenager++;
        else if (i < adultCount + teenagerCount + childernCount) childern++;
        else if (i < adultCount + teenagerCount + childernCount + seniorCount) senior++;
        else spacial++;
      }

      return { adult, teenager, childern, senior, spacial };
    };
  
    const { adult, teenager, childern, senior, spacial } = choiceCountHandler();

    // 영화 예매 총금액 구하는 함수
    const totalPriceHandler = () => {
      let total = 0;
      total =
        adult * state.countList[0].price +
        teenager * state.countList[1].price +
        childern * state.countList[2].price +
        senior * state.countList[3].price +
        spacial * state.countList[4].price;
      setTotalPrice(total);
    };
  
    // 예매 좌석을 클릭 할때마다 영화정보창에 관림인원 구분이 출력되는 함수
    const choicePeopleHandler = () => {
      let people = '';
        if (adult > 0) people += `${state.countList[0].listname} ${adult} `;
        if (teenager > 0) people += `${state.countList[1].listname} ${teenager} `;
        if (childern > 0) people += `${state.countList[2].listname} ${childern} `;
        if (senior > 0) people += `${state.countList[3].listname} ${senior} `;
        if (spacial > 0) people += `${state.countList[4].listname} ${spacial} `;
      setChoicePeople(people);
    }; 
    
    totalPriceHandler();
    choicePeopleHandler();

  },[selectSeat])
  

  // 초기화버튼 클릭하면 선택좌석 selectSeat의 배열초기화, 총예매인원수=0, 총금액=0, 선택한인원구분=''
  const seatReset = () => {
    setSelectSeat([]);
    setTotalPrice(0);
    setChoicePeople('');
  };
  //마우스 오버될때 배경이미지 변경하는 함수
  const hoverSeatEnter = (rowIndex, colIndex) => {
    setHoverSeat({ rowIndex, colIndex });
  };
  //마우스 오버삭제될 때 배경이미지 변경하는 함수
  const hoverSeatRemove = () => {
    setHoverSeat(null);
  };
  // 좌석 배경이미지 변경하는 함수
  const getSeatStyle = (rowIndex, colIndex, isSeatSelected, onClick) => {
    // 예매인원이 1인경우 짝수열만 backgroundImage 변경하는 부분
    if (seatTableTotalcount.current === 1 && colIndex % 2 !== 0) {
      return {
        backgroundImage: `url(${impossible})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      };
    } else if (seatTableTotalcount.current === 0) {
      //예매인원이 0인 경우 마우스오버해도 배경이미지가 변경되지 않는 부분
      return hoverSeat ? {} : {};
    }
    // 마우스를 오버하면 배경이미지 변경하고, 선택한 좌석의 배경이미지를 변경하는 부분
    return hoverSeat &&
      hoverSeat.rowIndex === rowIndex &&
      hoverSeat.colIndex === colIndex
      ? {
          backgroundImage: `url(${choice})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }
      : selectSeat.some(
          (seat) => seat.rowIndex === rowIndex && seat.colIndex === colIndex
        )
      ? {
          backgroundImage: `url(${choice})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }
      : {};
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
                  seatReset();
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
                              className="seatTd"
                              onMouseEnter={() =>
                                hoverSeatEnter(rowIndex, colIndex)
                              }
                              onMouseLeave={hoverSeatRemove}
                              onClick={() =>
                                handleSeatClick(rowIndex, colIndex)
                              }
                              style={getSeatStyle(rowIndex, colIndex)}
                            >
                              {colIndex + 1}
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
            <ReserationInfo
              seatTableTotalcount={seatTableTotalcount.current}
              selectSeat={selectSeat.length}
              totalPrice={totalPrice}
              choicePeople={choicePeople}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reservation;
