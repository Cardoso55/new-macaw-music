// Barra de busca para pesquisar músicas, artistas ou álbuns. Aparece no header e em outros lugares
// Exibe sugestões de pesquisa enquanto o usuário digita
import search from '../assets/icons/search.png';


import '../styles/reset.css';
import '../styles/searchbar.css';


function Searchbar ({query, setQuery, buscarMusica, buscarArtista}){
    console.log('query:', query);
    console.log('setQuery:', setQuery); // ← isso aqui deve ser uma função
    console.log('buscarMusica:', buscarMusica);

    return(
        <div className="header__search">
            <img src={search} alt="Procurar" />
            <input
                type="text"
                maxLength="800"
                placeholder="O que você quer ouvir?"
                value={query}
                onChange={(e) => {
                const val = e.target.value;
                setQuery(val);
                buscarMusica(val);
                buscarArtista(val);
                }}
            />
        </div>
    )
}

export default Searchbar;  