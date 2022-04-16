import React from 'react';
import { Link } from 'react-router-dom';

import { OutlineButton } from '../../components/Button/Button';
import HeroSlide from '../../components/HeroSlide/HeroSlide';
import MovieList from '../../components/MovieList/MovieList';

import { category, movieType, tvType } from '../../apis/apiTMDB';

import { useTranslation } from 'react-i18next'

const Home = () => {

    const { t } = useTranslation()

    return (
        <>
            <HeroSlide/>
            <div className="container">
                <div className="section mb-3">
                    <div className="sectionHeader mb-2">
                        <h2>{t('trending-movies')}</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">{t('view-more')}</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.popular}/>
                </div>

                <div className="section mb-3">
                    <div className="sectionHeader mb-2">
                        <h2>{t('top-rated-movies')}</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">{t('view-more')}</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.top_rated}/>
                </div>

                <div className="section mb-3">
                    <div className="sectionHeader mb-2">
                        <h2>{t('trending-tv')}</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">{t('view-more')}</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular}/>
                </div>

                <div className="section mb-3">
                    <div className="sectionHeader mb-2">
                        <h2>{t('top-rated-tv')}</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">{t('view-more')}</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.top_rated}/>
                </div>
            </div>
        </>
    );
}

export default Home;

