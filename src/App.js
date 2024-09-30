import './common/Common.css';
import { Route, Routes } from 'react-router-dom';
import Header from './common/Header/Header';
import Footer from './common/Footer/Footer';
import Home from './pages/Home/Homepage';
import Movies from './pages/Movies/Moviespage'
import Booking from './pages/Booking/Bookingpage'
import StorePage from './pages/StorePage/Storepage'

function App() {

  return (
    <>
      <Header />

      <Routes>
          <Route path="/movies" element={<Movies />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/theater" element={<div>극장</div>} />
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<div>이벤트 페이지</div>} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/benefits" element={<div>혜택 페이지</div>} />
          <Route path="*" element={<div>404 페이지</div>} />
      </Routes>

      <Footer />
      
    </>
  );
}

export default App;
