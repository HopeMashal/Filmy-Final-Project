import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router';

import tmdbApi from '../../apis/apiTMDB';
import apiConfig from '../../apis/apiConfig';

const CastList = props => {

    const {category} = useParams();

    const [casts, setCasts] = useState([]);

    useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbApi.credits(category, props.id);
            setCasts(res.cast.slice(0, 5));
        }
        getCredits();
    }, [category, props.id]);
    return (
        <div className="casts">
            {
                casts.map((item, i) => (
                    <div key={i} className="castsItem">
                        <div className="castsItemImg" style={{backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`}}></div>
                        <p className="castsItemName">{item.name}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default CastList;
