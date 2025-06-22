import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

function PlaylistPlayer({ playlist, currentIndex, setCurrentIndex, isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1); // Volume vai de 0.0 a 1.0
  const currentTrack = playlist[currentIndex];


  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentTrack, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsPlaying(true);
    }
  };

  const playNext = () => {
    if (currentIndex < playlist.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(true);
    }
  };

  if (!currentTrack) return null;

  return (
    <div className="player-container">
      <audio ref={audioRef} src={currentTrack.preview} onEnded={playNext} />

      <img
        src={currentTrack.capa}
        alt={currentTrack.titulo}
        className="player-cover"
      />

     <div className="player-info">
  {currentTrack.albumId ? (
    <Link to={`/album/${currentTrack.albumId}`} className="track-title-link">
      {currentTrack.titulo}
    </Link>
  ) : (
    <h4>{currentTrack.titulo}</h4>
  )}
  <p>{currentTrack.artista}</p>
</div>


      <div className="player-controls">
        <button onClick={playPrev}><FontAwesomeIcon icon={faBackward} /></button>
        <button onClick={togglePlay}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        
        <button onClick={playNext}><FontAwesomeIcon icon={faForward} /></button>
      </div>

      <div className="volume-control">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}

export default PlaylistPlayer;
