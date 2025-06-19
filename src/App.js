import { useState , useRef} from 'react';
import { Routes, Route } from 'react-router';
import Searchbar from './components/Searchbar';
import MusicCard from './components/MusicCard';
import Main  from './components/Main';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Artist from './pages/Artist';
import Album from './pages/Album';
import Playlists from './pages/Playslist';
import PlaylistView from './pages/PlaylistsView';
import History from './pages/History';
import Login from './pages/Login'
import Sidebar from './components/Sidebar';

function App() {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const audioRef = useRef(null);

  const buscarMusica = (q) => {
        if (!q) {
            setResultados([]);
            return;
        }

        const callback = 'jsonp_callback_' + Math.floor(Math.random() * 100000);
        window[callback] = (data) => {
            delete window[callback];
            document.body.removeChild(script);
            setResultados(data.data || []);
        };

        const script = document.createElement('script');
        script.src = `https://api.deezer.com/search/track?q=${encodeURIComponent(q)}&output=jsonp&callback=${callback}`;
        script.onerror = () => console.error('Erro ao carregar JSONP');
        document.body.appendChild(script);
    };
  
  const tocarPreview = (url) => {
        console.log('Tocando preview:', url);
        const player = audioRef.current;
        if (player.src === url) {
            if (player.paused) player.play();
        } else {
            player.src = url;
            player.play();
        }
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
      <Sidebar/>
      <Header query={query} setQuery={setQuery} buscarMusica={buscarMusica} />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/search" element={<Search />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlist/:id" element={<PlaylistView />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register/>} />
      </Routes>
      <MusicCard resultados={resultados} tocarPreview={tocarPreview} buscarLetra={buscarLetra} />
      <Main resultados={resultados}/>
    </div>
  );


}

export default App;
