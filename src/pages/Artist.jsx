// pages/ArtistPage.jsx
import '../styles/artist.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Artist({ setPlaylist, setCurrentIndex, setIsPlaying, tocarPreview, buscarLetra }) {
  const { state } = useLocation();
  const { artista } = state || {};
  const [topMusicas, setTopMusicas] = useState([]);
  const navigate = useNavigate();

  const voltarParaHome = () => {
    navigate('/');
  };

  useEffect(() => {
    if (!artista) return;

    const buscarTop10DoArtista = async (idArtista) => {
      try {
        const res = await fetch(`https://backend-macaw.onrender.com/deezer/artist/${idArtista}/top?limit=10`);
        const data = await res.json();

        if (Array.isArray(data.data)) {
          console.log('🎯 Top 10 músicas do artista:', data.data);
          setTopMusicas(data.data);
        } else {
          console.warn('⚠️ Nenhuma música encontrada ou resposta malformada:', data);
          setTopMusicas([]);
        }
      } catch (error) {
        console.error('❌ Erro ao buscar top 10 do artista:', error);
        setTopMusicas([]); // segurança
      }
    };

    buscarTop10DoArtista(artista.id);
  }, [artista]);

  return (
    <div className="artist-page">
      <button className="back-button" onClick={voltarParaHome}> ⬅ </button>
      <div className="artist-header">
        {artista?.picture_xl && <img src={artista.picture_xl} alt={artista.name} />}
        <h1>{artista?.name || 'Artista'}</h1>
      </div>

      <h2>Top 10 músicas</h2>

      <ul className="top-musicas-lista">
        {topMusicas.length > 0 ? (
          topMusicas.map((musica, index) => (
            <li key={musica.id} className="musica-item">
              {musica.album?.cover_medium && (
                <img src={musica.album.cover_medium} alt={musica.album.title} />
              )}
              <div className="musica-info">
                <strong>{musica.title}</strong>
                <p>{musica.album.title}</p>
              </div>
              <div className="musica-actions">
                <button
                  onClick={() => tocarPreview(musica.preview, index, topMusicas)}
                  className="button-play-artist"
                >
                  <span className="fas fa-play"></span>
                </button>
                <button
                  onClick={() => buscarLetra(musica.artist.name, musica.title, musica.album.cover_medium)}
                  className="btn-letra-artist"
                >
                  Letra
                </button>
              </div>
            </li>
          ))
        ) : (
          <li style={{ padding: '1rem', textAlign: 'center' }}>🎧 Nenhuma música disponível</li>
        )}
      </ul>
    </div>
  );
}

export default Artist;
