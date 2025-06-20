import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/playlistview.css"; 

const PlaylistView = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("playlists")) || [];
    setPlaylists(stored);
  }, []);

  return (
    <div className="sidebar-playlists">
      <h3>Sua Biblioteca</h3>
      <Link to="/criar-playlist" className="criar-btn">+ Criar Playlist</Link>
      <ul>
        {playlists.map((p, index) => (
          <li key={index}>
            <Link to={`/playlist/${index}`} className="playlist-link">{p.nome}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistView;

