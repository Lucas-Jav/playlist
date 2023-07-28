import logotiao from '../../static/images/logo.png';
import { Link } from "react-router-dom";
import "../../static/css/header.css";

function Header() {
    return (
        <header>
            <img src={logotiao} alt="logo-tiao" loading='lazy'/>
            <nav>
                <Link to="/">Lista De Álbuns</Link>
                <Link to="/edit">Ações</Link>
            </nav>
        </header>
    )
}

export default Header;