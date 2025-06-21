// Parte principal da Home, onde vai vir os carrossel e tudo mais

import Carousel from './Carousel';
import Search from '../pages/Search';
import '../styles/main.css';

function Main ({ resultados = [] , aleatorias , musicasPorGenero , tocarPreview , buscarLetra, setPlaylist, setCurrentIndex, setIsPlaying}) {
    return (
        <div className="conteiner">
            <div className="playlist-container">
                {resultados?.length === 0 ? (
                <>
                    {Object.entries(musicasPorGenero).map(([genero, musicas]) => (
                        <section key={genero}>
                            <h2>{genero}</h2>
                            <Carousel
                            resultados={musicas}
                            setPlaylist={setPlaylist}
                            setCurrentIndex={setCurrentIndex}
                            setIsPlaying={setIsPlaying}
                            tocarPreview={(url) => {
                                setIsPlaying(true);
                                // etc...
                            }}
                            />
                        </section>
                    ))}

                </>
                ) : (
                    <Search 
                        resultados={resultados || []} 
                        tocarPreview={tocarPreview} 
                        buscarLetra={buscarLetra}
                        setPlaylist={setPlaylist}
                        setCurrentIndex={setCurrentIndex}
                        setIsPlaying={setIsPlaying}
                    />
                )}
            </div>
        </div>
    )
}

export default Main;