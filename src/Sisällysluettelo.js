import React from 'react';

import './Sisällysluettelo.css';

function Sisällysluettelo(props) {
    function sisällysHelper(luku) {
        let aliluvut = luku.children.length > 0 ? <ul>{luku.children.map(sisällysHelper)}</ul> : null
        return (
            <li key={luku.id}>
                <a href={luku.href} onClick={props.lukuValittu}>{luku.label}</a>
                {aliluvut !== null && aliluvut}
            </li>
        )
    }

    const luvut = props.sisällys.map(sisällysHelper)

    return (
        <div className="sisallys">
            <ul>
                {luvut}
            </ul>
        </div>
    )
}

export default Sisällysluettelo