import { useEffect, useRef, useState } from 'react';
import '../styles/player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

function Player({ playlist = [], currentIndex, setCurrentIndex, isPlaying, setIsPlaying }) {
  const audioRef = useRef(null);
  const currentTrack = playlist[currentIndex];

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
      <img src={currentTrack.album.cover_small} alt={currentTrack.title} className="player-cover" />
      <div className="player-info">
        <h4>{currentTrack.title}</h4>
        <p>{currentTrack.artist.name}</p>
      </div>
      <div className="player-controls">
        <button onClick={playPrev}><FontAwesomeIcon icon={faBackward} /></button>
        <button onClick={togglePlay}>
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button onClick={playNext}><FontAwesomeIcon icon={faForward} /></button>
      </div>
    </div>
  );
}

export default Player;
