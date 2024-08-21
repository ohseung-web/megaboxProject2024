// useQuery : 서버에서 데이터를 가져오고 상태관리하는데 사용
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const fetchPopularMovies=()=>{
    return api.get(`/movie/popular`)
}

export const usePopularMoviesQuery = ()=>{
    return useQuery({
        queryKey : ['movie-popular'],
        queryFn : fetchPopularMovies,
        select : (result) => result.data.results
    })
}

//images
export const getImageUrl = (path, size = 400 ) => {
    return `https://image.tmdb.org/t/p/w${size}${path}`
}

// 리액트 커리가 제공하는 캐싱, 상태 관리, 에러처리의 기능을 부가적으로 할수 있어요.