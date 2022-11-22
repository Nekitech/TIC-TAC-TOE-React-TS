import React, {useEffect, useRef} from 'react';
import styles from './Field.module.css';
import {clearActiveCells, render, renderActiveCells, renderUpdate} from '../../game/render';
import {amountCells, condWin, fieldSize, gap} from "../../game/constants";
import Cell from "../cell/Cell";
import CoordsAxis from "../coordsAxis/CoordsAxis";
import {cellActiveProps, cellParams, getWinnerT} from "../../game/interfaces";
import {players} from "../../game/globalVariables";
import {changeCurrPlayer, checkCondition, getActiveCell, reloadGame} from "../../game/gameModel";
import BtnReload from "../../UI/btnReload/BtnReload";

function Field({frameLeft, frameTop, getWinner}: { frameLeft: number, frameTop: number,  getWinner: getWinnerT}) {
    const field = useRef<HTMLDivElement>(null);
    const center = useRef<HTMLDivElement>(null);
    const [widthCell, setWidthCell] = React.useState(0);
    const [arrayActiveCells, setArrayActiveCells] = React.useState<cellActiveProps[]>([]);
    let currPlayer = players['x']
    let isDown = false;

    useEffect(() => {
        if (field.current) {

            setWidthCell(Math.round(fieldSize / amountCells));
            field.current.style.width = `${fieldSize + 4*widthCell}px`;
            field.current.style.height = `${
                fieldSize + 4*widthCell
            }px`;
            field.current.style.transform = `translate(${-widthCell*2}px, ${-widthCell*2}px)`;
        }
    }, [widthCell]);

    const coordsField = {x: 0, y: 0};
    const switchAxis = {x: 0, y: 0};

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
                coordsField.x += e.movementX;
                coordsField.y += e.movementY;
                centerHTML.style.transform = `translate(
                  ${coordsField.x}px, 
                  ${coordsField.y}px)`;

                switchAxis.y = Math.floor(coordsField.y / widthCell);
                switchAxis.x = Math.floor(coordsField.x / widthCell);

                clearActiveCells(arrayCells);
                renderUpdate(frameLeft, frameTop, amountCells, arrayCells, widthCell, switchAxis);
                renderActiveCells(arrayActiveCells, arrayCells, centerHTML, widthCell);
            }
        });


        field.current.addEventListener("click", (e) => {
            e.preventDefault();
            if (e.which !== 1) return;
            const target = e.target as HTMLElement;
            const activeCellX = -Math.floor(
                (centerHTML.getBoundingClientRect().left -
                    target.getBoundingClientRect().left) /
                widthCell
            );
            const activeCellY = -Math.floor(
                (centerHTML.getBoundingClientRect().top -
                    target.getBoundingClientRect().top) /
                widthCell
            );
            //check double click
            if (!!getActiveCell(activeCellX, activeCellY, arrayActiveCells)) return;

            arrayActiveCells.push({
                cell: target,
                x: activeCellX,
                y: activeCellY,
                symbol: currPlayer
            });

            if (target.classList.contains("cell")) {

                target.classList.add("cellActive");
                target.innerHTML = currPlayer;

                if (
                    checkCondition(
                        activeCellX,
                        activeCellY,
                        arrayActiveCells,
                        condWin,
                        players,
                        currPlayer
                    )
                ) {
                    fieldHTML.style.pointerEvents = "none";
                    getWinner(currPlayer);
                    currPlayer = players['x'];
                }
                currPlayer = changeCurrPlayer(currPlayer, players);

            }
        });

    }


    return (
        <>
            <div ref={field} className={styles.field}>
                <CoordsAxis refCenter={center}>
                    {
                        render(amountCells, gap, widthCell).map((cell, index) => {
                            return (
                                <Cell key={index} style={{
                                    top: `${cell.top}px`,
                                    left: `${cell.left}px`,
                                    width: `${cell.width}px`,
                                    height: `${cell.width}px`,
                                    fontSize: `${cell.width}px`,
                                }}/>
                            )
                        })
                    }
                </CoordsAxis>
            </div>
            <BtnReload onClick={() => {
                reloadGame(arrayActiveCells)
                arrayActiveCells.length = 0
                getWinner("");
                if(field.current) field.current.style.pointerEvents = "auto";

            }}/>
        </>
    );
}

export default React.memo(Field);