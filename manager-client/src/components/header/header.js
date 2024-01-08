import {Link} from "react-router-dom";
import "./header.css";

const Header = () => {
    return (
        <div className="header">
            <div className="header__elem">
                <Link to={`/passmanager`}>Пароли</Link>
            </div>
            <div className="header__elem">
                <Link to={`/movie`}>Фильмы</Link>
            </div>
        </div>
    )
}

export default Header;