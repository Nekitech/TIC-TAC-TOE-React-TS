import React, {ReactElement, useEffect, useRef} from 'react';
import styles from './Field.module.css';
import {amountCells, condWin, fieldSize, gap} from "../../game/constants";
import Cell from "../cell/Cell";
import CoordsAxis from "../coordsAxis/CoordsAxis";
import {cellActiveProps, getWinnerT} from "../../game/interfaces";
import {players} from "../../game/globalVariables";
import {changeCurrPlayer, checkCondition, getSymbol, setSymbol} from "../../game/gameModel";
import BtnReload from "../../UI/btnReload/BtnReload";
import {clearActiveCells} from "../../game/render";

function Field({frameLeft, frameTop, getWinner}: { frameLeft: number, frameTop: number, getWinner: getWinnerT }) {
    const field = useRef<HTMLDivElement>(null);
    const center = useRef<HTMLDivElement>(null);
    const leftTopCell = (center.current) ? center.current.children[0] as HTMLDivElement : null;
    const [widthCell, setWidthCell] = React.useState(Math.round(fieldSize / amountCells));
    const [arrayActiveCells, setArrayActiveCells] = React.useState<cellActiveProps>({});
    let currPlayer = players['x']

    const fieldHTML = field?.current as HTMLElement;
    const arrayCells = (center.current) ? Array.from(center.current.children) : [];
    let isDown: boolean = false;
    useEffect(() => {
        if (fieldHTML) {
            fieldHTML.oncontextmenu = () => false;
            fieldHTML.style.width = `${fieldSize + 4 * widthCell}px`;
            fieldHTML.style.height = `${
                fieldSize + 4 * widthCell
            }px`;
            fieldHTML.style.transform = `translate(${-widthCell * 2}px, ${-widthCell * 2}px)`;
            fieldHTML.addEventListener("mousedown", (e) => {
                e.preventDefault();
                if (e.which !== 3) return;
                centerHTML.style.cursor = "grab";
                isDown = true;
            });

            fieldHTML.addEventListener("mouseup", (e) => {
                e.preventDefault();
                centerHTML.style.cursor = "pointer";
                isDown = false;
            });
            fieldHTML.addEventListener("mouseleave", (e) => {
                e.preventDefault();
                centerHTML.style.cursor = "pointer";
                isDown = false;
            });

            document.addEventListener("mousemove", (e) => {
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
                centerHTML.style.transform = `translate(
                  ${coordsField.x}px, 
                  ${coordsField.y}px)`;

            });
        }

    }, [fieldHTML, arrayActiveCells]);

    const [coordsField, setCoordsField] = React.useState({x: 0, y: 0});
    const [switchAxis, setSwitchAxis] = React.useState({x: 0, y: 0});

    interface coordsCenterAxios {
        x: number;
        y: number;
    }

    const coordsCenterAxios: coordsCenterAxios = {x: 0, y: 0};
    const centerHTML = center.current as HTMLElement;

    if (field.current && center.current) {
        field.current.addEventListener("click", (e) => {
            e.preventDefault();
            if (e.which !== 1) return;
            const target = e.target as HTMLElement;
            const activeCellX = -Math.floor(
                (centerHTML.getBoundingClientRect().left -
                    target.getBoundingClientRect().left) / widthCell
            );
            const activeCellY = -Math.floor(
                (centerHTML.getBoundingClientRect().top -
                    target.getBoundingClientRect().top) / widthCell
            );
            //check double click

            if (!!getSymbol(activeCellX, activeCellY, arrayActiveCells)) return;
            setArrayActiveCells(setSymbol(activeCellX, activeCellY, arrayActiveCells, currPlayer));

            if (target.classList.contains("cell")) {
                target.classList.add("cellActive");
                target.innerHTML = currPlayer;
                if (checkCondition(activeCellX, activeCellY, arrayActiveCells, condWin, players, currPlayer)) {
                    getWinner(currPlayer);
                    currPlayer = players['x'];
                    fieldHTML.style.pointerEvents = "none";

                } else {
                    currPlayer = changeCurrPlayer(currPlayer, players);
                }
            }
        });
    }

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
                        <Cell key={`${i}:${j}`}
                              center={centerHTML}
                              arrayActiveCells={arrayActiveCells}
                              style={{
                            top: i * gap + i * widthCell,
                            left: j * gap + j * widthCell,
                            width: widthCell,
                            height: widthCell,
                            transform: `translate(${widthCell * -switchAxis.x}px, ${widthCell * -switchAxis.y}px)`
                        }} className={'cell'}/>)
                }
            }
        }
        return cells
    }, [switchAxis.y, switchAxis.x, coordsCenterAxios.y, coordsCenterAxios.x]);

    return (
        <>
            <div ref={field} className={styles.field}>
                <CoordsAxis refCenter={center}>
                    {renderField}
                </CoordsAxis>
            </div>
            <BtnReload onClick={() => {
                clearActiveCells(arrayCells);
                setArrayActiveCells({});
                fieldHTML.style.pointerEvents = "auto";
                getWinner('');
            }}/>
        </>
    )

}

export default Field;