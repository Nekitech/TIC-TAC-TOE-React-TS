import {cellActiveProps, players} from "./interfaces";

export const checkCondition = (
    cellX:number,
    cellY:number,
    arrayActiveCells: cellActiveProps,
    condWin: number,
    players: players,
    currPlayer: string
) => {
    const condCheck = { h: 0, v: 0, dtop: 0, dbot: 0 };
    const condCheckMax = { h: 0, v: 0, dtop: 0, dbot: 0 };
    console.log(arrayActiveCells)
    for (let i = -condWin + 1; i < condWin; i++) {
        if (
           arrayActiveCells[cellX - i]?.[cellY] === currPlayer
        ) {
            condCheck.h++;
            if (condCheck.h >= condWin) return true;
            if (condCheck.h > condCheckMax.h) condCheckMax.h++;
        } else condCheck.h = 0;

        if (
            arrayActiveCells[cellX]?.[cellY - i] === currPlayer
        ) {
            condCheck.v++;
            if (condCheck.v >= condWin) return true;
            if (condCheck.v > condCheckMax.v) condCheckMax.v++;
        } else condCheck.v = 0;

        if (
            arrayActiveCells[cellX - i]?.[cellY - i] === currPlayer
        ) {
            condCheck.dtop++;
            if (condCheck.dtop >= condWin) return true;
            if (condCheck.dtop > condCheckMax.dtop) condCheckMax.dtop++;
        } else condCheck.dtop = 0;

        if (
            arrayActiveCells[cellX - i]?.[cellY - i * -1] === currPlayer
        ) {
            condCheck.dbot++;
            if (condCheck.dbot >= condWin) return true;
            if (condCheck.dbot > condCheckMax.dbot) condCheckMax.dbot++;
        } else condCheck.dbot = 0;
        console.log(condCheckMax);
        if (Math.max(...Object.values(condCheckMax)) === condWin) {
            return true;
        }
    }
    return false;
};


export const changeCurrPlayer = (currPlayer: string, players: players) => {
    const arrayPlayers = Object.values(players).reverse();
    const nextIndex = arrayPlayers.indexOf(currPlayer) + 1;
    return arrayPlayers[nextIndex >= arrayPlayers.length ? 0 : nextIndex];
};

export const getSymbol = (x: number, y: number, arrayCoordsCells: cellActiveProps):string => {
    return arrayCoordsCells?.[x]?.[y] ?? ''
}

export const setSymbol = (x: number, y: number, arrayCoordsCells: cellActiveProps, currPlayer: string) => {
    if(!arrayCoordsCells[x]) {
        arrayCoordsCells[x] = {}
    }
    if(arrayCoordsCells[x][y]) return arrayCoordsCells
    arrayCoordsCells[x][y] = currPlayer
    return arrayCoordsCells
}

