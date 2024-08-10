import "./Card.style.css"

const Card = ({item, imgUrlBase}) => {
    console.log(item)
    return (
    <div className="product-card">
        <div className="img-area">
            <img src={`${imgUrlBase}${item.imgEndpoint}`} />
            <span className="label">{item.label}</span>
        </div>
        <dl>
            <dt className="tit">{item.title}</dt>
            <dd className="sub-tit">{item.subTitle}</dd>
            <dd className="price">{item.price}</dd>
            <dd className="sale-price">{item.salePrice}</dd>
        </dl>
    </div>
    )
}

export default Card
