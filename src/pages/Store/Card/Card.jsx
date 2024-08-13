import "./Card.style.css"

const Card = ({item, imgUrlBase}) => {
    console.log(item)
    return (
    <div className="card-box">
        <span className="label">{item.label}</span>
        <a href="#" className="item-link">
            <div className="img-area">
                <img src={`${imgUrlBase}${item.imgEndpoint}`} />
            </div>
            <dl className="txt-area">
                <dt className="tit">{item.title}</dt>
                <dd className="sub-tit">{item.subTitle}</dd>
                <dd className="price">{item.price} 원</dd>
                <dd className="sale-price">{item.salePrice} 원</dd>
            </dl>
        </a>
    </div>
    )
}

export default Card
