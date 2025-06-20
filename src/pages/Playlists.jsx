import { useParams } from "react-router-dom";

const Playlist = () => {
  const { id } = useParams();
  const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
  const playlist = playlists[id];

  const tocarPreview = (url) => {
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div className="playlist-page">
      <h2>{playlist?.nome || "Playlist"}</h2>
      {playlist?.musicas.length ? (
        <ul className="musica-lista">
          {playlist.musicas.map((musica, index) => (
            <li key={index}>
              <span>{musica.titulo} - {musica.artista}</span>
              <button onClick={() => tocarPreview(musica.preview)}>▶</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Essa playlist ainda não tem músicas.</p>
      )}
    </div>
  );
};

export default Playlist;

