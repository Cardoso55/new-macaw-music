// Componente de carrossel horizontal
// Renderiza os cards (Músicas, artistas, etc.) 
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FreeMode, Pagination , Navigation } from 'swiper/modules';
import '../styles/carousel.css';

function Carousel( {resultados = [] , tocarPreview } ){
    console.log(resultados)
    return (
        <div className="carousel-container">
            <Swiper
                modules={[FreeMode, Pagination, Navigation]}
                spaceBetween={16}
                slidesPerView={'auto'}
                freeMode={true}
                grabCursor={true}
                pagination={false}
                navigation={true}
            >
            {resultados.map((track, i) => (
                <SwiperSlide key={i} style={{ width: '200px' }}>
                    <div className="carousel-item">
                        <div className="card-img">
                            <img src={track.album.cover_medium} alt={track.title} style={{ width: '100%', borderRadius: '8px' }} />
                            <div className="play">
                                <button onClick={() => tocarPreview(track.preview)}>
                                    <span className="fas fa-play"></span>
                                </button>
                            </div>
                        </div>
                        <div className="card-text">
                            <p className="music-name">{track.title}</p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>
  );
}

export default Carousel;