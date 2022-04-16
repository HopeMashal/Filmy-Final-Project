import React from 'react';

import { useParams } from 'react-router';

import PageHeader from '../../components/PageHeader/PageHeader';

import { category as cate } from '../../apis/apiTMDB';
import MovieGrid from '../../components/MovieGrid/MovieGrid';

import { useTranslation } from 'react-i18next'

const Catalog = () => {

    const { category } = useParams();

    const { t } = useTranslation()

    return (
        <>
            <PageHeader>
                {category === cate.movie ? `${t('movie-text')}` : `${t('tv-series-text')}`}
            </PageHeader>
            <div className="container">
                <div className="section mb-3">
                    <MovieGrid category={category}/>
                </div>
            </div>
        </>
    );
}

export default Catalog;

