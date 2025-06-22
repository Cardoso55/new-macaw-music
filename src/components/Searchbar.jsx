import search from '../assets/icons/search.png';
import '../styles/reset.css';
import '../styles/searchbar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function Searchbar({ query, setQuery, buscarMusica }) {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const handleFocus = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  useEffect(() => {
    // Quando o usuário for redirecionado pro "/", foca automaticamente
    if (location.pathname === '/' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [location.pathname]);

  return (
    <div className="header__search">
      <img src={search} alt="Procurar" />
      <input
        type="text"
        maxLength="800"
        placeholder="O que você quer ouvir?"
        value={query}
        onFocus={handleFocus}
        onChange={(e) => {
          const val = e.target.value;
          setQuery(val);
          buscarMusica(val);
        }}
        ref={inputRef}
      />
    </div>
  );
}

export default Searchbar;
