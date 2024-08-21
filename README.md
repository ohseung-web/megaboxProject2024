## megabox 2024 -by yuna :kissing_heart:
### gitHub & google Drive url
* https://github.com/ohseung-web/megaboxProject2024.git
* https://drive.google.com/drive/folders/1uEduYI6iV4O97hh_ENqxVRg9NQlzd9ZF?usp=sharing
* https://docs.google.com/spreadsheets/d/1yWnKDMxSYyKTw387bhLgFShgW9r9bxEkA-1xg4NJ12Y/edit?usp=sharing
### 담당 프로젝트 페이지
* yuna - 메인, 메인-영화 page
### 메가박스 메인 페이지 구성 정리
1. 박스 오피스
* 인기 영화 나열 1행 4열(24/08/17 -> )
* 마우스 오버 시 스토리 포스터 위 출력
* 마우스 오버 시 관람점수 출력(위치 동일)
* 인기 영화 포스터 하단 관심개수+예매 버튼제공
2. 빠른 예매 기능
* 영화명 입력 검색
* 상영시간표
* 박스오피스
* 빠른예매 링크
3. 마우스 스크롤 링크 (생략가능)
4. 혜택 
* 4개 슬라이드 구성 swiper 
* 메가박스 오리지널 티켓1, 2, 3, VR 콘서트 안내
* 하단 아이콘 1행 5열 구성 
* vip lounge, 멤버십, 할인카드안내, 이벤트, 스토어
5. 큐레이션
* 영화 소개 왼쪽 메인 요소 1개와 
* 우측 아래 1행 4열 구성으로 영화 소개 
* 상세정보, 예매 버튼, 스토리 구성
6. 메가박스 안내
* 돌비시네마, 메가4d, 프라이빗, 부티크, 돌비atmos, 컴포트관
7. 공지사항 및 고객센터 안내
* 공지사항 1행 1열 한개씩 공지-날짜-더보기 구성
* 고객센터, 자주 묻는 질문, 1:1 문의, 단체/대관문의, 분실물 문의/접수, 더 부티크 프라이빗 대관안내 
8. 배너 디자인(영화홍보)
### 영화 목록 페이지 
1. 전체영호 제목
2. 탭 제목 구성(5개)
박스오피스, 상영예정작, 단독, 필름소사이어티, 클래식소사이어티
(박스오피스 open 기준)
2. 필터 
개봉작 on/off 
154개의 영화가 검색되었습니다.
영화명 검색 + 검색 버튼
3 영화 목록 
영화 한개당 포스터, 연령, 제목, 예매율, 개보일, 좋아요, 예매 버튼 구성(돌비 시네마는 필요한 경우만 배치)
5행 4열 기본 구성(더보기 기능 추가)
### 영화 상세 페이지
100vh 높이만큼 영화 상세 미리보기
1. 한글제목, 영어제목, 좋아요, 공유하기, 관 정보, 포스터, 예매버튼, 실 관람 평점, 예매율, 누적관객수 
2. 탭 제목 구성 1행 4열
주요정보, 실관람평, 무비포스트, 예고편/스틸컷
관람포인트, 실관람평점, 누적관객수
리뷰 정보 나열 
3. 이벤트
1행 2열 영화 관련 배너 구성
### MEMO
* `src/api.js` api key 정보 및 axios.create 정보. export로 키 정보 불러오기 용도(api 사용 시 해당 api.js import 필요)
## 문제사항 및 해결 방법 기록 
1. 24/08/17 ~ 24/08/21  `src/hooks/usePopularMovies.js`, `src/pages/Homepage.jsx` **api 출력 error**
* `usePopularMovies`에서 가져온 api 정보를 `Homepage`에 `useState`로 출력하는데 오류 발생
* api 키를 제대로 인식못해서 그런가? env 재확인 (정상)
* homepage.jsx에서 useEffect console 중 movies는 출력되는데 useState에 담았다가 출력하면 빈 문자열로 나오고 li태그 미출력
* console 출력, li태그 미출력은 태그 위치에 작성한 map 문제가능성 => 문법 체크 => 태그를 인식하는 스크립트 괄호처리 문제
* **해결1. map안에서 태그 바로 입력 시 -> `name.map((data)=>(<tag></tag>))` tag 소괄호 묶음 처리**
* **해결2. map안에서 스크립트 처리와 동시에 태그입력 시 -> `name.map((data)=>{return(<tag></tag>)})` 중괄호 먼저 작성 후 return 내에서 소괄호 처리 후 태그작성**