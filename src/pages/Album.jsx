import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

function Album() {
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
          tracks: data.tracks.data.map(track => ({
            id: track.id,
            title: track.title,
            preview: track.preview,
            duration: track.duration,
          })),
        });
      } catch (error) {
        console.error(error);
      } finally {
        // Limpa o callback pra evitar vazamento de memória
        delete window[callbackName];
        // Remove o script JSONP da página
        const script = document.getElementById(callbackName);
        if (script) script.remove();
      }
    };

    const script = document.createElement("script");
    script.src = `https://api.deezer.com/album/${id}?output=jsonp&callback=${callbackName}`;
    script.id = callbackName;
    document.body.appendChild(script);

    // Cleanup se o componente desmontar antes de responder
    return () => {
      delete window[callbackName];
      if (document.getElementById(callbackName)) {
        document.getElementById(callbackName).remove();
      }
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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex gap-6 mb-6">
        <img src={album.cover} alt={album.title} className="w-60 h-60 rounded-xl object-cover" />
        <div>
          <h1 className="text-3xl font-bold">{album.title}</h1>
          <p className="text-xl text-gray-600">{album.artist}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Músicas</h2>
      <ul className="space-y-2">
        {album.tracks.map((track) => (
          <li
            key={track.id}
            className="flex justify-between items-center bg-white p-3 rounded-xl shadow hover:shadow-lg transition-all"
          >
            <div>
              <p className="font-medium">{track.title}</p>
              <p className="text-xs text-gray-500">
                {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, "0")}
              </p>
            </div>
            <button
              onClick={() => playTrack(track)}
              className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700"
            >
              Ouvir
            </button>
          </li>
        ))}
      </ul>

      {currentTrack && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg px-6 py-3 w-[90%] max-w-xl flex items-center justify-between">
          <div>
            <p className="font-semibold">{currentTrack.title}</p>
            <p className="text-sm text-gray-500">Prévia</p>
          </div>
          <audio ref={audioRef} controls className="w-60">
            <source src={currentTrack.preview} type="audio/mpeg" />
            Seu navegador não suporta áudio.
          </audio>
        </div>
      )}
    </div>
  );
}

export default Album;
