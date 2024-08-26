import "./Footer.style.css"
import { Link } from "react-router-dom"
import logoF from "./logo_opacity.png"
import snsYou from "./ico-youtubeN.png"
import snsInst from "./ico-instagramN.png"
import snsFace from "./ico-facebookN.png"
import snsTwit from "./ico-twitterN.png"

const Footer = () => {
    return (
    <div className="footerBg">
        <footer>
            <div className="fTop">
                <Link to="">회사소개</Link>
                <Link to="">인재채용</Link>
                <Link to="">사회공헌</Link>
                <Link to="">제휴/광고/부대사업문의</Link>
                <Link to="">이용약관</Link>
                <Link to="">위치기반서비스 이용약관</Link>
                <Link to=""><em>개인정보처리방침</em></Link>
                <Link to="">윤리경영</Link>
                <Link to="" className="searchMovie">극장찾기</Link>
            </div>
            <div className="fBtm">
                <p className="logo"><img src={logoF} alt="" /></p>
                <p className="copyright">
                서울특별시 성동구 왕십리로 50, 6층 (성수동1가, 메가박스 스퀘어) ARS 1544-0070 대표이메일 m.dreamcenter@partner.megabox.co.kr<br />
                대표자명 홍정인 · 개인정보보호책임자 강병철 · 사업자등록번호 211-86-59478 · 통신판매업신고번호 2023-서울성동-0177<br />
                COPYRIGHT &copy; MegaboxJoongAng, Inc. All rights reserved
                </p>
                <div className="sns">
                    <Link to=""><img src={snsYou} alt="유튜브 바로가기" /></Link>
                    <Link to=""><img src={snsInst} alt="인스타그램 바로가기" /></Link>
                    <Link to=""><img src={snsFace} alt="페이스북 바로가기" /></Link>
                    <Link to=""><img src={snsTwit} alt="트위터 바로가기" /></Link>
                </div>
            </div>
        </footer>
    </div>
    )
}

export default Footer
