import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../apis/apiTMDB';
import apiConfig from '../../apis/apiConfig';

import './details.css';
import CastList from './CastList';
import VideoList from './VideoList';

import MovieList from '../../components/MovieList/MovieList';

import { useTranslation } from 'react-i18next'

const Detail = () => {

    const { category, id } = useParams();

    const [item, setItem] = useState(null);

    const { t } = useTranslation();

    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}});
            setItem(response);
            window.scrollTo(0,0);
        }
        getDetail();
    }, [category, id]);

    return (
        <>
            {
                item && (
                    <>
                        <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                        <div className="mb-3 movieContent container">
                            <div className="movieContentPoster">
                                <div className="movieContentPosterImg" style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}></div>
                            </div>
                            <div className="movieContentInfo">
                                <h1 className="titleDetails">
                                    {item.title || item.name}
                                </h1>
                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0, 5).map((genre, i) => (
                                            <span key={i} className="genresItem">{genre.name}</span>
                                        ))
                                    }
                                </div>
                                <p className="overviewDetails">{item.overview}</p>
                                <div className="cast">
                                    <div className="sectionHeader">
                                        <h2>{t('casts')}</h2>
                                    </div>
                                    <CastList id={item.id}/>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <VideoList id={item.id}/>
                            </div>
                            <div className="section mb-3">
                                <div className="sectionHeader mb-2">
                                    <h2>{t('similar')}</h2>
                                </div>
                                <MovieList category={category} type="similar" id={item.id}/>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
}

export default Detail;
