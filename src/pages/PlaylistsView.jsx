// Listas de playslist/favoritas
// Lista das playlists criadas pelo usuário
// Cada uma com nome, capa (pode ser uma colagem de capas), botão de abrir

import React from 'react';
import '../styles/playlistsview.css'; // cria um novo CSS ou aproveita o existente
import { useParams } from 'react-router';

function PlaylistView() {
  const { id } = useParams();

  // mock temporário — você vai puxar isso da API depois
  const playlist = {
    title: 'My Favorite Tracks',
    description: 'As mais tocadas na minha semana',
    cover: 'https://via.placeholder.com/250', // depois substitui por API
    owner: 'Gabriel Cardoso',
    tracks: [
      { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20' },
      { id: 2, title: 'Levitating', artist: 'Dua Lipa', duration: '3:23' },
      { id: 3, title: 'bad guy', artist: 'Billie Eilish', duration: '3:14' },
    ],
  };

  return (
    <div className="containerplaylist">
    <div className="playlist-view">
      <div className="playlist-header">
        <img src={playlist.cover} alt="Playlist cover" className="playlist-cover" />
        <div className="playlist-info">
          <p className="playlist-type">Playlist</p>
          <h1 className="playlist-title">{playlist.title}</h1>
          <p className="playlist-description">{playlist.description}</p>
          <p className="playlist-owner">Criada por {playlist.owner}</p>
        </div>
      </div>

      <div className="playlist-tracks">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Música</th>
              <th>Artista</th>
              <th>Duração</th>
            </tr>
          </thead>
          <tbody>
            {playlist.tracks.map((track, index) => (
              <tr key={track.id}>
                <td>{index + 1}</td>
                <td>{track.title}</td>
                <td>{track.artist}</td>
                <td>{track.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default PlaylistView;