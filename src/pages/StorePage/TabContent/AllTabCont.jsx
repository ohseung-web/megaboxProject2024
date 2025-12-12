import Card from "../Card/Card"
import "./AllTabCont.style.css"

const AllTabCont = ({products, imgUrlBase}) => {
    
    console.log('AllTabCont',products)

    return (
    <div className="tab-allcont">
        <div className="new-pd">
            <div className="txt-area">
                소중한 분들과 함께<br />
                즐거운 관람되세요~
            </div>
            <div className="img-area">
                <img src="https://img.megabox.co.kr/SharedImg/store/2020/12/29/ZVX4FRDP8NLYto5HL0gAtxr6u4ZCmwOP_280.png" width="300" />
            </div>
        </div>

        <div className="overview">
        {
            products.map(category => (
                <div key={category.category}>
                    <h2> { category.title } </h2>
                    <ul>
                        {
                            category.products.map(item => (
                                <li key={item.id}>
                                    <Card item={item} imgUrlBase={imgUrlBase} />
                                </li>
                            ))
                            
                        }
                    </ul>
                    <div>더보기</div>
                </div>
            ))
        }
        </div>
    </div>
    )
}

export default AllTabCont
