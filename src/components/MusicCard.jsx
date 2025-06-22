import { useState, useEffect } from 'react';
import './Searchbar';
import '../styles/musiccard.css';

function MusicCard({ resultados = [], tocarPreview, buscarLetra, setIsPlaying, setPlaylist, setCurrentIndex }) {
    const [mostrarDropdown, setMostrarDropdown] = useState(null); // controla o dropdown por música
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("playlists")) || [];
        setPlaylists(stored);
    }, []);

    const adicionarMusicaNaPlaylist = (playlistIndex, track) => {
        if (
            !track ||
            !track.title ||
            !track.artist ||
            !track.artist.name ||
            !track.album ||
            !track.album.cover_medium ||
            !track.duration
        ) {
            console.error("Erro: Track com dados incompletos ao tentar adicionar na playlist:", track);
            alert("Erro ao adicionar música: os dados da música estão incompletos.");
            return;
        }

        const novaMusica = {
            titulo: track.title,
            artista: track.artist.name,
            preview: track.preview,
            capa: track.album.cover_medium,
            duracao: track.duration,
            albumId: track.album.id
        };

        const updatedPlaylists = [...playlists];
        updatedPlaylists[playlistIndex].musicas.push(novaMusica);

        localStorage.setItem("playlists", JSON.stringify(updatedPlaylists));
        setPlaylists(updatedPlaylists);
        setMostrarDropdown(null);

        alert(`Música "${track.title}" adicionada à playlist "${updatedPlaylists[playlistIndex].nome}"!`);
    };

    return (
        <div className="grid-container">
            {resultados.map((track, i) => (
                <div className="music-card" key={i}>
                    <div className="card-img">
                        <img className="music-img" src={track.album.cover_big} alt={track.title} />
                        <div className="play">
                            <button
                                onClick={() => {
                                    setPlaylist(resultados);
                                    setCurrentIndex(i);
                                    setIsPlaying(true);
                                }}
                            >
                                <span className="fas fa-play"></span>
                            </button>
                        </div>
                    </div>

                    <div className="card-text">
                        <span className="music-name">{track.title}</span>
                        <span className="music-categorie">
                            {track.artist.name} - {track.album.title}
                        </span>

                        <button onClick={() => buscarLetra(track.artist.name, track.title)} className="btn-letra">
                            Ver Letra
                        </button>

                        <button
                            onClick={() => setMostrarDropdown(mostrarDropdown === i ? null : i)}
                            className="btn-letra"
                        >
                            Adicionar à Playlist
                        </button>

                        {mostrarDropdown === i && (
                            <ul className="dropdown-playlists">
                                {playlists.map((p, idx) => (
                                    <li key={idx}>
                                        <button onClick={() => adicionarMusicaNaPlaylist(idx, track)}>
                                            {p.nome}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MusicCard;
