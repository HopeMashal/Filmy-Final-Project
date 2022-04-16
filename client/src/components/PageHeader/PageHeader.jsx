import React from 'react';

import './pageHeader.css';

const PageHeader = props => {
    return (
        <div className="pageHeader">
            <h1>{props.children}</h1>
        </div>
    );
}


export default PageHeader;