// Cartão do Artista
// usado nos carroséis, paginas de pesquisa ou destaques
// Exibe capa, título, artista e botões de ação
import '../styles/artistcard.css';
import { useNavigate } from 'react-router';

function ArtistCard({ artistas = [] }) {
    const navigate = useNavigate();

    const navegarParaArtista = (artista) => {
        navigate(`/artist/${artista.id}`, {
            state: {
                artista,
            }
        });

    }

return (
    <div className="artist-list">
      {artistas.map((artista) => (
        <div key={artista.id} className="artist-card">
          <img src={artista.picture_medium} alt={artista.name} />
          <h3>{artista.name}</h3>
          <button onClick={() => navegarParaArtista(artista)} className="btn-navegarParaArtista"> Ver Perfil</button>
        </div>
      ))}
    </div>
  );
}


export default ArtistCard;