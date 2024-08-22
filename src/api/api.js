import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

// axios.create() : axios객체를 만들어 여러 곳에서 재사용할 수 있게 해줌
// 공통된 설정을 공유해야 하는 여러 요청이 있을 때 유용함
const api = axios.create({
    baseURL : "https://api.themoviedb.org/3",
    headers : {
        'Accept' : "application/json",
        'Authorization' : `Bearer ${API_KEY}`
    },
    params:{//한국어 설정 추가
        language:'ko-KR',
    },
})

export default api;