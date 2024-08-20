import "./Homepage.style.css"
import { usePopularMoviesQuery } from "../../hooks/usePopularMovies"
import { useState, useEffect } from "react"

const Home = () => {
    // const {data:movies, isLoading, error} = usePopularMoviesQuery();
    const {data, isLoading, isError, error} = usePopularMoviesQuery()
    const [boxOffices, SetBoxOffices] = useState([])
    
    useEffect(()=>{
        console.log('movies :', data)
        console.log('isLoading :', isLoading)
        console.log('error :', error)
        console.log('----------')
        if(data){
            SetBoxOffices(data)
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
                    <li>test</li>
                    {boxOffices.map((data)=>{
                        return(
                            <li key={data.id}>{data.original_title}test</li>
                        )
                    })}
                </ul>
        </div>
    </main>
    )
}

export default Home
