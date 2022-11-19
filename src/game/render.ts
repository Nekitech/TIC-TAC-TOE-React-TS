import {cellParams} from "./interfaces";

export const render = (amountCells: number, gap: number, widthCell: number): cellParams[] => {
    const cellsParams = [];
    for (let i = 0; i < amountCells + 2; i++) {
        for (let j = 0; j < amountCells + 2; j++) {
            cellsParams.push({
                top: i * gap + i * widthCell,
                left: j * gap + j * widthCell,
                width: widthCell,
                height: widthCell
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
        coordsCenterAxios.x <= widthCell * switchAxis.x
    ) {
        arrayCells?.forEach((cell ) => {
            const cellHTML = cell as HTMLElement
            cellHTML.style.transform = `translate(
              ${widthCell * -switchAxis.x}px, 
              ${widthCell * -switchAxis.y}px)`;
        });

    } else {
        arrayCells?.forEach((cell) => {
            const cellHTML = cell as HTMLElement
            cellHTML.style.transform = `translate(
              ${widthCell * -switchAxis.x}px, 
              ${widthCell * -switchAxis.y}px)`;
        });

    }
};