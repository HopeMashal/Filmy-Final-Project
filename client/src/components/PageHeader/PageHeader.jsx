import React from 'react';

import './pageHeader.css';

const PageHeader = props => {
    return (
        <div className="pageHeader">
            <h2>{props.children}</h2>
        </div>
    );
}


export default PageHeader;