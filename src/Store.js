//npm install @reduxjs/toolkit react-redux //설치 먼저 진행
import { configureStore, createSlice } from '@reduxjs/toolkit';
// redux를 사용하려면 반드시 아래처럼 설치 후 환경설정을 한다.
// npm install @reduxjs/toolkit react-redux
// index.js 아래처럼 환경 설정한다.
// import store from './store';
// <Provider store={store}></Provider>

const API_KEY = process.env.REACT_APP_API_KEY;

//===================기존 yuna branch log
const moviesSlice = createSlice({
    name:'movieDetail',
    initialState:{},//클릭한 영화 정보 단일 객체 인식
    reducers:{
        addToMovies:(state, action)=>{
            return { ...action.payload };//이전 데이터 지우고 새로운 데이터 할당(모든 키-값 복사)
        }
    }
})
export const { addToMovies } = moviesSlice.actions;

/* 
const store = configureStore({
    reducer: {
        // 여기에 리듀서를 추가할 수 있습니다.
        cart:moviesSlice.reducer,
    },
});  
*/
//===================승현쌤 코드 추가 240903
let movie = createSlice({
    name: 'movie',
    initialState: [],
});
let url = createSlice({
    name: 'url',
    initialState:
        'https://api.themoviedb.org/3/discover/movie?certification_country=south%20korea&include_adult=false&include_video=false&language=ko-kr&page=1&primary_release_year=2024&primary_release_date.gte=2024-8-05&primary_release_date.lte=2024-8-11&sort_by=popularity.desc',
});
let options = createSlice({
    name: 'options',
    initialState: {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
        },
    },
});
let dayCate = createSlice({
    name: 'dayCate',
    initialState: [
        { id: 0, date: '2024-08-05' },
        { id: 1, date: '2024-08-06' },
        { id: 2, date: '2024-08-07' },
        { id: 3, date: '2024-08-08' },
        { id: 4, date: '2024-08-09' },
        { id: 5, date: '2024-08-10' },
        { id: 6, date: '2024-08-11' },
    ],
});
let countList = createSlice({
    name: 'countList',
    initialState: { 
      items : [
            {
            id: 0,
            listname: '성인',
            count: 0,
            price: 14000,
            },
            {
            id: 1,
            listname: '청소년',
            count: 0,
            price: 11000,
            },
            {
            id: 2,
            listname: '어린이',
            count: 0,
            price: 7000,
            },
            {
            id: 3,
            listname: '경로',
            count: 0,
            price: 7000,
            },
            {
            id: 4,
            listname: '우대',
            count: 0,
            price: 5000,
            },
       ],
      msg: 0
   },
    // redux에서 state를 변경하는 방법
    // state를 변경하고 싶은 함수를 작성하여 사용한다.
    // action.payload는 countList의 index값 0, 1, 2,3,4가 출력된다.
    reducers: {
        //plus버튼 클릭시 인원수 증가함수
        plusCount(state, action) {
        let index = state.items.findIndex((a) => {
            return a.id === action.payload;
        });
        let totalCount = 0;
        for (let i = 0; i < state.items.length; i++) {
            totalCount += state.items[i].count;
        }

        if (totalCount < 8) {
            state.items[index].count++;
            //state.msg = 0;
        } else {
            state.msg = 4;
            //alert('예매인원은 최대 8명까지 가능합니다.');
        }
        //console.log("모달 메시지 번호 :" + state.msg);
        // console.log("action.payload :" + action.payload);
        // console.log("a.id "+ index)
        // console.log("state "+ state[index].listname)
        // console.log("count "+ state[index].count)
        // console.log("totalCount "+ totalCount)
        },
        // minus 버튼 클릭시 인원수 감소함수
        minusCount(state, action) {
        let index = state.items.findIndex((a) => {
            return a.id === action.payload;
        });
        let totalCount = 0;
        for (let i = 0; i < state.items.length; i++) {
            totalCount += state.items[i].count;
        }

        if (totalCount > 0 && state.items[index].count > 0) {
            state.items[index].count--;
            //state.msg = 0;
        } else {
            state.msg =5;
           // alert('최소 예매인원은 1명 입니다.');
        }
        },
        //초기화 함수
        reSet(state) {
        for (let i = 0; i < state.items.length; i++) {
            state.items[i].count = 0;
        }
            state.msg = 0;
        },
    },
});
// 작성한 함수는 반드시 export 하여 사용한다.
export let { plusCount, minusCount, reSet} = countList.actions;

// 위에서 생성한 변수들을 redux에 등록한다.
//==============seung + yuna 공통 default configureStroe
export default configureStore({
    reducer: {
        movie: movie.reducer,
        url: url.reducer,
        options: options.reducer,
        dayCate: dayCate.reducer,
        countList: countList.reducer,
        cart:moviesSlice.reducer, //yuna movies
    },
});



//======================
// export default store;