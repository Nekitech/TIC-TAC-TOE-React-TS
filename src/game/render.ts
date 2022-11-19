import {cellActiveProps, cellParams} from "./interfaces";

export const render = (amountCells: number, gap: number, widthCell: number): cellParams[] => {
    const cellsParams = [];
    for (let i = 0; i < amountCells + 2; i++) {
        for (let j = 0; j < amountCells + 2; j++) {
            cellsParams.push({
                top: i * gap + i * widthCell,
                left: j * gap + j * widthCell,
                width: widthCell,
                height: widthCell,
                cell: widthCell
            })
        }
    }
    return cellsParams
}

export const renderUpdate = (frameLeft: number,
                             frameTop: number,
                             amountCells: number,
                             arrayCells: Element[],
                             widthCell: number,
                             switchAxis: { x: number, y: number }): any => {

    interface coordsCenterAxios {
        x: number;
        y: number;
    }

    const coordsCenterAxios: coordsCenterAxios = {x: 0, y: 0};
    const leftTopCell = arrayCells[0] as HTMLElement;
    if(leftTopCell) {
        coordsCenterAxios.x = -(frameLeft - leftTopCell.getBoundingClientRect().x)
        coordsCenterAxios.y = frameTop - leftTopCell.getBoundingClientRect().y
    }

    if (
        coordsCenterAxios.y <= widthCell * switchAxis.y ||
        coordsCenterAxios.x <= widthCell * switchAxis.x ||
        coordsCenterAxios.y >= widthCell * switchAxis.y ||
        coordsCenterAxios.x >= widthCell * switchAxis.x
    ) {
        arrayCells.forEach((cell ) => {
            const cellHTML = cell as HTMLElement
            cellHTML.style.transform = `translate(
              ${widthCell * -switchAxis.x}px, 
              ${widthCell * -switchAxis.y}px)`;
        });
    }
};

export const renderActiveCells = (arrayCoordsCells: cellActiveProps[], arrayCells: Element[], center: HTMLElement, widthCell: number) => {
    for (let i = 0; i < arrayCoordsCells.length; i++) {
        for (let j = 0; j < arrayCells.length; j++) {
            const currCell = {
                x: -Math.floor(
                    (center.getBoundingClientRect().left -
                        arrayCells[j].getBoundingClientRect().left) /
                    widthCell
                ),
                y: -Math.floor(
                    (center.getBoundingClientRect().top -
                        arrayCells[j].getBoundingClientRect().top) /
                    widthCell
                )
            };
            if (
                currCell.x === arrayCoordsCells[i].x &&
                currCell.y === arrayCoordsCells[i].y
            ) {
                arrayCells[j].classList.add("cellActive");
                arrayCoordsCells[i].cell = arrayCells[j];
                arrayCells[j].innerHTML = arrayCoordsCells[i].symbol;
                break;
            }
        }
    }
};

export const clearActiveCells = (arrayCells: Element[]) => {
    arrayCells.forEach((el) => {
        el.classList.remove("cellActive");
        el.innerHTML = "";
    });
};