import setaE from '../assets/icons/small-left.png';
import setaD from '../assets/icons/small-right.png';
import { useNavigate } from 'react-router';
import Searchbar from '../components/Searchbar';
import '../styles/reset.css';
import '../styles/header.css';


function Header({query , setQuery , buscarMusica, buscarArtista}) {
    const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('macawUser'));

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

        <Searchbar query={query} setQuery={setQuery} buscarMusica={buscarMusica} buscarArtista={buscarArtista}/>

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
      </nav>
    </div>
  );
}

export default Header;
