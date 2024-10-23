import './common/Common.css';
import { Route, Routes } from 'react-router-dom';
import Header from './common/Header/Header';
import Footer from './common/Footer/Footer';
import Home from './pages/Home/Homepage';
import Movies from './pages/Movies/Moviespage';
import Booking from './pages/Booking/Bookingpage';
import StorePage from './pages/StorePage/Storepage';
import BookinglistCard from './pages/Booking/BookinglistCard';
import Reservation from './pages/Reservation/Reservation';
//Moviepage/TabContent 무비 탭 클릭 시 출력되는 탭 내용 import + 무비 디테일 페이지
import BoxOffices from './pages/Movies/TabContent/BoxOffices';
import Comingsoon from './pages/Movies/TabContent/Comingsoon';
import SingleMovie from './pages/Movies/TabContent/SingleMovie';
import Film from './pages/Movies/TabContent/Film';
import ClassicFilm from './pages/Movies/TabContent/ClassicFilm';
import MoviesDetail from './pages/Movies/MoviesDetail';

// npm 설치
// *** npm react-dom react-router dom
// *** npm i axios
// *** npm i @tanstack/react-query
// *** npm i @tanstack/react-query-devtools

function App() {

  return (
    <>
      <Header />

      <Routes>

        <Route path="/booking" element={<Booking />}>
          <Route
            path="BookinglistCard/:Paramdate"
            element={<BookinglistCard />}
          />
        </Route>
        <Route path="/Reservation" element={<Reservation />} />
        <Route path="/theater" element={<div>극장</div>} />
        <Route path="/events" element={<div>이벤트 페이지</div>} />
        <Route path="/StorePage" element={<StorePage />} />
        <Route path="/benefits" element={<div>혜택 페이지</div>} />
        <Route path="/movies" element={<Movies />}>
          <Route path="" element={<BoxOffices />} />
          <Route path="comingsoon" element={<Comingsoon />} />
          <Route path="singlemovie" element={<SingleMovie />} />
          <Route path="film" element={<Film />} />
          <Route path="classicfilm" element={<ClassicFilm />} />
        </Route>
        <Route path="/moviesdetail" element={<MoviesDetail />} />
        <Route path="/megabox2024" element={<Home />} />
        <Route path="*" element={<div>404 페이지</div>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
