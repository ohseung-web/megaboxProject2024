import "./TabCont.style.css"
import Card from "../Card/Card"

const TabCont = ({products, imgUrlBase}) => {
    
    return (
    <div>
        <ul className="tabcont-area">
        {
            products.map(product => (
                <li className="tabcont-list" key={product.id}>
                    <Card item={product} imgUrlBase={imgUrlBase} />
                </li>
            ))
            
        }
        </ul>
    </div>
    )
}

export default TabCont
