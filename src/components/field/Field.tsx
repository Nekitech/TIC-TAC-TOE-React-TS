import React, {ReactElement, useEffect, useRef} from 'react';
import styles from './Field.module.css';
import {clearActiveCells, render, renderActiveCells, renderUpdate} from '../../game/render';
import {amountCells, condWin, fieldSize, gap} from "../../game/constants";
import Cell from "../cell/Cell";
import CoordsAxis from "../coordsAxis/CoordsAxis";
import {cellActiveProps, getWinnerT} from "../../game/interfaces";
import {players} from "../../game/globalVariables";
import {changeCurrPlayer, checkCondition, getActiveCell, reloadGame} from "../../game/gameModel";
import BtnReload from "../../UI/btnReload/BtnReload";

function Field({frameLeft, frameTop, getWinner}: { frameLeft: number, frameTop: number, getWinner: getWinnerT }) {
    const field = useRef<HTMLDivElement>(null);
    const center = useRef<HTMLDivElement>(null);
    const leftTopCell = (center.current) ? center.current.children[0] as HTMLDivElement : null;
    const [widthCell, setWidthCell] = React.useState(0);
    const [arrayActiveCells, setArrayActiveCells] = React.useState<cellActiveProps[]>([]);
    // let arrayActiveCells:cellActiveProps[] = [];
    let currPlayer = players['x']
    let isDown = false;

    useEffect(() => {
        if (field.current) {
            setWidthCell(Math.round(fieldSize / amountCells));
            field.current.style.width = `${fieldSize + 4 * widthCell}px`;
            field.current.style.height = `${
                fieldSize + 4 * widthCell
            }px`;
            field.current.style.transform = `translate(${-widthCell * 2}px, ${-widthCell * 2}px)`;
        }
    }, [widthCell]);

    const [coordsField, setCoordsField] = React.useState({x: 0, y: 0});
    const [switchAxis, setSwitchAxis] = React.useState({x: 0, y: 0});
    // const coordsField = {x: 0, y: 0};
    // const switchAxis = {x: 0, y: 0};
    interface coordsCenterAxios {
        x: number;
        y: number;
    }

    const coordsCenterAxios: coordsCenterAxios = {x: 0, y: 0};


    if (field.current && center.current) {
        const arrayCells = Array.from(center.current.children);
        const centerHTML = center.current as HTMLElement;
        const fieldHTML = field.current as HTMLElement;
        fieldHTML.oncontextmenu = () => false;

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

        fieldHTML.addEventListener("mousemove", (e) => {
            e.preventDefault();
            if (isDown) {
                setCoordsField({
                    y: coordsField.y += e.movementY,
                    x: coordsField.x += e.movementX
                });
                centerHTML.style.transform = `translate(
                  ${coordsField.x}px, 
                  ${coordsField.y}px)`;
                setSwitchAxis({
                    y: Math.floor(coordsField.y / widthCell),
                    x: Math.floor(coordsField.x / widthCell)
                });

                // switchAxis.y = Math.floor(coordsField.y / widthCell);
                // switchAxis.x = Math.floor(coordsField.x / widthCell);

                clearActiveCells(arrayCells);
                // renderUpdate(frameLeft, frameTop, amountCells, arrayCells, widthCell, switchAxis);
                renderActiveCells(arrayActiveCells, arrayCells, centerHTML, widthCell);
            }
        });


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
            if (!!getActiveCell(activeCellX, activeCellY, arrayActiveCells)) return;

            arrayActiveCells.push({
                cell: target,
                x: activeCellX,
                y: activeCellY,
                symbol: currPlayer
            })

            if (target.classList.contains("cell")) {

                target.classList.add("cellActive");
                target.innerHTML = currPlayer;

                if (checkCondition(activeCellX, activeCellY, arrayActiveCells, condWin, players, currPlayer)) {
                    fieldHTML.style.pointerEvents = "none";
                    getWinner(currPlayer);
                    currPlayer = players['x'];
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
            coordsCenterAxios.y >= widthCell * switchAxis.y ||
            coordsCenterAxios.x >= widthCell * switchAxis.x
        ) {
            for (let i = 0; i < amountCells + 2; i++) {
                for (let j = 0; j < amountCells + 2; j++) {
                    cells.push(
                        <Cell key={`${i}:${j}`} style={{
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
    }, [widthCell, switchAxis.y, switchAxis.x, coordsCenterAxios.y, coordsCenterAxios.x]);

    return (
        <>
            <div ref={field} className={styles.field}>
                <CoordsAxis refCenter={center}>
                    {renderField}
                </CoordsAxis>
            </div>
            {/*<BtnReload onClick={() => {*/}
            {/*    reloadGame(arrayActiveCells, players, currPlayer)*/}
            {/*    arrayActiveCells.length = 0;*/}
            {/*    getWinner("");*/}
            {/*    if (field.current) field.current.style.pointerEvents = "auto";*/}
            {/*}}/>*/}
        </>
    );
}

export default Field;