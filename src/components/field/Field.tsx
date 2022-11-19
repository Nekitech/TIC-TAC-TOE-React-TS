import React, {useEffect, useRef} from 'react';
import styles from './Field.module.css';
import {render, renderUpdate} from '../../game/render';
import {amountCells, fieldSize, gap} from "../../game/constants";
import Cell from "../cell/Cell";
import CoordsAxis from "../coordsAxis/CoordsAxis";



function Field({frameLeft, frameTop}: { frameLeft: number, frameTop: number }) {
    const field = useRef<HTMLDivElement>(null);
    const center = useRef<HTMLDivElement>(null);
    const [widthCell, setWidthCell] = React.useState(0);
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

    const coordsField = {
        x: 0,
        y: 0
    };
    const switchAxis = {
        x: 0,
        y: 0
    };
    if (field.current && center.current) {
        const arrayCells = Array.from(center.current.children);
        const centerHTML = center.current as HTMLElement;
        field.current.oncontextmenu = () => false;

        field.current.addEventListener("mousedown", (e) => {
            e.preventDefault();
            if (e.which !== 3) return;
            centerHTML.style.cursor = "grab";
            isDown = true;
        });

        field.current.addEventListener("mouseup", (e) => {
            e.preventDefault();

            centerHTML.style.cursor = "pointer";
            isDown = false;
        });
        field.current.addEventListener("mouseleave", (e) => {
            e.preventDefault();
            centerHTML.style.cursor = "pointer";
            isDown = false;
        });

        field.current.addEventListener("mousemove", (e) => {
            e.preventDefault();
            if (isDown) {
                coordsField.x += e.movementX;
                coordsField.y += e.movementY;
                // @ts-ignore
                center.current.style.transform = `translate(
                  ${coordsField.x}px, 
                  ${coordsField.y}px)`;

                switchAxis.y = Math.floor(coordsField.y / widthCell);
                switchAxis.x = Math.floor(coordsField.x / widthCell);

                // clearActiveCells();
                renderUpdate(frameLeft, frameTop, amountCells, arrayCells, widthCell, switchAxis)
                // renderUpdate();
                // renderActiveCells();
            }
        });

    }


    return (
        <div ref={field} className={styles.field}>
            <CoordsAxis refCenter={center}>
                {(widthCell > 0) &&
                    render(amountCells, gap, widthCell).map((cell, index) => {
                        return (
                            <Cell key={index} style={{
                                top: `${cell.top}px`,
                                left: `${cell.left}px`,
                                width: `${cell.width}px`,
                                height: `${cell.width}px`
                            }}/>
                        )
                    })
                }
            </CoordsAxis>
        </div>
    );
}

export default Field;