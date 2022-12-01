import React, {ReactElement, useEffect, useRef} from 'react';
import styles from './Field.module.css';
import {amountCells, condWin, fieldSize, gap, widthCell} from "../../game/constants";
import Cell from "../cell/Cell";
import CoordsAxis from "../coordsAxis/CoordsAxis";
import {cellActiveProps, getWinnerT} from "../../game/interfaces";
import {players} from "../../game/globalVariables";
import {changeCurrPlayer, checkCondition, getSymbol, setSymbol} from "../../game/gameModel";
import BtnReload from "../../UI/btnReload/BtnReload";

function Field({frameLeft, frameTop, getWinner}: { frameLeft: number, frameTop: number, getWinner: getWinnerT }) {
    const field = useRef<HTMLDivElement>(null);
    const center = useRef<HTMLDivElement>(null);
    const leftTopCell = (center.current) ? center.current.children[0] as HTMLDivElement : null;

    const [arrayActiveCells, setArrayActiveCells] = React.useState<cellActiveProps>({});
    const [currPlayer, setCurrPlayer] = React.useState(players['x']);

    const [isDown, setIsDown] = React.useState(false);

    const fieldHTML = field.current as HTMLElement;
    const centerHTML = center.current as HTMLElement;

    useEffect(() => {
        if (fieldHTML) {
            fieldHTML.oncontextmenu = () => false;
            fieldHTML.style.width = `${fieldSize + 4 * widthCell}px`;
            fieldHTML.style.height = `${fieldSize + 4 * widthCell}px`;
            fieldHTML.style.transform = `translate(${-widthCell * 2}px, ${-widthCell * 2}px)`;
        }
    }, [fieldHTML]);

    const [coordsField, setCoordsField] = React.useState({x: 0, y: 0});
    const [switchAxis, setSwitchAxis] = React.useState({x: 0, y: 0});

    interface coordsCenterAxios {
        x: number;
        y: number;
    }

    const coordsCenterAxios: coordsCenterAxios = {x: 0, y: 0};

    console.log('renderField');
    const renderField = React.useMemo(() => {
        const cells: ReactElement[] = [];
        if (leftTopCell) {
            coordsCenterAxios.x = -(frameLeft - leftTopCell.getBoundingClientRect().x)
            coordsCenterAxios.y = frameTop - leftTopCell.getBoundingClientRect().y
        }
        if (
            coordsCenterAxios.y <= widthCell * switchAxis.y ||
            coordsCenterAxios.x <= widthCell * switchAxis.x ||
            coordsCenterAxios.y > widthCell * switchAxis.y ||
            coordsCenterAxios.x > widthCell * switchAxis.x
        ) {
            for (let i = 0; i < amountCells + 2; i++) {
                for (let j = 0; j < amountCells + 2; j++) {
                    cells.push(
                        <Cell
                            key={`${i}:${j}`}
                            center={centerHTML}
                            arrayActiveCells={arrayActiveCells}
                            style={{
                                top: i * gap + i * widthCell,
                                left: j * gap + j * widthCell,
                                width: widthCell,
                                height: widthCell,
                                fontSize: widthCell,
                                transform: `translate(${widthCell * -switchAxis.x}px, ${widthCell * -switchAxis.y}px)`
                            }} className={'cell'}/>)
                }
            }
        }
        return cells
    }, [arrayActiveCells, switchAxis.y, switchAxis.x, coordsCenterAxios.y, coordsCenterAxios.x]);

    return (
        <>
            <div onMouseDown={(e) => {
                e.preventDefault();
                if (e.buttons !== 2) return;
                centerHTML.style.cursor = "grab";
                setIsDown(true);
            }}
                 onMouseUp={(e) => {
                     e.preventDefault();
                     centerHTML.style.cursor = "pointer";
                     setIsDown(false);
                 }}
                 onMouseMove={(e) => {
                     e.preventDefault();
                     if (!isDown) return
                     setCoordsField({
                         y: coordsField.y += e.movementY,
                         x: coordsField.x += e.movementX
                     });
                     setSwitchAxis({
                         y: Math.floor(coordsField.y / widthCell),
                         x: Math.floor(coordsField.x / widthCell)
                     });
                     centerHTML.style.transform = `translate(${coordsField.x}px, ${coordsField.y}px)`;

                 }}
                 onClick={(e) => {
                     e.preventDefault();
                     if (e.buttons !== 0) return;
                     const target = e.target as HTMLElement;
                     const activeCellX = -Math.floor(
                         (centerHTML.getBoundingClientRect().left - target.getBoundingClientRect().left) / widthCell
                     );
                     const activeCellY = -Math.floor(
                         (centerHTML.getBoundingClientRect().top - target.getBoundingClientRect().top) / widthCell
                     );
                     //check double click
                     if (!!getSymbol(activeCellX, activeCellY, arrayActiveCells)) return;
                     setArrayActiveCells(setSymbol(activeCellX, activeCellY, {...arrayActiveCells}, currPlayer));

                     if (checkCondition(activeCellX, activeCellY, arrayActiveCells, condWin, players, currPlayer)) {
                         getWinner(currPlayer);
                         setCurrPlayer(players['x']);
                         fieldHTML.style.pointerEvents = "none";
                     } else {
                         setCurrPlayer(changeCurrPlayer(currPlayer, players));
                     }
                 }}

                 ref={field} className={styles.field}>
                <CoordsAxis refCenter={center}>
                    {renderField}
                </CoordsAxis>
            </div>
            <BtnReload onClick={() => {
                // clearActiveCells(arrayCells);
                setArrayActiveCells({})
                fieldHTML.style.pointerEvents = "auto";
                getWinner('');
            }}/>
        </>
    )
}

export default Field;