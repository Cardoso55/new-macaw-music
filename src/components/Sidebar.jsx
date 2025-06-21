import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import logo from '../assets/logos/macawmusicslogo.png';
import '../styles/reset.css';
import '../styles/sidebar.css';

function Sidebar() {
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);
    const [mostrarPlaylists, setMostrarPlaylists] = useState(false);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("playlists")) || [];
        setPlaylists(stored);
    }, []);

    const irParaBusca = () => {
        navigate('/search');
    };

    return (
        <div className="sidebar">
            <nav className="sidebar__navigation">
                <div className="logo">
                    <a href="./index.html">
                        <img src={logo} alt="Logo do spotify" />
                    </a>
                </div>
                <ul>
                    <li>
                        <button>
                            <span className="fa fa-home"></span>
                            <span className="margem">Início</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={irParaBusca}>
                            <span className="fa fa-search"></span>
                            <span className="margem">Buscar</span>
                        </button>
                    </li>
                </ul>
            </nav>

            <div className="library">
                <div className="library__top">
                    <button>
                        <span className="fa fas fa-book"></span>
                        <span className="text">Sua Biblioteca</span>
                    </button>

                    <button onClick={() => navigate('/criar-playlist')}>
                        <span className="fa fa-plus"></span>
                    </button>
                </div>

                <div className="content__library">
                    <span className="title">Gerencie suas playlists</span>
                    <span className="subtitle">Escolha uma playlist abaixo:</span>

                    <button className="btn" onClick={() => navigate('/playlists')}>
  <span className="text__btn">Minhas Playlists</span>
</button>

                </div>

                <div className="content__library">
                    <span className="title">Que tal seguir um podcast novo?</span>
                    <span className="subtitle">Avisaremos você sobre novos episódios.</span>
                    <button className="btn">
                        <span className="text__btn">Explore podcasts</span>
                    </button>
                </div>

                <div className="list">
                    <span className="item__list">Legal</span>
                    <span className="item__list">Segurança e Centro de privacidade</span>
                    <span className="item__list">Política de privacidade</span>
                    <span className="item__list">Cookies</span>
                    <span className="item__list">Sobre anúncios</span>
                    <span className="item__list">Acessibilidade</span>
                </div>

                <div>
                    <span className="cookies">Cookies</span>
                </div>

                <div className="end__library">
                    <button>
                        <span className="fa fa-globe">
                            <span className="margem">Português do Brasil</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
