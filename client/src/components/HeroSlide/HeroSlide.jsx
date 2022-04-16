import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button from '../Button/Button';

import tmdbApi, { movieType } from '../../apis/apiTMDB';
import apiConfig from '../../apis/apiConfig';

import './heroSlide.css';

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

import { useTranslation } from 'react-i18next' 

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
      </div>
  );
}

const HeroSlideItem = props => {
  const { t } = useTranslation()

  let hisrory = useHistory();

  const item = props.item;

  const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

  const TakeYear = (date) =>{
    return date.substring(0,4)
  }

  return (
      <div
          className={`heroSlideItem ${props.className}`}
          style={{backgroundImage: `url(${background})`}}
      >
          <div className="heroSlideItemContent container">
              <div className="heroSlideItemContentInfo">
                  <h2 className="title">{item.title}</h2>
                  <div className="overview">
                      <p>{item.overview}</p>
                      <p className='PDetails'>
                        <span className='SomeDetails voteAvg'>
                            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" className="ipc-icon ipc-icon--star-inline" id="iconContext-star-inline" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                            {item.vote_average}
                        </span>
                        <span className='SomeDetails'>{TakeYear(item.release_date)}</span>
                      </p>
                  </div>
                  <div className="btns">
                      <Button onClick={() => hisrory.push('/movie/' + item.id)}>
                        {t('details')}
                      </Button>
                  </div>
              </div>
              <div className="heroSlideItemContentPoster">
                  <img src={apiConfig.w500Image(item.poster_path || item.backdrop_path)} alt="" />
              </div>
          </div>
      </div>
  )
}

export default HeroSlide;

