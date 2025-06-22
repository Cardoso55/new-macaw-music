import setaE from '../assets/icons/small-left.png';
import setaD from '../assets/icons/small-right.png';
import { useNavigate } from 'react-router';
import Searchbar from '../components/Searchbar';
import '../styles/reset.css';
import '../styles/header.css';
import { useState } from "react";


function Header({query , setQuery , buscarMusica, buscarArtista}) {
    const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('macawUser'));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const irParaLogin = () => {
    navigate('/login');
  };

  const irParaRegister = () => {
    navigate('/register');
  };

  const voltar = () => {
    navigate(-1); // Volta uma página no histórico
  };

  const avancar = () => {
    navigate(1); // Avança uma página no histórico
  };

  const handleLogout = () => {
    localStorage.removeItem('macawUser');
    navigate('/');
    window.location.reload();  // Pra forçar o header recarregar (opcional, mas garante)
  };

  const irParaPlaylists = () => {
    navigate('/playlists')
  }

  return (
    <div className="header">
      <nav className="header__navigation">
        <div className="navigation">
          <button className="arrow-left" onClick={voltar}>
            <img src={setaE} alt="Seta esquerda" />
          </button>
          <button className="arrow-right" onClick={avancar}>
            <img src={setaD} alt="Seta direita" />
          </button>
        </div>

        <Searchbar
          query={query}
          setQuery={setQuery}
          buscarMusica={buscarMusica}
          buscarArtista={buscarArtista}
        />

        {/* Bloco de botões de login no Desktop */}
        <div className="header__login">
          {user ? (
            <>
              <span className="username">Olá, {user.username}</span>
              <button onClick={handleLogout} className="logout">Sair</button>
            </>
          ) : (
            <>
              <button onClick={irParaRegister} className="subscribe">Inscreva-se</button>
              <button onClick={irParaLogin} className="login">Entrar</button>
            </>
          )}
        </div>

        {/* Menu Hamburguer (Mobile) */}
        <button className="menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          ☰
        </button>
      </nav>

      {/* Dropdown Mobile */}
      {isMobileMenuOpen && (
        <div className="mobile-dropdown">
          {user ? (
            <>
              <span className="username">Olá, {user.username}</span>
              <button onClick={irParaPlaylists}>Minhas Playlists</button>
              <button onClick={handleLogout} className="logout">Sair</button>
               <span className="fas fa-home logout"  onClick={navigate('/')}></span>
            </>
          ) : (
            <>
              <button onClick={irParaRegister}>Inscreva-se</button>
              <button onClick={irParaLogin}>Entrar</button>
              <span className="fas fa-home logout"  onClick={navigate('/')}></span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;