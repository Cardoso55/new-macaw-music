// Barra superior com logo, menu, busca, entrar, increva-se e etc.
import setaE from '../assets/icons/small-left.png';
import setaD from '../assets/icons/small-right.png';
import { useNavigate } from 'react-router';

import Searchbar from '../components/Searchbar';
import '../styles/reset.css';
import '../styles/header.css';


function Header({query , setQuery , buscarMusica, buscarArtista}) {
    const navigate = useNavigate;

    const irParaLogin = () => {
        navigate('/login');
    }

    return(
        <div className="header">
            <nav className="header__navigation">
                <div className="navigation">
                    <button className="arrow-left">
                        <img src={setaE} alt="Seta esquerda" />
                    </button>
                    <button className="arrow-right">
                        <img src={setaD} alt="Seta direita" />
                    </button>
                </div>
                <Searchbar query={query} setQuery={setQuery} buscarMusica={buscarMusica} buscarArtista={buscarArtista} />
                <div className="header__login">
                    <button className="subscribe">Inscreva-se</button>
                    <button onClick={irParaLogin} className="login">Entrar</button>
                </div>
            </nav>
        </div>
    )
}

export default Header;