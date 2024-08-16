import './Header.style.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <ul>
        <li>
          <Link to="/movies">영화</Link>
        </li>
        <li>
          <Link to="/booking">예매</Link>
        </li>
        <li>
          <Link to="/theater">극장</Link>
        </li>
        <li>
          <Link to="/">MEGABOX</Link>
        </li>
        <li>
          <Link to="/events">이벤트</Link>
        </li>
        <li>
          <Link to="/store">스토어</Link>
        </li>
        <li>
          <Link to="/benefits">혜택</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
