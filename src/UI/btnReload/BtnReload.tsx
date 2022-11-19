import React, {HTMLProps} from 'react';
const stylesBtnReload: object = {
    position: 'fixed',
    bottom: '0',
    right: '0',
    fontSize: '30px',
    padding: '10px 20px',
    cursor: 'pointer',
    zIndex: 100,
}

function BtnReload(props: HTMLProps<any>) {
    return (
        <button style={stylesBtnReload} onClick={props.onClick}>Reload</button>
    );
}

export default BtnReload;