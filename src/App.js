import { useState , useRef, useEffect} from 'react';
import { Routes, Route, BrowserRouter } from 'react-router';
import Searchbar from './components/Searchbar';
import MusicCard from './components/MusicCard';
import Main  from './components/Main';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Artist from './pages/Artist';
import Album from './pages/Album';
import Playlists from './pages/Playlists';
import PlaylistView from './pages/PlaylistView';
import History from './pages/History';
import Login from './pages/Login'
import Sidebar from './components/Sidebar';
import Register from './pages/Register';
import Player from './components/Player';
import CriarPlaylist from './pages/CriarPlaylist';


function App() {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const generosComIds = [
    { nome: 'Rock', id: 152 },
    { nome: 'Pop', id: 132 },
    { nome: 'Jazz', id: 129 },
    { nome: 'Electro', id: 106 },
    { nome: 'Reggae', id: 144 },
    { nome: 'Funk', id: 472 }, 
    { nome: 'Sertanejo', id: 80 },
    { nome: 'Trap', id: 465 },  
    { nome: 'MPB', id: 78 }, 
    { nome: 'Samba e Pagóde', id: 79},
    { nome: 'Metal', id: 464},
  ];
  const [aleatorias, setAleatorias] = useState([]);
  const [musicasPorGenero, setMusicasPorGenero] = useState({});
  const audioRef = useRef(null);

  useEffect(() => {
    buscarAleatorias();
    buscarGeneros();
  }, []);

  const buscarMusica = (q) => {
    if (!q) {
      setResultados([]);
      setPlaylist([]);
      return;
    }

    const callback = 'jsonp_callback_' + Math.floor(Math.random() * 100000);
    const script = document.createElement('script');

    window[callback] = (data) => {
      delete window[callback];
      if (document.body.contains(script)) {
        document.body.removeChild(script); // <-- EVITA ERRO
      }
      setResultados(Array.isArray(data.data) ? data.data : []);
    };

    script.src = `https://api.deezer.com/search/track?q=${encodeURIComponent(q)}&output=jsonp&callback=${callback}`;
    script.onerror = () => console.error('Erro ao carregar JSONP');
    document.body.appendChild(script);
  };

  const buscarAleatorias = () => {
  const generoAleatorio = generosComIds[Math.floor(Math.random() * generosComIds.length)];

  const callback = 'jsonp_callback_' + Math.floor(Math.random() * 100000);
  const script = document.createElement('script');

  window[callback] = (data) => {
    const artistas = data.data || [];

    // Pega os top 1 ou 2 artistas só pra evitar excesso de requisição
    artistas.slice(0, 2).forEach((artista) => {
      const callbackArtista = 'jsonp_callback_' + Math.floor(Math.random() * 100000);
      const scriptArtista = document.createElement('script');

      window[callbackArtista] = (dataMusicas) => {
        const musicas = dataMusicas.data || [];
        setAleatorias((prev) => [...prev, ...musicas]);
        delete window[callbackArtista];
        document.body.removeChild(scriptArtista);
      };

      scriptArtista.src = `https://api.deezer.com/artist/${artista.id}/top?limit=3&output=jsonp&callback=${callbackArtista}`;
      document.body.appendChild(scriptArtista);
    });

    delete window[callback];
    document.body.removeChild(script);
  };

  script.src = `https://api.deezer.com/genre/${generoAleatorio.id}/artists?output=jsonp&callback=${callback}`;
  document.body.appendChild(script);
};

  const buscarGeneros = () => {
    generosComIds.forEach(({ nome, id }) => {
      buscarMusicasPorGenero(id, nome);
    });
  };

  const buscarMusicasPorGenero = (genreId, generoNome) => {
    const callback = 'jsonp_callback_' + Math.floor(Math.random() * 100000);
    const script = document.createElement('script');

    window[callback] = (data) => {
      const artistas = data.data || [];

      // Pega os top 2 artistas para não fazer muitas requisições
      artistas.slice(0, 3).forEach((artista) => {
        const callbackArtista = 'jsonp_callback_' + Math.floor(Math.random() * 100000);
        const scriptArtista = document.createElement('script');

        window[callbackArtista] = (dataMusicas) => {
          const musicas = dataMusicas.data || [];
          setMusicasPorGenero(prev => {
            const existingMusicas = prev[generoNome] || [];
            const novasSemRepetir = musicas.filter(m => !existingMusicas.some(em => em.id === m.id));
            return {
              ...prev,
              [generoNome]: [...existingMusicas, ...novasSemRepetir]
            }
          });
          delete window[callbackArtista];
          document.body.removeChild(scriptArtista);
        };

        scriptArtista.src = `https://api.deezer.com/artist/${artista.id}/top?limit=6&output=jsonp&callback=${callbackArtista}`;
        document.body.appendChild(scriptArtista);
      });

      delete window[callback];
      document.body.removeChild(script);
    };

    script.src = `https://api.deezer.com/genre/${genreId}/artists?output=jsonp&callback=${callback}`;
    document.body.appendChild(script);
  };


  
  const tocarPreview = (url, index, novaPlaylist) => {
        console.log('Tocando preview:', url);
        if(audioRef.current){
          const player = audioRef.current;
          if (player.src === url) {
              if (player.paused) player.play();
          } else {
              player.src = url;
              player.play();
          }
        }
        setPlaylist(novaPlaylist);
        setCurrentIndex(index);
        setIsPlaying(true);
    };
  
  const buscarLetra = async (artista, musica) => {
        try {
        const res = await fetch(`http://localhost:3001/genius?q=${encodeURIComponent(`${musica} ${artista}`)}`);
        const data = await res.json();
        const path = data.response?.hits[0]?.result?.path;
        if (path) window.open(`https://genius.com${path}`, '_blank');
        else alert('Letra não encontrada.');
        } catch (e) {
        console.error('Erro ao buscar letra:', e);
        }
    };

  return (
    <div>
        <Routes>
          <Route path='/' element={
            <>
              <Sidebar/> 
              <Header query={query} setQuery={setQuery} buscarMusica={buscarMusica} />
              <Main 
                resultados={resultados} 
                aleatorias={aleatorias} 
                musicasPorGenero={musicasPorGenero} 
                tocarPreview={tocarPreview}  
                buscarLetra={buscarLetra}
                setPlaylist={setPlaylist}
                setCurrentIndex={setCurrentIndex}
                setIsPlaying={setIsPlaying}
              />
              <Player 
                playlist={playlist} 
                currentIndex={currentIndex} 
                setCurrentIndex={setCurrentIndex} 
                isPlaying={isPlaying} 
                setIsPlaying={setIsPlaying}
              />
            </>
          }/>
          <Route path="/artist/:id" element={<Artist />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlist/:id" element={<PlaylistView />} />
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register/>} />
          <Route path="/criar-playlist" element={<CriarPlaylist/>} />
          <Route path="/search" element={<Search />} />
        </Routes>
        <audio ref={audioRef} />
    </div>
  );


}

export default App;
