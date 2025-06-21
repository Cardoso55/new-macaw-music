import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CriarPlaylist({ resultados, adicionarPlaylist }) {
  const [titulo, setTitulo] = useState('');
  const navigate = useNavigate();

  const salvar = () => {
    if (!titulo || resultados.length === 0) return;

    const nova = {
      id: Date.now().toString(),
      title: titulo,
      cover: resultados[0].album.cover_medium,
      tracks: resultados,
    };

    adicionarPlaylist(nova);
    navigate('/playlists');
  };

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h1>Nova Playlist</h1>
      <input 
        type="text" 
        placeholder="Nome da playlist"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <button onClick={salvar}>Salvar Playlist</button>
    </div>
  );
}

export default CriarPlaylist;