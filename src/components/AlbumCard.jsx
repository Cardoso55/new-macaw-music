// Cartão do Album
// usado nos carroséis, paginas de pesquisa ou destaques
// Exibe capa, título, artista e botões de ação

// components/AlbumCard.jsx
import { Link } from "react-router-dom";

export default function AlbumCard({ album }) {
  return (
    <Link to={`/album/${album.id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-4 w-60">
        <img
          src={album.cover}
          alt={album.title}
          className="rounded-xl w-full h-60 object-cover mb-3"
        />
        <h3 className="text-lg font-semibold truncate">{album.title}</h3>
        <p className="text-sm text-gray-500 truncate">{album.artist}</p>
      </div>
    </Link>
  );
}
