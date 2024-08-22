import { configureStore, createSlice } from '@reduxjs/toolkit'
// redux를 사용하려면 반드시 아래처럼 설치 후 환경설정을 한다.
// npm install @reduxjs/toolkit react-redux
// index.js 아래처럼 환경 설정한다.
  // import store from './store';
  // <Provider store={store}></Provider>

const API_KEY = process.env.REACT_APP_API_KEY;  

let movie = createSlice({
    name : 'movie',
    initialState : []
})  

let url = createSlice({
  name : 'url',
  initialState : 'https://api.themoviedb.org/3/discover/movie?certification_country=south%20korea&include_adult=false&include_video=false&language=ko-kr&page=1&primary_release_year=2024&primary_release_date.gte=2024-8-05&primary_release_date.lte=2024-8-11&sort_by=popularity.desc'
})

let options = createSlice({
  name : 'options',
  initialState : {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      `Bearer ${API_KEY}`,
  }},
})

let dayCate = createSlice({
  name : 'dayCate',
  initialState : [
    { id: 0, date: '2024-08-05' },
    { id: 1, date: '2024-08-06' },
    { id: 2, date: '2024-08-07' },
    { id: 3, date: '2024-08-08' },
    { id: 4, date: '2024-08-09' },
    { id: 5, date: '2024-08-10' },
    { id: 6, date: '2024-08-11' },
  ]
})

let countList = createSlice({
  name : 'countList',
  initialState : [
    {id:'audalt',listname:'성인',minus:'-',count:0,plus:'+',price:14000},
    {id:'teenager',listname:'청소년',minus:'-',count:0,plus:'+',price:11000},
    {id:'child',listname:'어린이',minus:'-',count:0,plus:'+',price:7000},
    {id:'oldman',listname:'경로',minus:'-',count:0,plus:'+',price:7000},
    {id:'disabled',listname:'우대',minus:'-',count:0,plus:'+',price:5000},
  ]
})

// 위에서 생성한 변수들을 redux에 등록한다.
export default configureStore({
  reducer: { 
    movie : movie.reducer,
    url : url.reducer,
    options : options.reducer,
    dayCate : dayCate.reducer,
    countList : countList.reducer
  } 
}) 