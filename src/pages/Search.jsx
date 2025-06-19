// Resultados da busca
// Usa o SearchBar
// Mostra resultados por:
// Músicas
// Artistas
// Álbuns
// Pode ter tabs ou filtros por tipo de resultado

import MusicCard from "../components/MusicCard";

function Search({resultados = [] , tocarPreview , buscarLetra}) {
    return (
        <div>
            <MusicCard resultados={resultados || []} tocarPreview={tocarPreview} buscarLetra={buscarLetra} />
        </div>
    )
}

export default Search;