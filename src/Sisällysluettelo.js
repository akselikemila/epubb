import React from 'react';

function Sisällysluettelo(props) {
    const listaItemit = props.sisällys.map((itemi) => <li key={itemi.id}>{itemi.label}</li>)

    return (
        <div>
            <ul>
                {listaItemit}
            </ul>
        </div>
    )
}

export default Sisällysluettelo