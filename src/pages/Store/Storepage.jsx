import { useEffect } from "react"
import "./Storepage.style.css"
import TabMenu from "./TabMenu/TabMenu"
import axios from "axios"


const Store = () => {
    const tabs = [
        {eventKey:'all', title:'새로운 상품'},
        {eventKey:'ticket', title:'메가티켓'},
        {eventKey:'snack', title:'팝콘/음료/굿즈'},
        {eventKey:'point', title:'포인트몰'}
    ]
    
    // useEffect(()=>{
    //     const fetchProducts = async()=>{
    //         axios
    //             .get('http://localhost:4000')
    //             .then((result)=>{console.log('result')})
    //             .catch(()=>{console.log('실패')})
    //     }

    //     fetchProducts()
    // },[])

    return (
    <div>
        <h1>스토어</h1>
        <TabMenu tabs={tabs} />
    </div>
    )
}

export default Store
