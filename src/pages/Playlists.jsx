import Sidebar from "../components/Sidebar";
import HeaderPlaylists from "../components/HeaderPlaylists";
import PlaylistsContent from "../components/PlaylistsContent";

function Playlists({ query, setQuery, buscarMusica, resultados, tocarPreview, buscarLetra, setPlaylist, setCurrentIndex, setIsPlaying }) {

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "black", color: "white" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo principal */}
      <div
        style={{
          flex: 1,
          marginLeft: "240px",
          padding: "20px 32px",
          maxWidth: "1600px",
          marginRight: "auto",
        }}
      >
        {/* Header específico das playlists com a Searchbar */}
        <HeaderPlaylists query={query} setQuery={setQuery} buscarMusica={buscarMusica} />

        {/* Conteúdo da página */}
        <div style={{ marginTop: "20px" }}>
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
