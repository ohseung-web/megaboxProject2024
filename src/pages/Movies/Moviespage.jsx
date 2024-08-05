import "./Moviespage.style.css"
import {usePopularMoviesQuery} from "../../hooks/usePopularMovies"

const Movies = () => {

    const {data, isLoading, isError, error} = usePopularMoviesQuery()
    // data : api에서 반환된 인기 영화 목록 데이터
    // isLoading : 데이터가 아직 로딩 중인지 여부(boolean 반환)
    // isError : 요청에 오류가 발생했는지 여부(boolean 반환)
    // error : 오류가 발생한 경우 해당 오류에 대한 정보
    if(isLoading){
        return <div>Loading...</div>
    }

    if(isError){
        return <div>{error.message}</div>
    }  
    
    console.log('popular movie', data)


    return (
    <div>
        영화 페이지
    </div>
    )
}

export default Movies
