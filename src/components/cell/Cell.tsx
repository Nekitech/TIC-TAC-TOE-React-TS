import React, {HTMLProps} from 'react';

const Cell = (props: HTMLProps<any> ) => {
    return (
        <div style={props.style} className={'cell'}></div>
    );
}

export default React.memo(Cell);