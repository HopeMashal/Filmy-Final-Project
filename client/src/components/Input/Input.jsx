import React from 'react';

import './input.css';

const Input = props => {
    return (
        <input
            className='inputSearch'
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange ? (e) => props.onChange(e) : null}
        />
    );
}

export default Input;