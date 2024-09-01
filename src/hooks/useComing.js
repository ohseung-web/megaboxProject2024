// useQuery : 서버에서 데이터를 가져오고 상태관리하는데 사용
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

const fetchComingMovies=()=>{
    return api.get(`/movie/upcoming`)
}

export const useComingMoviesQuery = ()=>{
    return useQuery({
        queryKey : ['movie-upcoming'],
        queryFn : fetchComingMovies,
        select : (result) => result.data.results
    })
}