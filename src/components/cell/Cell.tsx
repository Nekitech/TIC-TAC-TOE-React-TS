import React from 'react';
import {getSymbol} from "../../game/gameModel";

const Cell = (props: any) => {
    const cellRef = React.useRef<HTMLDivElement>(null);
    let currCellCoords = {x: 0, y: 0};

    if (cellRef.current && props.center) {
        currCellCoords.x = -Math.floor(
            (props.center.getBoundingClientRect().left -
                cellRef.current.getBoundingClientRect().left) /
            props.style.width
        );
        currCellCoords.y = -Math.floor(
            (props.center.getBoundingClientRect().top -
                cellRef.current.getBoundingClientRect().top) /
            props.style.width
        )
    }

    const symbol = getSymbol(currCellCoords.x, currCellCoords.y, props.arrayActiveCells)

return (
    <div ref={cellRef} style={props.style} className={(symbol) ? 'cell cellActive' : 'cell'}>
        {symbol}
    </div>
);
}

export default Cell;