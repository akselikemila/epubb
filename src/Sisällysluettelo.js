import React from 'react';

function Sisällysluettelo(props) {
    const luvut = props.sisällys.map((luku) => <li key={luku.id}>{luku.label}</li>)

    return (
        <div>
            <ul>
                {luvut}
            </ul>
        </div>
    )
}

export default Sisällysluettelo