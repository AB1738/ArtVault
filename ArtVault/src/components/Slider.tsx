import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination,EffectCoverflow,Autoplay } from 'swiper/modules';
import { artObjectStructure } from '../contexts/ArtContext';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


interface artPropType{
    userArt:artObjectStructure[]
}
const Slider = ({userArt}:artPropType) => {
  return (
    <div className="slider-container">
    <Swiper
     navigation
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      spaceBetween={0}
      slidesPerView={4}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}

      pagination={{ clickable: true, dynamicBullets: true }}
      coverflowEffect={{
        rotate: 20,
        stretch: 25,
        depth: 250,
        modifier: 1,
        slideShadows: false,
      }}
      breakpoints={{
        700: {
          spaceBetween: 0,
          slidesPerView: 4,
        },
        500: {
          spaceBetween: 100,
          slidesPerView: 2,
        },
        411: {
          spaceBetween: 100,
          slidesPerView: 2,
        },
        300: {
          spaceBetween: 0,
          slidesPerView: 1,
        },
        
      }}
      modules={[EffectCoverflow, Pagination, Navigation,Autoplay]}

    >
        {userArt.map((art,idx)=>(
         <SwiperSlide key={idx}>
            <img src={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`} alt='' className='slider-img' />
    </SwiperSlide>
        ))}

    </Swiper>
    </div>
  )
}

export default Slider
