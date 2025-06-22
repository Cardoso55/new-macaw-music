import { useEffect } from 'react';
import '../styles/player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';

function Player({ playlist = [], currentIndex, setCurrentIndex, isPlaying, setIsPlaying, audioRef }) {
  const currentTrack = playlist[currentIndex];

  // Troca de música
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    const player = audioRef.current;

    if (player.src !== currentTrack.preview) {
      player.pause();
      player.src = currentTrack.preview;
      player.load();
    }
  }, [currentTrack]);

  // Play/pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn('🔇 Erro ao tentar dar play:', err.message);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
  const player = audioRef.current;
  if (!player) return;

  const handleEnded = () => {
    playNext();
  };

  player.addEventListener('ended', handleEnded);

  return () => {
    player.removeEventListener('ended', handleEnded); // limpa o listener quando muda
  };
}, [audioRef, currentIndex, playlist]);


  const togglePlay = () => {
    const player = audioRef.current;
    if (!player) return;

    if (player.paused) {
      player.play().catch(err => {
        console.warn('🔇 Erro ao dar play manual:', err.message);
      });
      setIsPlaying(true);
    } else {
      player.pause();
      setIsPlaying(false);
    }
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
