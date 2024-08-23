//npm install @reduxjs/toolkit react-redux //설치 먼저 진행
import { configureStore, createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
    name:'movieDetail',
    initialState:[],
    reducers:{
        addToMovies:(state, action)=>{
            state.push(action.payload);
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