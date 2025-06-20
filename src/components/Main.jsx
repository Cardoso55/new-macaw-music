// Parte principal da Home, onde vai vir os carrossel e tudo mais
import imagem1 from '../assets/images/1.jpeg';
import imagem2 from '../assets/images/2.png';
import imagem3 from '../assets/images/3.jpeg';
import imagem4 from '../assets/images/4.jpeg';
import imagem5 from '../assets/images/5.jpeg';
import imagem6 from '../assets/images/6.jpeg';
import imagem7 from '../assets/images/7.jpeg';
import imagem8 from '../assets/images/8.jpeg';
import imagem9 from '../assets/images/9.jpeg';
import imagem10 from '../assets/images/10.jpeg';
import imagem11 from '../assets/images/11.jpeg';
import imagem12 from '../assets/images/12.jpeg';
import imagem13 from '../assets/images/13.jpeg';
import imagem14 from '../assets/images/14.jpeg';
import imagem15 from '../assets/images/15.jpeg';

import Search from '../pages/Search';
import '../styles/main.css';

function Main ({ resultados = [] , tocarPreview , buscarLetra}) {
    return (
        <div className="conteiner">
            <div className="playlist-container">
                {resultados?.length === 0 ? (
                <>
                    <div className="playlist">
                        <h1 className="greeting">Boas vindas</h1>
                        <h2 className="session">Navegue por todas as seções</h2>
                    </div>
                    <div className="offer__scroll-container">
                        <div className="offer__list">
                            <section className="offer__list-item">
                                <a href="index.html" className="cards">
                                    <div className="cards card1">
                                        <img src={imagem1} alt="Imagem 1" />
                                        <span>Boas festas</span>
                                    </div>
                                </a>

                                <a href="index.html" className="cards">
                                    <div className="cards card2">
                                        <img src={imagem2} alt="Imagem 2" />
                                        <span>Feitos para você</span>
                                    </div>
                                </a>

                                <a href="index.html" className="cards">
                                    <div className="cards card3">
                                        <img src={imagem3} alt="Imagem 3" />
                                        <span>Lançamentos</span>
                                    </div>
                                </a>

                                <a href="index.html" className="cards">
                                    <div className="cards card4">
                                        <img src={imagem4} alt="Imagem 4" />
                                        <span>Creators</span>
                                    </div>
                                </a>

                                <a href="index.html" className="cards">
                                    <div className="cards card5">
                                        <img src={imagem5} alt="Imagem 5" />
                                        <span>Para treinar</span>
                                    </div>
                                </a>

                                <a href="index.html" className="cards">
                                    <div className="cards card6">
                                        <img src={imagem6} alt="Imagem 6" />
                                        <span>Podcasts</span>
                                    </div>
                                </a>

                                <a href="index.html" className="cards">
                                    <div className="cards card7">
                                        <img src={imagem7} alt="Imagem 7" />
                                        <span>Sertanejo</span>
                                    </div>
                                </a>

                                <a href="index.html" className="cards">
                                    <div className="cards card8">
                                        <img src={imagem8} alt="Imagem 8" />
                                        <span>Samba e pagode</span>
                                    </div>
                                </a>

                                <a href="index.html" className="cards">
                                    <div className="cards card9">
                                        <img src={imagem9} alt="Imagem 9" />
                                        <span>Funk</span>
                                    </div>
                                </a>

                                <a href="index.html" className="cards">
                                    <div className="cards card10">
                                        <img src={imagem10} alt="Imagem 10" />
                                        <span>MPB</span>
                                    </div>
                                </a>

                                <a href="index.html" className="cards">
                                    <div className="cards card11">
                                        <img src={imagem11} alt="Imagem 11" />
                                        <span>Rock</span>
                                    </div>
                                </a>

                                <a href="index.html" className="cards">
                                    <div className="cards card12">
                                        <img src={imagem12} alt="Imagem 12" />
                                        <span>Hip Hop</span>
                                    </div>
                                </a>

                                <a href="index.html" className="cards">
                                    <div className="cards card13">
                                        <img src={imagem13} alt="Imagem 13" />
                                        <span>Indie</span>
                                    </div>
                                </a>

                                <a href="index.html" className="cards">
                                    <div className="cards card14">
                                        <img src={imagem14} alt="Imagem 14" />
                                        <span>Relax</span>
                                    </div>
                                </a>

                                <a href="index.html" className="cards">
                                    <div className="cards card15">
                                        <img src={imagem15} alt="Imagem 15" />
                                        <span>Música Latina</span>
                                    </div>
                                </a>
                            </section>
                        </div>
                    </div>
                </>
                ) : (
                    <Search resultados={resultados || []} tocarPreview={tocarPreview} buscarLetra={buscarLetra}/>
                )}
            </div>
        </div>
    )
}

export default Main;