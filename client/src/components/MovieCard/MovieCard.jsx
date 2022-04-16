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

    const TakeYear = (date) =>{
        return date.substring(0,4)
    }

    return (
        <Link to={link}>
            <div className="movieCard" style={{backgroundImage: `url(${bg})`}}>
                <p className='CardPDetails'>
                    <span className='SomeCardDetails cardVoteAvg'>
                        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" className="ipc-icon ipc-icon--star-inline" id="iconContext-star-inline" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                        {item.vote_average}
                    </span>
                    { item.release_date ? <span className='SomeCardDetails MovieDate'>{TakeYear(item.release_date)}</span> : null}
                </p>
                <Button className="movieCardBtn">
                    <label>&#9654;</label>
                </Button>
            </div>
            <h4 className='movieCardTitle'>{item.title || item.name}</h4>
        </Link>
    );
}

export default MovieCard;
