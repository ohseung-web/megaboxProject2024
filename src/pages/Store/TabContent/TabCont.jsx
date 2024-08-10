import "./TabCont.style.css"
import Card from "../Card/Card"

const TabCont = ({products, imgUrlBase}) => {
    
    return (
    <div>
        <ul>
        {
            products.map(product => (
                <li key={product.id}>
                    <Card item={product} imgUrlBase={imgUrlBase} />
                </li>
            ))
            
        }
        </ul>
    </div>
    )
}

export default TabCont
