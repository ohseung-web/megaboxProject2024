import React, { useState, useEffect } from 'react';
import './Reservation.style.css';
import './../../common/Common.css';
import reset from './images/ico-reset-small.png';
import impossible from './images/bg-seat-condition-impossible.png';
import choice from './images/bg-seat-condition-choice.png';
import common from './images/bg-seat-condition-common.png';
import ReserationInfo from './ReserationInfo';
import { current } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { plusCount, minusCount, reSet } from '../../Store.js';
import { useRef } from 'react';
import ReservationModal from './ReservationModal.jsx';
// 모달창 만들기 위해 아래 react-modal 라이브러리를 설치한다.
// npm install react-modal
// npm install react-modal @types/react-modal
// modal을 import 한다.
import Modal from 'react-modal';

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

  //좌석 예매시작 =====================================================================================
  // seatTableTotalcount 전체 예매인원수를 담는 변수
  let seatTableTotalcount = useRef(0);
  // 마우스 오버시 저장하는 변수
  const [hoverSeat, setHoverSeat] = useState(null);
  // 선택한 좌석 행번호, 열번호 {rowIndex, colIndex}처럼 [{rowIndex:0,colIndex:1}...]선택한 좌석의 위치를 저장하는 변수
  const [selectSeat, setSelectSeat] = useState([]);
  // 예매인원 총금액 변수
  const [totalPrice, setTotalPrice] = useState(0);
  // 예매인원 구분(성인, 청소년, 어린이, 경로, 우대)변수
  const [choicePeople, setChoicePeople] = useState('');
  // 선택한 좌석의 행번호,열번호가 예매정보창의 선택좌석에 A1,B3처럼 출력되도록 A1, B2..저장하는 변수
  const [choiceSeatNumber, setChoiceSeatNumber] = useState([]);
  // Modal 라이브러리 open유무 확인하는 변수
  const [modalOpen, setmodalOpen] = useState(false);
  // ReservationModal창의 messg내용을 저장하는 변수 예) 1,2,3,4,5,6... 번호마다 메시지 내용이 다름
  const [msg,setMsg] = useState(0);
  // 선택한 예매인원의 최초 인원수를 저장하는 변수
  const [selectGroupCount, setSelectGroupCount] = useState([])

  // 전체 예매 인원수 계산하는 함수
  const seatTableCheckHandler = () => {
    let totalcount = 0;
    state.countList.items.map((e, i) => {
      totalcount = totalcount + state.countList.items[i].count;
    });
    seatTableTotalcount.current = totalcount;
  };

  // 다른페이지에서 Rewervation페이지로 이동하면 무조건 초기화 진행되는 useEffect()
  useEffect((()=>{
      seatReset();
  }),[])

   // 초기화버튼 클릭하면 선택좌석 selectSeat의 배열초기화, 총예매인원수=0, 총금액=0, 선택한인원구분='' 선택한 전체 예매인원수 초기화 하는 함수
   const seatReset = () => {
    dispatch(reSet());
    setSelectSeat([]);
    setTotalPrice(0);
    setChoicePeople('');
    setSelectGroupCount([]);
  };

  //Modal 라이브러리 스타일 함수
  const customStyles = {
    overlay: {
      top : '91px',
      height: '800px',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    content: {
      left: '0',
      margin: 'auto',
      width: '400px',
      height: '150px',
      padding: '0',
      overflow: 'hidden',
      border: 'none'
      // border: '3px solid #111',
    },
  };
   //모달창이 화면에 출력될 때 body의 스크롤바를 감추는 useEffect()
    useEffect((()=>{
      if(modalOpen){
         document.body.style.overflow = 'hidden'
      }else{
         document.body.style.overflow ='auto'
      }
      return () =>{
          document.body.style.overflow ='auto'
      }
   }),[modalOpen])

  let seatCount = selectSeat.length; // 선택한 좌석수
  let adultCount = state.countList.items[0].count; // 선택한 성인 인원수
  let teenagerCount = state.countList.items[1].count; //선택한 청소년 인원수
  let childernCount = state.countList.items[2].count; //선택한 어린이 인원수
  let seniorCount = state.countList.items[3].count; // 선택한 경로 인원수
  let spacialCount = state.countList.items[4].count; // 선택한 우대 인원수
  let totalSelectCount = 0; // adultCount+teenagerCount+childernCount+seniorCount+spacialCount

  // 클릭한 좌석의 행번호, 열번호를 selectSeat의 배열에 저장하는 함수
  // 조건에 만족할 때 Modal창이 뜨도록 작성한 함수
  // some 메서드는 배열의 각 요소를 순회하면서 제공된 조건 함수가 하나라도 true를 반환하면 true를 반환한다.
  const handleSeatClick = (rowIndex, colIndex) => {
    // 예매인원을 선택하지 않은 경우
    if (seatTableTotalcount.current === 0) {
        setmodalOpen(true);
        setMsg(1);
      //alert('예매인원을 선택하세요');
      return ;
    }
    // 예매인원이 1명이면서 짝수쪽 열의 좌석일 경우 선택불가능
    if (seatTableTotalcount.current === 1 && colIndex % 2 !== 0) {
        // 예매인원이 1명일 때 1명의 좌석을 선택하고 난 후 짝수쪽 열의 좌석을 선택할 경우
        if(choiceSeatNumber.length !== 0){
            setmodalOpen(true)
            setMsg(3)
            // alert('좌석 선택이 완료 되었습니다.');
            return;
        }else{ // 예매인원이 1명일때 좌석을 선택하지 않고 짝수쪽 열의 좌석을 선택할 경우
            setmodalOpen(true);
            setMsg(2);
            // alert('선택할 수 없는 좌석입니다.');
            return ;
        }
    }
   // confirm에서 취소버튼을 클릭한 상태에서 다른 좌석을 선택할 때 modal출력 됨
   if(totalSelectCount < selectGroupCount.length){
      setmodalOpen(true)
      setMsg(3)
      return ;
   } 
    // 좌석 선택이 가능 하면 선택한 좌석을 selectSeat 배열 변수에 저장하는 부분
    setSelectSeat((prev) => {
      //좌석이 선택되지 않으면  무조건 false 출력, 좌석이 선택이 되고 난후 true 출력
      const isSeatSelected = selectSeat.some(
        (seat) => seat.rowIndex === rowIndex && seat.colIndex === colIndex
      );
      if (isSeatSelected) {
        //좌석이 이미 선택된경우, 좌석취소
        return prev.filter(
          (seat) => !(seat.rowIndex === rowIndex && seat.colIndex === colIndex)
        );
      } else {
        //좌석이 선택되지 않은경우, 좌석추가
        if (seatTableTotalcount.current > prev.length ) {
          return [...prev, { rowIndex, colIndex }];
        } else {
          // 선택한 좌석의 수가 전체인원수 보다 크면 좌석추가 하지 않음
          setmodalOpen(true);
          setMsg(3)
         // alert('좌석 선택이 완료 되었습니다.');
          return prev;
        } 
      } 
    });
  };

 // 좌석을 선택할때 일어나는 함수들 모음 ============================================================================
    // 선택한 좌석의 selectSeat (행번호, 열번호) 콘솔출력
    console.log(
      '선택한 좌석 번호 : ' +
        selectSeat
          .map((seat) => `row:${seat.rowIndex} col:${seat.colIndex}`)
          .join(',')
    );

    //선택한 좌석의 행번호,열번호가 예매정보창의 선택좌석에 A1,B3처럼 출력되도록 하는 함수
    const choiceSeatDisply = () => {
      let choiceSeatNumber = selectSeat.map((seat, i) => {
        return `${alpha[seat.rowIndex]}${seat.colIndex + 1}`;
      });
      setChoiceSeatNumber(choiceSeatNumber);
    };
   
    // 예매인원 선택우선 순위 좌석 클릭 할때마다 예매정보창에 예매인원수 증가하는 함수
    const choiceCountHandler = () => {
      let  adult = 0,teenager = 0,childern = 0,senior = 0,spacial = 0

      for (let i = 0; i < seatCount; i++) {
        if (i < adultCount) adult++;
        else if (i < adultCount + teenagerCount) teenager++;
        else if (i < adultCount + teenagerCount + childernCount) childern++;
        else if (i < adultCount + teenagerCount + childernCount + seniorCount)
         senior++;
        else spacial++;
      }

      return { adult, teenager, childern, senior, spacial };
    };

    const { adult, teenager, childern, senior, spacial } = choiceCountHandler();

    // 영화 예매 총금액 구하는 함수
    const totalPriceHandler = () => {
      let total = 0;
      total =
        adult * state.countList.items[0].price +
        teenager * state.countList.items[1].price +
        childern * state.countList.items[2].price +
        senior * state.countList.items[3].price +
        spacial * state.countList.items[4].price;
      setTotalPrice(total);
    };

    // 예매 좌석을 클릭 할때마다 영화정보창에 관림인원분류 성인1, 어린이2 형태로 출력되는 함수
    const choicePeopleHandler = () => {
      let people = '';
      if (adult > 0) people += `${state.countList.items[0].listname} ${adult} `;
      if (teenager > 0) people += `${state.countList.items[1].listname} ${teenager} `;
      if (childern > 0) people += `${state.countList.items[2].listname} ${childern} `;
      if (senior > 0) people += `${state.countList.items[3].listname} ${senior} `;
      if (spacial > 0) people += `${state.countList.items[4].listname} ${spacial} `;
      setChoicePeople(people);
    };
    //==========================================================================================
     // 예매좌석을 선택할때 마다 아래 함수들을 실행하는 useEffect()
    useEffect(() => {
        totalPriceHandler();
        choicePeopleHandler();
        choiceSeatDisply();
    }, [selectSeat]);

  // redux의 msg를 불러와 modal창에 출력하는 함수
  const msgHandler =() =>{
      if(state.countList.msg === 0){
          setmodalOpen(false);
          return;
      }
      if(state.countList.msg === 4){
          setmodalOpen(true)
          setMsg(4)
          return;
      }else{
          setmodalOpen(true)
          setMsg(5)
          return;
      }
  }
  //redux의 msg 값이 변경될 때마다 useEffect()가 실행된다.
  useEffect((()=>{
      if(state.countList.msg != undefined){
          msgHandler();
      }
  }),[state.countList.msg])

  //---------------------------------------------------------------------------------------
  // 전체예매인원과 선택한 좌석의 갯수가 같을 때 예매인원을 변경 시 window.confirm창 띄우는 함수
  // const totalCountOver = () => {
  //   if (seatTableTotalcount.current === seatCount &&
  //        seatTableTotalcount.current !== 0) {
  //       // confirm 대화상자
  //       const userConfirm = window.confirm('선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까? ');  
  //       if (userConfirm) {
  //           //confirm의 확인버튼 클릭시 리셋 시킴
  //           seatReset();
  //       }else{
  //          //confirm에서 취소 버튼 클릭시 이전에 선택한 예매인원을 selectGroupCount에 저장한다.
  //          //이전 상태로 복원이 안되는 이유는 selectSeatCount를 UI로 연결하지 않았기때문이다.
  //           setSelectGroupCount((prev)=>
  //             [...prev,  adultCount, teenagerCount, childernCount, seniorCount, spacialCount ])
  //           // selectGroupCount 총계
  //           selectGroupCount.map((selectCount, i)=>{
  //           totalSelectCount += selectCount[i]
  //           })
  //       }
  //    }
    
  // }; 
  console.log(
    'confirm 취소 버튼 클릭 시 : ' +
    selectGroupCount
        .map((select) => select),
  );
  console.log("selectGroupCount : " + selectGroupCount.length)
 //---------------------------------------------------------------------------------------
  //minus, plus 버튼클릭 시 redux에서 호출 되는 함수
  const handleButtonClick = (action,id) =>{
        dispatch(action(id));
  }
  // 전체예매인원과 선택한 좌석의 갯수가 같을 때 예매인원을 plus버튼을 클릭하여 수정할 때는 예매인원이 증가되도록 하고, minus버튼을 클릭하여 수정할 때는 confirm창이 뜨고, confirm창의 확인버튼 클릭시 reset되도록 하고, 취소번튼 클릭시는 예매인원이 변경되지 않도록 하는 함수
  const handleMinusClick  = (id,currentCount) =>{
      if(seatTableTotalcount.current === seatCount && seatTableTotalcount.current !== 0){
         // confirm 대화상자
          const userConfirm = window.confirm('선택하신 좌석을 모두 취소하고 다시 선택하시겠습니까? ');
         if(userConfirm){ 
            handleButtonClick(minusCount,id)
            //------- 
            if (userConfirm) {
              //confirm의 확인버튼 클릭시 리셋 시킴
              seatReset();
            }else{
              //confirm에서 취소 버튼 클릭시 이전에 선택한 예매인원을 selectGroupCount에 저장한다.
                setSelectGroupCount((prev)=>
                  [...prev,  adultCount, teenagerCount, childernCount, seniorCount, spacialCount ])
                // selectGroupCount 총계구하는 부분
                  selectGroupCount.map((selectCount, i)=>{
                  totalSelectCount += selectCount[i]
                })
            }
            //----------------------
           } 
      }else{
         handleButtonClick(minusCount,id)
      } 
  }

  //마우스 오버될때 배경이미지 변경하는 함수
  const hoverSeatEnter = (rowIndex, colIndex) => {
    setHoverSeat({ rowIndex, colIndex });
  };
  //마우스 오버삭제될 때 배경이미지 초기화 함수
  const hoverSeatRemove = () => {
    setHoverSeat(null);
  };

  // 좌석 배경이미지 변경하는 함수
  const getSeatStyle = (rowIndex, colIndex) => {
    // 총 예매인원이 1인경우 1명을 선택하고 난 후 impossible이미지로 변경되었던 짝수열이 원래의 회색이미지인  common이미지로 변경되는 부분
    if(seatTableTotalcount.current === 1 && choiceSeatNumber.length !== 0 && colIndex % 2 !== 0 ){ 
        return {
          backgroundImage: `url(${common})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }; 
      }
    // 총 예매인원이 1인경우 짝수열만 background를 impossible이미지로 변경하는 부분
    if (seatTableTotalcount.current === 1 && colIndex % 2 !== 0) {
      return {
        backgroundImage: `url(${impossible})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      };
    }else if (seatTableTotalcount.current === 0) {
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

  // 모달 close 함수 ReservateionMoadal 컴포넌트의 매개변수로 보내기 위해 작성한 함수
  const modalClose =() =>{
      setmodalOpen(false);
  }
 
  return (
    <>
      <div className="Resercontainer">
        <Modal
          isOpen={modalOpen}
          ariaHideApp={false} 
          style={customStyles}
          onRequestClose={() => setmodalOpen(false)} // overlay클릭하면 모달종료
        >
            {/* UserModal 컴포넌트를 이곳에 추가하세요 */}
            <ReservationModal modalClose={modalClose} msg={msg}/>
        </Modal>
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
                  seatReset();
                }}
              >
                <img src={reset} alt="" />
                &nbsp;<span>초기화</span>
              </button>
            </div>
            <div className="screen">
              <div className="screen_header">
                {state.countList.items.map((e, i) => {
                  return (
                    <div key={state.countList.items[i].id} className="distinguishCnt">
                      <span>{state.countList.items[i].listname}</span>
                      <button
                        className="minus"
                        onClick={() => handleMinusClick(state.countList.items[i].id,minusCount)}
                      >
                        -
                      </button>
                      <label className="cnt">{
                      selectGroupCount.length === 0 ? state.countList.items[i].count : selectGroupCount[i] 
                      }</label>
                      <button
                        className="plus"
                        onClick={() => handleButtonClick(plusCount,state.countList.items[i].id)}
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
              choiceSeatNumber={choiceSeatNumber}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reservation;