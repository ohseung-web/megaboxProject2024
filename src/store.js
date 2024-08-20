import { configureStore, createSlice } from '@reduxjs/toolkit'
// redux를 사용하려면 반드시 아래처럼 설치 후 환경설정을 한다.
// npm install #reduxjs/toolkit react-redux
// index.js 아래처럼 환경 설정한다.
  // import store from './store';
  // <Provider store={store}></Provider>

let movie = createSlice({
    name : 'movie',
    initialState : []
})  

let url = createSlice({
  name : 'url',
  initialState : 'https://api.themoviedb.org/3/discover/movie?certification_country=south%20korea&include_adult=false&include_video=false&language=ko-kr&page=1&primary_release_year=2024&primary_release_date.gte=2024-8-5&primary_release_date.lte=2024-8-11&sort_by=popularity.desc'
})

let options = createSlice({
  name : 'options',
  initialState : {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2M3NGNhNDY3YzFjMmNjMTk4NmZlOGM2ZWYzODEwYSIsIm5iZiI6MTcyMzYzMzA0Ni41NjExOSwic3ViIjoiNjZiNWJiMDE3NThkNDE5NDBjMDcxMmY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ZIqt5EHhpmYObEOJHuPm4TNXlnH9b2aQKbJLpDaPWng',
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

export default configureStore({
  reducer: { 
    movie : movie.reducer,
    url : url.reducer,
    options : options.reducer,
    dayCate : dayCate.reducer
  } 
}) 