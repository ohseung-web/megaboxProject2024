import "./Moviespage.style.css"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import {usePopularMoviesQuery} from "../../hooks/usePopularMovies"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from '@fortawesome/free-solid-svg-icons'
// tabContent Import
import BoxOffices from "./TabContent/BoxOffices" //박스오피스
import ComingSoon from "./TabContent/Comingsoon" //상영예정작
import Single from "./TabContent/SingleMovie" //단독
import Film from "./TabContent/Film" //필름소사이어티
import Classic from "./TabContent/ClassicFilm" //클래식소사이어티

const Movies = () => {
    const {data, isLoading, isError, error} = usePopularMoviesQuery()
    /* const [activeTab, setActiveTab] = useState(1); //default BoxOffices
    const tabContentSwitch = () => {
        switch(activeTab){
            case 1:return <BoxOffices />
            case 2:return <ComingSoon />
            case 3:return <Single />
            case 4:return <Film />
            case 5:return <Classic />
            default:return <div>error</div>
        }
    } */
    

    return (
    <main className="moviesWrap">
        <div className="path">
            <span><FontAwesomeIcon icon={faHome} /></span>&gt;
            <Link to="/movies">영화</Link>&gt;
            <Link to="/movies">전체영화</Link>
        </div>
        <h1>전체영화</h1>
        <ul className="tabMenu">
            <li><Link to="boxoffices">1</Link></li>
            <li><Link to="comingsoon">2</Link></li>
        </ul>
        <div className="container">
            <BoxOffices />
        </div>
        {/* routes */}
        {/* <Routes>
            <Route path="/movies/boxoffices" element={<BoxOffices />} />
            <Route path="comingsoon" element={<ComingSoon />} />
        </Routes> */}
    </main>
    )
}

export default Movies
