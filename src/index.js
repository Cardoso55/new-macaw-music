import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App';
import Home from './pages/Home';
import Search from './pages/Search';
import Artist from './pages/Artist';
import Album from './pages/Album';
import Playlists from './pages/Playslist';
import PlaylistView from './pages/PlaylistsView';
import History from './pages/History';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Register from './pages/Register.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Sidebar/>}/>
        <Route path="/search" element={<Search />} />
        <Route path="/artist/:id" element={<Artist />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlist/:id" element={<PlaylistView />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

