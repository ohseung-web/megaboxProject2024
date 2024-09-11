import React from 'react';
import './Reservation.style.css';
import './../../common/Common.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useEffect } from 'react';

const UserModal = ({modalClose, msg}) =>{

    // 모달창에 변경되는 메시지를 담는 변수
    const [msgString, setMsgString] = useState(null);
   
    // 모달창 메시지 변경하는 함수
    const msgHandler = () =>{
        if(msg === 1){
            setMsgString( "예매인원을 선택하세요")
        }else if(msg === 2){
            setMsgString( "선택할 수 없는 좌석입니다.")
        }else if(msg===3) {
            setMsgString( "이미 좌석을 모두 선택하였습니다.")
        }else if(msg === 4){
            setMsgString( "예매인원은 최대 8명까지 가능합니다.")
        }else{
            setMsgString( "최소 예매인원은 1명 입니다.")
        }
    }  
   
    // Reservation.jsx에서 msg를 매개변수로 넘겨줄때 마다 실행된다.
    useEffect((()=>{
        msgHandler();
    }),[msg])

   return(
    <>
       <div class="modal">
            <div class="modal_header">
                <h3 class="title">알림</h3>
            </div>
            <div class="modal_content">
                <p>{msgString}</p>
                <div class="btn_group">
                    <button type="button" class="close">취소</button>
                    <button type="button" class="purple confirm" onClick={modalClose} >확인</button>
                </div>
            </div>
            <button type="button" class="btn-close">
                <FontAwesomeIcon icon={faXmark} className='icon' onClick={modalClose} />
            </button>
        </div>
        {/* <div class="overlay"></div> */}
    </>
   )
}

export default UserModal