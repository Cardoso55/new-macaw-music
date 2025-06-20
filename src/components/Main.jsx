// Parte principal da Home, onde vai vir os carrossel e tudo mais

import Carousel from './Carousel';
import Search from '../pages/Search';
import '../styles/main.css';

function Main ({ resultados = [] , aleatorias , musicasPorGenero , tocarPreview , buscarLetra}) {
    return (
        <div className="conteiner">
            <div className="playlist-container">
                {resultados?.length === 0 ? (
                <>
                    {Object.entries(musicasPorGenero).map(([genero, tracks]) => (
                    <div key={genero}>
                        <h2>{genero.toUpperCase()}</h2>
                        <Carousel resultados={tracks} tocarPreview={tocarPreview} />
                    </div> 
                ))}

                </>
                ) : (
                    <Search resultados={resultados || []} tocarPreview={tocarPreview} buscarLetra={buscarLetra}/>
                )}
            </div>
        </div>
    )
}

export default Main;