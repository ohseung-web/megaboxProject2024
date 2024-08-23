// useQuery : 서버에서 데이터를 가져오고 상태관리하는데 사용
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const fetchSingleMovies=()=>{
    return api.get(`/movie/top_rated`)
}

export const useSingleMoviesQuery = ()=>{
    return useQuery({
        queryKey : ['movie-single'],
        queryFn : fetchSingleMovies,
        select : (result) => result.data.results
    })
}