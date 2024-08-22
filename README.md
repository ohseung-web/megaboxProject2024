## megabox 2024 -by yuna :kissing_heart:
### gitHub & google Drive url
* https://github.com/ohseung-web/megaboxProject2024.git
* https://drive.google.com/drive/folders/1uEduYI6iV4O97hh_ENqxVRg9NQlzd9ZF?usp=sharing
* https://docs.google.com/spreadsheets/d/1yWnKDMxSYyKTw387bhLgFShgW9r9bxEkA-1xg4NJ12Y/edit?usp=sharing
### 담당 프로젝트 페이지
* yuna - 메인, 메인-영화 page
----
### 메가박스 메인 페이지 구성 `src/pages/Home/`
1. 박스 오피스 `movie/popular`
* 인기 영화 나열 1행 4열 + 관심&예매 + hover 기능 추가 (24/08/17 ~ 24/08/22)
2. 빠른 예매 기능(24/08/23 ~) `src/pages/Movies/` 연결필요
* 영화명 입력 검색
* 상영시간표
* 박스오피스
* 빠른예매 링크
3. 마우스 스크롤 링크 (생략)
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
### 영화 목록 페이지 `src/pages/Movies/` 
1. 전체영화 제목
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
----
## Update & MEMO
* 메가박스 w1100px
* `src/api.js` api key 정보 및 axios.create 정보. export로 키 정보 불러오기 용도(api 사용 시 해당 api.js import 필요)
* tmdb properties info : `popular` 기준 : backdrop_path(미리보기썸네일), poster_path(포스터경로), title, overview(줄거리), release_date(개봉일), vote_average, vote_count, 연령대등급설정 정보 없음,
* `const {data, isLoading, isError, error} = usePopularMoviesQuery()` api연결정보 불러오기(아래 뜻)
* `data` : api에서 반환된 인기 영화 목록 데이터
* `isLoading` : 데이터가 아직 로딩 중인지 여부(boolean 반환)
* `isError` : 요청에 오류가 발생했는지 여부(boolean 반환)
* `error` : 오류가 발생한 경우 해당 오류에 대한 정보
## 240821 설정 및 이미지, 박스 오피스 설정
* `src/api/api.js` params 설정 `language:'ko-KR'` 한국어 설정 추가
* `src/hooks/usePopularMovies.js` 이미지 함수 추가 `getImageUrl` -> 기본 경로 `https://image.tmdb.org/t/p/w500/pathname.jpg`
* `src/pages/Home/Homepage.jsx` `boxOffices.slice(0,4).map...` 박스 오피스 4개까지 출력
* `src/pages/Home/Homepage.style.css` 박스 오피스까지 디자인완료(font-size 0.81~0.91rem 위주 사용), 주 사용 색상 `#59bec9, #037b94, #fff, #111`
* **font-awesome 사용을 위한 주요 패키지 2개 설치**
* https://fontawesome.com/icons 
* `npm install @fortawesome/free-regular-svg-icons @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons`
* `import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"`
* `import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons';`
* `import { faHeart as faHeartBlank } from "@fortawesome/free-regular-svg-icons"`
* `<FontAwesomeIcon icon={faHeart} />` return 내의 원하는 위치에 import 변수 작성
![240821](https://github.com/ohseung-web/megaboxProject2024/blob/yuna/ReadMeImages/001.jpg)
## 240822 header, pages/Movies
* `src/hooks/getImageUrl.js` 생성 후 import 개별 설정처리 (tmdb이미지 크기, 경로 연결용)
* Movies 탭제목, 탭내용 구성 진행
    * 각 탭내용(BoxOffices ~ Classic) import 연결
    * 컴포넌트 기본값부터 변경값 인식하는 useState 구성(기본값 1)
    * switch 구성으로 버튼 클릭 시 전달되는 case 값에 따라 import한 components 실행
    * tabMenu의 `button onClick={()=>setActiveTab(1)}` 1~4 useState에 전달할 번호 전달
    * 하나의 컴포넌트의 상태에 따라 변동되어 경로가 컴포넌트 하나로 고정되는 문제 발생 `localhost:3000/Movies/`
* Movies 탭 구조 개별 컴포넌트 주소 `localhost:3000/Movies/BoxOffices/` 방법 re
    * router 사용방법으로 변경(movies/comingsoon 주소를 위한 다중라우터 처리)
    * redux 설치 `npm install #reduxjs/toolkit react-redux`
    * index.js 설정 `import store from './store';`, `<Provider store={store}></Provider>`
## 문제사항 및 해결 방법 기록 
1. 24/08/17 ~ 24/08/21  `src/hooks/usePopularMovies.js`, `src/pages/Homepage.jsx` **api 출력 error**
* `usePopularMovies`에서 가져온 api 정보를 `Homepage`에 `useState`로 출력하는데 오류 발생
* api 키를 제대로 인식못해서 그런가? env 재확인 (정상)
* homepage.jsx에서 useEffect console 중 movies는 출력되는데 useState에 담았다가 출력하면 빈 문자열로 나오고 li태그 미출력
* console 출력, li태그 미출력은 태그 위치에 작성한 map 문제가능성 => 문법 체크 => 태그를 인식하는 스크립트 괄호처리 문제
* **해결1. map안에서 태그 바로 입력 시 -> `name.map((data)=>(<tag></tag>))` tag 소괄호 묶음 처리**
* **해결2. map안에서 스크립트 처리와 동시에 태그입력 시 -> `name.map((data)=>{return(<tag></tag>)})` 중괄호 먼저 작성 후 return 내에서 소괄호 처리 후 태그작성**
2. 24/08/22 **API 인증실패 -> 해결**
* `usePopularMovies.js` line 6 : https://api.themoviedb.org/3/movie/popular?language... 401(Unathorized) GET error 
* `Failed to load resource: the server responded with a status of 401` HTTP 401 상태코드(인증실패)
* 전날 테스트까지 정상으로 작동하던 페이지였는데 npm start 시 오류 발생
* TMDB 웹사이트 동작 확인(정상), 찾아보니 API 키 또는 인증 관련 설정에 문제가 있을 시 발생한다고 함.
* TMDB 로그인 - 프로필 수정 - API 섹션에서 **`.env`에 등록된 API 키를 API 읽기 액세스 토큰으로 변경하고 해결**
* 읽기 전용 액세스 토큰은 API 키보다 더 안전한 인증방식(OAuth기반)을 사용한다. TMDB API의 특정 endPoint에서 이 토큰을 요구하는 정책으로 인해 문제가 해결 됨.
3. 24/08/22 **이미지 연결 실패 -> 해결**
* `import { Logo } from './logo.png'` 모듈 형태의 이미지 내보내기 설정 오류 ex) `import { logo, img } from './name.js'`
* `import Logo from './logo.png'` default export 기본 내보내기 형태로 작성해야 오류 해결!
4. 24/08/22 **다중라우터**
* `src/Moviespage.jsx` 각 탭 메뉴 클릭 시 boxoffices, comingsoon 연결 `Link to` 설정
* `src/App.js` 다중 라우터로 `<Route></Route>` 내부에 추가 `<Route>` 작성 후 boxoff.., comingsoon 연결
    * 탭 메뉴 클릭 시 주소는 원하는 형태로 변경 됨 `movies/comingsoon`, `movies/boxoffices` 
        * 주소는 변경되나 실시간 화면에 디자인 변화없음. 말그대로 주소값만 변경. 왜??
        * 원인찾기 : MoviesPage와 App이 서로 다른 경로에 있는 파일이니 인식을 못하는건가 싶어서 `Redux` 공부 시작..어려워..뭔 소린지 이해가 안가네