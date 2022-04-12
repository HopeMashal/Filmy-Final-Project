import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button, { OutlineButton } from '../Button/Button';
import Modal, { ModalContent } from '../Modal/Modal';

import tmdbApi, { category, movieType } from '../../apis/apiTMDB';
import apiConfig from '../../apis/apiConfig';

import './heroSlide.css';

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const HeroSlide = () => {

  SwiperCore.use([Autoplay]);

  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
      const getMovies = async () => {
          const params = {page: 1}
          try {
              const response = await tmdbApi.getMoviesList(movieType.popular, {params});
              setMovieItems(response.results.slice(0, 5));
              console.log(response);
          } catch {
              console.log('error');
          }
      }
      getMovies();
  }, []);

  return (
      <div className="heroSlide">
          <Swiper
              modules={[Autoplay]}
              grabCursor={true}
              spaceBetween={0}
              slidesPerView={1}
          >
              {
                  movieItems.map((item, i) => (
                      <SwiperSlide key={i}>
                          {({ isActive }) => (
                              <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                          )}
                      </SwiperSlide>
                  ))
              }
          </Swiper>
          {
              movieItems.map((item, i) => <TrailerModal key={i} item={item}/>)
          }
      </div>
  );
}

const HeroSlideItem = props => {

  let hisrory = useHistory();

  const item = props.item;

  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

  const setModalActive = async () => {
      const modal = document.querySelector(`#modal_${item.id}`);

      const videos = await tmdbApi.getVideos(category.movie, item.id);

      if (videos.results.length > 0) {
          const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
          modal.querySelector('.modalContent > iframe').setAttribute('src', videSrc);
      } else {
          modal.querySelector('.modalContent').innerHTML = 'No trailer';
      }

      modal.classList.toggle('active');
  }

  return (
      <div
          className={`heroSlideItem ${props.className}`}
          style={{backgroundImage: `url(${background})`}}
      >
          <div className="heroSlideItemContent container">
              <div className="heroSlideItemContentInfo">
                  <h2 className="title">{item.title}</h2>
                  <div className="overview">{item.overview}</div>
                  <div className="btns">
                      <Button onClick={() => hisrory.push('/movie/' + item.id)}>
                          Watch now
                      </Button>
                      <OutlineButton onClick={setModalActive}>
                          Watch trailer
                      </OutlineButton>
                  </div>
              </div>
              <div className="heroSlideItemContentPoster">
                  <img src={apiConfig.w500Image(item.poster_path)} alt="" />
              </div>
          </div>
      </div>
  )
}

const TrailerModal = props => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute('src', '');

  return (
      <Modal active={false} id={`modal_${item.id}`}>
          <ModalContent onClose={onClose}>
              <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
          </ModalContent>
      </Modal>
  )
}

export default HeroSlide;

