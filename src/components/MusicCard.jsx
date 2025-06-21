// Cartão de música
// usado nos carroséis, paginas de pesquisa ou destaques
// Exibe capa, título, artista e botões de ação
import '../styles/musiccard.css';

function MusicCard({resultados = [] , tocarPreview , buscarLetra , setIsPlaying, setPlaylist, setCurrentIndex}) {

    return(
        <div className="grid-container">
            {resultados.map((track, i) => (
                <div className="music-card" key={i}>
                    <div className="card-img">
                        <img className="music-img" src={track.album.cover_big} alt={track.title} />
                        <div className="play">
                            <button onClick={() => {
                                setPlaylist(resultados);
                                setCurrentIndex(i);
                                setIsPlaying(true);
                            }}>
                                <span className="fas fa-play"></span>
                            </button>
                        </div>
                    </div>
                    <div className="card-text">
                        <a title={track.title} className="vst" href="index.html"></a>
                        <span className="music-name">{track.title}</span>
                        <span className="music-categorie">
                            {track.artist.name} - {track.album.title}
                        </span>
                        <button onClick={() => buscarLetra(track.artist.name, track.title)} className="btn-letra">
                            Ver Letra
                        </button>
                    </div>
                </div>
                ))}
        </div>
    );
}

export default MusicCard;