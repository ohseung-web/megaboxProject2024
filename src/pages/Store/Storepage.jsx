import { useState, useEffect } from "react";
import "./Storepage.style.css";
import TabMenu from "./TabMenu/TabMenu";
import TabCont from "./TabContent/TabCont";
import AllTabCont from "./TabContent/AllTabCont";

const Store = () => {
    const [products, setProducts] = useState([]);  // db.json 데이터
    const [selectedTab, setSelectedTab] = useState('all') // 선택된 탭

    const tabs = [ // TabMenu 컴포넌트를 재사용하기위해 각 페이지에서 props로 전달
        { eventKey: 'all', title: '새로운 상품' },
        { eventKey: 'ticket', title: '메가티켓' },
        { eventKey: 'snack', title: '팝콘/음료/굿즈' },
        { eventKey: 'point', title: '포인트몰' }
    ];

    // 상품 이미지 URL base
    const imgUrlBase = "https://img.megabox.co.kr/SharedImg/store/";

    // 탭메뉴에서 선택된 탭의 이벤트 키를 상태로 설정 
    const onTabChange = (eventKey) =>{
        setSelectedTab(eventKey)
    }

    useEffect(() => {
        // SSE 연결 설정
        const eventSource = new EventSource('http://localhost:3001/events');

        // 데이터 수신
        eventSource.onmessage = (event) => {
            try {
                // console.log('Received data:', event.data); // 데이터 로그 확인
                const data = JSON.parse(event.data);
                setProducts(data.products || []);

            } 
            catch (error) {
                console.error('Error parsing JSON:', error);
            }
        };

        // 에러 핸들링
        eventSource.onerror = (error) => {
            console.error('EventSource error:', error);
        };

        // 컴포넌트 언마운트 시 연결 종료
        return () => {
            eventSource.close();
        };
    }, []); // 빈 의존성 배열로 컴포넌트 마운트 시에만 실행
    
    // 현재 선택된 탭에 따라 products.category 필터링
    const getProductsByCategory = products.filter(product => 
        product.category == selectedTab
    );

    /* <AllTabCont />에 전달할 props  */
    // const categories = tabs.filter(tab=>tab.eventKey!='all').map(tab=>tab.eventKey)
    const categories = [...new Set(products.map(product => product.category))];
    
    // tabs 배열을 eventKey와 title을 매핑하는 객체로 변환
    const tabTitleMap = Object.fromEntries(tabs.map(tab => [tab.eventKey, tab.title]));

    // allTabProducts 배열 생성
    let allTabProducts = categories.map(category => {
        // eventKey가 category와 일치하는지 확인
        const title = tabTitleMap[category] || '';
        
        return {
            category,
            title,
            products: products
                .filter(product => product.category === category)
                .slice(0, 4)
        };
    });



    return (
    <div className="wrapper">
        <div className="main-content">
            <h1 className="main-tit">스토어</h1>
            <TabMenu onTabChange={onTabChange} tabs={tabs} /> {/* 탭메뉴 */}
            {
                selectedTab == 'all'
                    ? <AllTabCont products={allTabProducts} imgUrlBase={imgUrlBase} />
                    : <TabCont products={getProductsByCategory} imgUrlBase={imgUrlBase} />
            }
        </div>
    </div>
    );
};

export default Store;