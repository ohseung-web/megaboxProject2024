//npm install @reduxjs/toolkit react-redux //설치 먼저 진행
import { configureStore, createSlice } from '@reduxjs/toolkit';

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
const store = configureStore({
    reducer: {
        // 여기에 리듀서를 추가할 수 있습니다.
        cart:moviesSlice.reducer,
    },
}); 

export default store;