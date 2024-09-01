import "./Moviespage.style.css"
import { Link, Outlet } from "react-router-dom"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome } from '@fortawesome/free-solid-svg-icons'

const Movies = () => {
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
    const [activeTab, setActiveTab] = useState(0); //제목 탭 활성화 상태변수
    //제목 탭 Link 클릭 시 인식하는 배열 path(router경로) label(제목)
    const tabTitles = [
        {path:'', label:'박스오피스'},
        {path:'comingsoon', label:'상영예정작'},
        {path:'singlemovie', label:'단독'},
        {path:'film', label:'필름소사이어티'},
        {path:'classicfilm', label:'클래식소사이어티'},
    ]

    return (
    <main className="moviesWrap">
        <div className="path_bg">
            <div className="path">
                <span><FontAwesomeIcon icon={faHome} /></span>&gt;
                <Link to="/movies">영화</Link>&gt;
                <Link to="/movies">전체영화</Link>
            </div>
        </div>
        <h1>전체영화</h1>
        <ul className="tabMenu">
            {/* 탭 클릭 시 active 클래스 변동 */}
            {tabTitles.map((tab, index)=>(
                <li key={index} className={activeTab === index ? 'active' : ''}>
                    <Link to={tab.path} onClick={()=>setActiveTab(index)}>{tab.label}</Link>
                </li>
            ))}
            {/* <li className="active"><Link to="">박스오피스</Link></li>
            <li><Link to="comingsoon">상영예정작</Link></li>
            <li><Link to="singlemovie">단독</Link></li>
            <li><Link to="film">필름소사이어티</Link></li>
            <li><Link to="classicfilm">클래식소사이어티</Link></li> */}
        </ul>
        <div className="container">
            {/* 다중라우터(하위)에서 받은 경로 렌더링 Outlet */}
            <Outlet /> 
        </div>
    </main>
    )
}

export default Movies
