import { useState, useEffect } from "react";
import "./Storepage.style.css";
import TabMenu from "./TabMenu/TabMenu";

const Store = () => {
    const tabs = [
    { eventKey: 'all', title: '새로운 상품' },
    { eventKey: 'ticket', title: '메가티켓' },
    { eventKey: 'snack', title: '팝콘/음료/굿즈' },
    { eventKey: 'point', title: '포인트몰' }
    ];

    const [products, setProducts] = useState([]);

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

    return (
    <div>
        <h1>스토어</h1>
        <TabMenu tabs={tabs} />

        {products.map((product) => ( 
            <dl key={product.id}>
                <dt>{product.title}</dt>
                <dd>수량{product.quantity}</dd>
            </dl>
        ))}
    </div>
    );
};

export default Store;