import "./TabMenu.style.css"
import { useEffect, useState } from "react"

const TabMenu = ({onTabChange, tabs}) => {
    const [activeTab, setActiveTab] = useState(tabs[0].eventKey)

    useEffect(()=>{
        // 부모컴포넌트에 선택한 탭의 Overview(탭컨텐츠)를 전달하기 위한 탭상태 
        onTabChange(activeTab)
    }, [activeTab, onTabChange])

    return (
    <div className="tab-area">
        <ul className="tab-menu">
            {
                tabs.map((tab, i)=>(
                    <li key={i} 
                        className={`tab-list ${tab.eventKey==activeTab?'active':''}`}
                        onClick={()=>setActiveTab(tab.eventKey)}
                    >
                        { tab.title }
                    </li>
                ))
            }
        </ul>
    </div>
    )
}

export default TabMenu
