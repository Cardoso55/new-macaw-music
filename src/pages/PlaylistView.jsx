import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/playlistview.css';
import Player from '../components/PlayerPlaylist';

function PlaylistView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);

  const [playerPlaylist, setPlayerPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [letra, setLetra] = useState("");

  useEffect(() => {
    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
    const selectedPlaylist = playlists[id];
    setPlaylist(selectedPlaylist);
    if (selectedPlaylist) {
      setPlayerPlaylist(selectedPlaylist.musicas);
    }
  }, [id]);

  const formatarDuracao = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = String(segundos % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  const removerMusica = (index) => {
    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
    playlists[id].musicas.splice(index, 1);
    localStorage.setItem("playlists", JSON.stringify(playlists));
    setPlaylist({ ...playlists[id] });
    setPlayerPlaylist(playlists[id].musicas);
  };

  const excluirPlaylist = () => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir esta playlist? Essa ação não pode ser desfeita!");
    if (confirmacao) {
      const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
      playlists.splice(id, 1);
      localStorage.setItem("playlists", JSON.stringify(playlists));
      navigate("/playlists");
    }
  };

  const verLetra = async (musica) => {
    try {
      const response = await fetch(`https://api.cardoso.com/lyrics?artist=${encodeURIComponent(musica.artista)}&title=${encodeURIComponent(musica.titulo)}`);
      const data = await response.json();
      setLetra(data.letra || "Letra não encontrada.");
    } catch (error) {
      console.error("Erro ao buscar letra:", error);
      setLetra("Erro ao carregar a letra.");
    }
  };

  const tocarMusicaNoPlayer = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const voltarParaPlaylists = () => {
    navigate("/playlists");
  };

  return (
    <div className="playlist-page">
      <button className="back-button" onClick={voltarParaPlaylists}> ⬅ </button>

      {playlist ? (
        <>
          <div className="playlist-header">
            <img src={playlist.musicas[0]?.capa || ''} alt="Capa da Playlist" />
            <div className="playlist-info">
              <h1>{playlist.nome}</h1>
              <p>{playlist.musicas.length} músicas</p>
            </div>

            <button className="excluir-playlist-btn" onClick={excluirPlaylist}>
              🗑 Excluir Playlist
            </button>
          </div>

          {playlist.musicas.length === 0 ? (
            <p>Nenhuma música adicionada ainda.</p>
          ) : (
            <div className="playlist-musics">
              {playlist.musicas.map((musica, index) => (
                <div className="music-item" key={index}>
                  <span className="index">{index + 1}</span>
                  <img src={musica.capa} alt={musica.titulo} />
                  <div className="music-meta">
                    <strong>{musica.titulo}</strong>
                    <span>{musica.artista}</span>
                  </div>
                  <span className="duration">{formatarDuracao(musica.duracao)}</span>

                  <div className="buttons">
                    <button onClick={() => tocarMusicaNoPlayer(index)}>▶</button>
                    <button onClick={() => verLetra(musica)}>Ver Letra</button>
                    <button onClick={() => removerMusica(index)}>X</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {letra && (
            <div className="lyrics-section">
              <h3>Letra da música:</h3>
              <pre>{letra}</pre>
            </div>
          )}

          {playerPlaylist.length > 0 && (
            <Player
              playlist={playerPlaylist}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          )}
        </>
      ) : (
        <p>Carregando playlist...</p>
      )}
    </div>
  );
}

export default PlaylistView;
