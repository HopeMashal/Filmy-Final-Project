import React from 'react';

import './movieCard.css';

import { Link } from 'react-router-dom';

import Button from '../Button/Button';

import { category } from '../../apis/apiTMDB';
import apiConfig from '../../apis/apiConfig';

const MovieCard = props => {

    const item  = props.item;

    const link = '/' + category[props.category] + '/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

    return (
        <Link to={link}>
            <div className="movieCard" style={{backgroundImage: `url(${bg})`}}>
                <Button className="movieCardBtn">
                    <label>&#9654;</label>
                </Button>
            </div>
            <h4 className='movieCardTitle'>{item.title || item.name}</h4>
        </Link>
    );
}

export default MovieCard;
