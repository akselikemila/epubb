import React from 'react';

import './Virhe.css';

function Virhe(props) {
    return (
        <div className="virhe">
            <h3>Virhe</h3>
            <p>{props.viesti}</p>
        </div>
    )
}

export default Virhe