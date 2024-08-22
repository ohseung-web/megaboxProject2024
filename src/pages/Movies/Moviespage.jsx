import "./Moviespage.style.css"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import {usePopularMoviesQuery} from "../../hooks/usePopularMovies"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from '@fortawesome/free-solid-svg-icons'
// tabContent Import
import BoxOffices from "./TabContent/BoxOffices" //박스오피스
import ComingSoon from "./TabContent/Comingsoon" //상영예정작
import Single from "./TabContent/Singl" //단독
import Film from "./TabContent/Film" //필름소사이어티
import Classic from "./TabContent/Classic" //클래식소사이어티

const Movies = () => {
    const {data, isLoading, isError, error} = usePopularMoviesQuery()
    const [activeTab, setActiveTab] = useState(1); //default BoxOffices

    const tabContentSwitch = () => {
        switch(activeTab){
            case 1:return <BoxOffices />
            case 2:return <ComingSoon />
            case 3:return <Single />
            case 4:return <Film />
            case 5:return <Classic />
            default:return <div>error</div>
        }
    }
    

    return (
    <main className="moviesWrap">
        <div className="path">
            <span><FontAwesomeIcon icon={faHome} /></span>&gt;
            <Link to="/movies">영화</Link>&gt;
            <Link to="/movies">전체영화</Link>
        </div>
        <h1>전체영화</h1>
        <ul className="tabMenu">
            <li><button type="button" onClick={()=>setActiveTab(1)}>박스오피스</button></li>
            <li><button type="button" onClick={()=>setActiveTab(2)}>상영예정작</button></li>
        </ul>
        <div className="container">
            {tabContentSwitch()}
        </div>
    </main>
    )
}

export default Movies
