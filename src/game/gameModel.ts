export const checkCondition = (
    cellX:number,
    cellY:number,
    // arrayActiveCells,
    // condWin,
    // players,
    // currPlayer
) => {
    // const condCheck = { h: 0, v: 0, dtop: 0, dbot: 0 };
    // const condCheckMax = { h: 0, v: 0, dtop: 0, dbot: 0 };
    // for (let i = -condWin + 1; i < condWin; i++) {
    //     if (
    //         arrayActiveCells.find((cell) => cell.x === cellX - i && cell.y === cellY)
    //             ?.symbol === currPlayer
    //     ) {
    //         condCheck.h++;
    //         if (condCheck.h >= condWin) return true;
    //         if (condCheck.h > condCheckMax.h) condCheckMax.h++;
    //     } else condCheck.h = 0;
    //
    //     if (
    //         arrayActiveCells.find((cell) => cell.x === cellX && cell.y === cellY - i)
    //             ?.symbol === currPlayer
    //     ) {
    //         condCheck.v++;
    //         if (condCheck.v >= condWin) return true;
    //         if (condCheck.v > condCheckMax.v) condCheckMax.v++;
    //     } else condCheck.v = 0;
    //
    //     if (
    //         arrayActiveCells.find(
    //             (cell) => cell.x === cellX - i && cell.y === cellY - i
    //         )?.symbol === currPlayer
    //     ) {
    //         condCheck.dtop++;
    //         if (condCheck.dtop >= condWin) return true;
    //         if (condCheck.dtop > condCheckMax.dtop) condCheckMax.dtop++;
    //     } else condCheck.dtop = 0;
    //
    //     if (
    //         arrayActiveCells.find(
    //             (cell) => cell.x === cellX - i && cell.y === cellY - i * -1
    //         )?.symbol === currPlayer
    //     ) {
    //         condCheck.dbot++;
    //         if (condCheck.dbot >= condWin) return true;
    //         if (condCheck.dbot > condCheckMax.dbot) condCheckMax.dbot++;
    //     } else condCheck.dbot = 0;
    //
    //     if (Math.max(...Object.values(condCheckMax)) === condWin) {
    //         return true;
    //     }
    // }
    // return false;
};

// export const getActiveCell = (cellX, cellY, arrayActiveCells) => {
//     return (
//         arrayActiveCells?.find((cell) => cell?.x === cellX && cell?.y === cellY)
//             ?.cell ?? false
//     );
// };
