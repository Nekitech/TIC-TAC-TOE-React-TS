import React from 'react';
const stylesLabel: object = {
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '50px',
    color: 'white',
    textShadow: '0 0 10px black',
}
type Props = {
    winner: string
}

function WinnerLabel(props: Props) {
    return (
        <div style={stylesLabel}>
            {
                props.winner && 'Winner ' + props.winner + ' player'

            }
        </div>
    );
}

export default WinnerLabel;