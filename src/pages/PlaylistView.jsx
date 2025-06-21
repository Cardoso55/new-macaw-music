import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import '../styles/playlistview.css'; // importa o novo CSS

function PlaylistView() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const audioRef = useRef(null);
  const [tocandoIndex, setTocandoIndex] = useState(null);

  useEffect(() => {
    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
    setPlaylist(playlists[id]);
  }, [id]);

  const tocarPreview = (previewUrl, index) => {
    if (audioRef.current) {
      audioRef.current.pause();
      if (tocandoIndex === index) {
        setTocandoIndex(null);
        return;
      }
    }

    const audio = new Audio(previewUrl);
    audio.play().catch(err => console.error('Erro ao tocar a prévia:', err));
    audioRef.current = audio;
    setTocandoIndex(index);
  };

  const formatarDuracao = (segundos) => {
    const min = Math.floor(segundos / 60);
    const sec = String(segundos % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  return (
    <div className="playlist-page">
      {playlist ? (
        <>
          <div className="playlist-header">
            <img src={playlist.musicas[0]?.capa || ''} alt="Capa da Playlist" />
            <div className="playlist-info">
              <h1>{playlist.nome}</h1>
              <p>{playlist.musicas.length} músicas</p>
            </div>
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
                  <button onClick={() => tocarPreview(musica.preview, index)}>
                    {tocandoIndex === index ? '⏸️ Pausar' : '▶️ Ouvir Prévia'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p>Carregando playlist...</p>
      )}
    </div>
  );
}

export default PlaylistView;


