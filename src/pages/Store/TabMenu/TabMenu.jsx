import "./TabMenu.style.css"
import { useState } from "react"

const TabMenu = ({tabs}) => {
    const [activeTab, setActiveTab] = useState(tabs[0].eventKey)
    const clickTab = (eventKey)=>{
        setActiveTab(eventKey)
    }

    return (
    <div className="tab-area">
        <ul className="tab-menu">
            {
                tabs.map((tab, i)=>(
                    <li key={i} 
                        className={`tab-list ${tab.eventKey==activeTab?'active':''}`}
                        onClick={()=>clickTab(tab.eventKey)}
                    >
                        {tab.title}
                    </li>
                ))
            }
        </ul>
    </div>
    )
}

export default TabMenu
