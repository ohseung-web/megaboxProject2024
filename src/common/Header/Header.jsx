import './Header.style.css';
import { Link } from 'react-router-dom';
// import Logo from './logo.png'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faBars, faMagnifyingGlass, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
// import { faUser as faUserBlank } from "@fortawesome/free-regular-svg-icons"

const Header = () => {
    return (
<<<<<<< HEAD
    <div className="h_bg">
        <header>
            <div className="top">
                <div className="left">
                    <Link to="/">VIP LOUNGE</Link>
                    <Link to="/">멤버십</Link>
                    <Link to="/">고객센터</Link>
                </div>
                <div className="right">
                    <Link to="/">로그인</Link>
                    <Link to="/">회원가입</Link>
                    <Link to="/booking">빠른예매</Link>
                </div>
            </div>
            <div className="btm">
                <div className="menuSearch">
                    <Link to="/" className="allNav"><FontAwesomeIcon icon={faBars} /></Link>
                    <Link to="/" className="search"><FontAwesomeIcon icon={faMagnifyingGlass} /></Link>
                </div>
                <nav className="movieNav">
                    <Link to="/movies">영화</Link>
                    <Link to="/booking">예매</Link>
                    <Link to="/theater">극장</Link>
                </nav>
                <h1><Link to="/"><img src={Logo} alt="MEGABOX" /></Link></h1>
                <nav className="eventNav">
                    <Link to="/events">이벤트</Link>
                    <Link to="/store">스토어</Link>
                    <Link to="/benefits">혜택</Link>
                </nav>
                <div className="reservationMy">
                    <Link to="/" className="reservation"><FontAwesomeIcon icon={faCalendarDays} /></Link>
                    <Link to="/" className="myPage"><FontAwesomeIcon icon={faUserBlank} /></Link>
                </div>
            </div>
        </header>
=======
    <div className="header">
        <ul>
            <li><Link to="/movies">영화</Link></li>
            <li><Link to="/booking">예매</Link></li>
            <li><Link to="/theater">극장</Link></li>
            <li><Link to="/">MEGABOX</Link></li>
            <li><Link to="/events">이벤트</Link></li>
            <li><Link to="/store">스토어</Link></li>
            <li><Link to="/benefits">혜택</Link></li>
        </ul>
    
>>>>>>> seung
    </div>
    )
}

export default Header