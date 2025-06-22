import Sidebar from "../components/Sidebar";
import PlaylistsContent from "../components/PlaylistsContent";
import Header from "../components/HeaderPlaylists";

function Playlists({ query, setQuery, buscarMusica, resultados, tocarPreview, buscarLetra, setPlaylist, setCurrentIndex, setIsPlaying }) {

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="page-container" >
       
        <div>
          <PlaylistsContent 
            query={query} 
            setQuery={setQuery} 
            buscarMusica={buscarMusica} 
            resultados={resultados}
            tocarPreview={tocarPreview}
            buscarLetra={buscarLetra}
            setPlaylist={setPlaylist}
            setCurrentIndex={setCurrentIndex}
            setIsPlaying={setIsPlaying}
          />
        </div>
      </div>
    </div>
  );
}

export default Playlists;