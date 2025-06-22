// Resultados da busca
// Usa o SearchBar
// Mostra resultados por:
// Músicas
// Artistas
// Álbuns
// Pode ter tabs ou filtros por tipo de resultado

import ArtistCard from "../components/ArtistCard";
import MusicCard from "../components/MusicCard";

function Search({resultados = [] , tocarPreview , buscarLetra , setIsPlaying ,setCurrentIndex, setPlaylist, artistas = [] , topMusicas}) {
    return (
        <div>
            <MusicCard 
                resultados={resultados || []}  
                tocarPreview={tocarPreview} 
                buscarLetra={buscarLetra} 
                setIsPlaying={setIsPlaying} 
                setCurrentIndex={setCurrentIndex} 
                setPlaylist={setPlaylist}
            />
            <ArtistCard
                artistas={artistas}
                topMusicas={topMusicas}
            />
        </div>
    )
}

export default Search;