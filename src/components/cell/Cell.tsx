import React, {HTMLProps} from 'react';
import styles from './Cell.module.css';

// interface CellActiveProps {
//     x: number;
//     y: number;
//     cell: DOMElement<any, any>;
//     symbol: string;
// }

const Cell = (props: HTMLProps<any> ) => {
    return (
        <div style={props.style} className={styles.cell}>

        </div>
    );
}

export default Cell;