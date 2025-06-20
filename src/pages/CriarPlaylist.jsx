import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/criarplaylist.css"

const CriarPlaylist = () => {
  const [nome, setNome] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const playlists = JSON.parse(localStorage.getItem("playlists")) || [];
    playlists.push({ nome, musicas: [] });
    localStorage.setItem("playlists", JSON.stringify(playlists));
    navigate("/playlists");
  };

  return (
    <form onSubmit={handleSubmit} className="criar-playlist-form">
      <input
        type="text"
        placeholder="Nome da playlist"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <button type="submit">Criar</button>
    </form>
  );
};

export default CriarPlaylist;
