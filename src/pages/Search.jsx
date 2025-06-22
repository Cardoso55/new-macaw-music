import MusicCard from "../components/MusicCard";
import AlbumCard from "../components/AlbumCard";

function Search({ resultados = [], tocarPreview, buscarLetra, setIsPlaying, setCurrentIndex, setPlaylist }) {
  const musicas = resultados.filter(item => item.type === "track");
  const albuns = resultados
    .filter(item => item.type === "album")
    .map(album => ({
      id: album.id,
      title: album.title,
      cover: album.cover_medium,
      artist: album.artist?.name || "Artista desconhecido"
    }));

  return (
    <div className="p-4">
      {musicas.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-3">Músicas</h2>
          <MusicCard
            resultados={musicas}
            tocarPreview={tocarPreview}
            buscarLetra={buscarLetra}
            setIsPlaying={setIsPlaying}
            setCurrentIndex={setCurrentIndex}
            setPlaylist={setPlaylist}
          />
        </>
      )}

      {albuns.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-6 mb-3">Álbuns</h2>
          <div className="flex flex-wrap gap-4">
            {albuns.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Search;
