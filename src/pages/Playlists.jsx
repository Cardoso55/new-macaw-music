import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("playlists")) || [];
    setPlaylists(stored);
  }, []);

  return (
    <div className="playlist-page">
      <h1>Minhas Playlists</h1>
      {playlists.length === 0 ? (
        <p>Nenhuma playlist criada ainda.</p>
      ) : (
        <ul className="playlist-list">
          {playlists.map((playlist, index) => (
            <li key={index}>
              <button
                className="playlist-item"
                onClick={() => navigate(`/playlist/${index}`)}
              >
                {playlist.nome}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Playlists;
