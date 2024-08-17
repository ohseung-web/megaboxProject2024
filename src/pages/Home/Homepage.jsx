import "./Homepage.style.css"
import { usePopularMoviesQuery } from "../../hooks/usePopularMovies"
import { useState, useEffect } from "react"

const Home = () => {
    const {data:movies, isLoading, error} = usePopularMoviesQuery();
    const [boxOffices, SetBoxOffices] = useState([])
    
    useEffect(()=>{
        console.log('movies :', movies)
        console.log('isLoading :', isLoading)
        console.log('error :', error)
        console.log('----------')
        if(movies){
            SetBoxOffices(movies)
            console.log('boxOffices ==>', boxOffices)
        }else{console.log('movies false!!')}
        
    },[isLoading])
    if(isLoading) return '<p>is Loadings...</p>';
    if(error) return '<p>error</p>';
    
    return (
    <main>
        <div className="box-office">
            <h1>박스 오피스</h1>
                <ul>
                    {boxOffices.map((movies)=>{
                        <li key={movies.id}>{movies.original_title}test</li>
                    })}
                </ul>
        </div>
    </main>
    )
}

export default Home
