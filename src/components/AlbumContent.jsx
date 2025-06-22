import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/album.css";

function AlbumContent({ setPlaylist, setCurrentIndex, setIsPlaying }) {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const callbackName = `jsonp_callback_${Date.now()}`;

    window[callbackName] = (data) => {
      try {
        if (data.error) {
          throw new Error(data.error.message || "Erro ao carregar álbum");
        }

        setAlbum({
          id: data.id,
          title: data.title,
          artist: data.artist.name,
          cover: data.cover_medium,
          tracks: data.tracks.data.map((track) => ({
            id: track.id,
            title: track.title,
            preview: track.preview,
            duration: track.duration,
            album: {
              id: data.id,
              cover_small: data.cover_small,
              cover: data.cover_medium,
            },
            artist: { name: data.artist.name },
          })),
        });
      } catch (error) {
        console.error("Erro no JSONP Deezer:", error);
        setErro(true);
      } finally {
        delete window[callbackName];
        const script = document.getElementById(callbackName);
        if (script) script.remove();
      }
    };

    const script = document.createElement("script");
    script.src = `https://api.deezer.com/album/${id}?output=jsonp&callback=${callbackName}`;
    script.id = callbackName;

    script.onerror = () => {
      console.error("Erro ao carregar o script JSONP do álbum.");
      setErro(true);
      delete window[callbackName];
      const script = document.getElementById(callbackName);
      if (script) script.remove();
    };

    document.body.appendChild(script);

    return () => {
      delete window[callbackName];
      const script = document.getElementById(callbackName);
      if (script) script.remove();
    };
  }, [id]);

  const playTrack = (trackIndex) => {
    if (!album || !album.tracks) return;

    setPlaylist(album.tracks);
    setCurrentIndex(trackIndex);
    setIsPlaying(true);
  };

  if (erro) {
    return (
      <div className="p-6 text-center text-red-600 text-lg">
        Erro ao carregar o álbum. Verifique o link ou tente novamente mais tarde.
      </div>
    );
  }

  if (!album) {
    return (
      <div className="p-6 text-center text-lg text-gray-600">
        Carregando álbum...
      </div>
    );
  }

  return (
    <div className="album-page">
      <div className="album-header">
        <img src={album.cover} alt={album.title} />
        <div className="album-info">
          <h1>{album.title}</h1>
          <p>{album.artist}</p>
        </div>
      </div>

      <h2 className="tracklist">Músicas</h2>
      <ul className="tracklist">
        {album.tracks.map((track, index) => (
          <li key={track.id}>
            <div>
              <p className="track-title">{track.title}</p>
              <p className="track-duration">
                {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, "0")}
              </p>
            </div>
            <button className="play-button" onClick={() => playTrack(index)}>
              Ouvir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlbumContent;
