import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/playlists.css";
import MusicCard from "./MusicCard";

function PlaylistsContent({ resultados, tocarPreview, buscarLetra, setPlaylist, setCurrentIndex, setIsPlaying }) {
  const [playlists, setPlaylists] = useState([]);
  const [novaPlaylist, setNovaPlaylist] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("playlists")) || [];
    setPlaylists(stored);
  }, []);

  const salvarPlaylist = () => {
    if (!novaPlaylist.trim()) {
      alert("Coloque um nome válido");
      return;
    }
    const nova = { nome: novaPlaylist.trim(), musicas: [] };
    const updated = [...playlists, nova];
    setPlaylists(updated);
    localStorage.setItem("playlists", JSON.stringify(updated));
    setNovaPlaylist("");
    setMostrarModal(false);
  };

  return (
    <div className="playlists-container">
      {/* Minhas Playlists */}
      <div className="playlists-header">
        <h1 className="playlist-title">Minhas Playlists</h1>
        <button onClick={() => setMostrarModal(true)} className="btn-criar-playlist">
          + Nova Playlist
        </button>
      </div>

      {playlists.length === 0 ? (
        <div className="sem-playlists">
          <p>Você ainda não criou nenhuma playlist.</p>
          <button
            onClick={() => setMostrarModal(true)}
            className="btn-criar-centralizada"
          >
            Criar Playlist
          </button>
        </div>
      ) : (
        <div className="playlist-grid">
          {playlists.map((playlist, index) => (
            <Link
              to={`/playlist/${index}`}
              key={index}
              className="playlist-card"
            >
              <img
                src={playlist.musicas?.[0]?.capa || "https://via.placeholder.com/150"}
                alt={playlist.nome}
                className="playlist-cover"
              />
              <div className="playlist-info">
                <h2>{playlist.nome}</h2>
                <p>{playlist.musicas.length} música(s)</p>
              </div>
            </Link>
          ))}
        </div>
      )}

    

      {/* Modal para criar playlist */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Criar Nova Playlist</h2>
            <input
              type="text"
              placeholder="Nome da playlist"
              value={novaPlaylist}
              onChange={(e) => setNovaPlaylist(e.target.value)}
              className="input"
            />
            <div className="actions">
              <button className="btn-confirm" onClick={salvarPlaylist}>
                Criar
              </button>
              <button
                className="btn-cancel"
                onClick={() => setMostrarModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaylistsContent;
