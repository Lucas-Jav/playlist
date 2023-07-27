import logotiao from '../../static/images/logo.png';
import { Link } from "react-router-dom";

function Header() {
    return (
        <header>
            <img src={logotiao} alt="logo-tiao" loading='lazy'/>
            <nav>
                <Link to="/">Lista De Álbuns</Link>
                <Link to="/edit">Meus Álbuns</Link>
            </nav>
        </header>
    )
}

export default Header;