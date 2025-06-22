import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "../styles/album.css";

function AlbumContent() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const audioRef = useRef(null);

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
          })),
        });
      } catch (error) {
        console.error(error);
      } finally {
        delete window[callbackName];
        const existingScript = document.getElementById(callbackName);
        if (existingScript) existingScript.remove();
      }
    };

    const script = document.createElement("script");
    script.src = `https://api.deezer.com/album/${id}?output=jsonp&callback=${callbackName}`;
    script.id = callbackName;

    script.onerror = () => {
      console.error("Erro ao carregar script JSONP do álbum.");
      setAlbum(null);
      delete window[callbackName];
    };

    document.body.appendChild(script);

    return () => {
      delete window[callbackName];
      const existingScript = document.getElementById(callbackName);
      if (existingScript) existingScript.remove();
    };
  }, [id]);

  const playTrack = (track) => {
    setCurrentTrack(track);
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  };

  if (!album) return <p className="p-6 text-center text-lg">Carregando álbum...</p>;

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
        {album.tracks.map((track) => (
          <li key={track.id}>
            <div>
              <p className="track-title">{track.title}</p>
              <p className="track-duration">
                {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, "0")}
              </p>
            </div>
            <button className="play-button" onClick={() => playTrack(track)}>
              Ouvir
            </button>
          </li>
        ))}
      </ul>

      {currentTrack && (
        <div className="player-bar">
          <p>{currentTrack.title} - Prévia</p>
          <audio ref={audioRef} controls>
            <source src={currentTrack.preview} type="audio/mpeg" />
            Seu navegador não suporta áudio.
          </audio>
        </div>
      )}
    </div>
  );
}

export default AlbumContent;
