import {MutableRefObject} from "react";

export interface cellParams {
    top: number;
    left: number;
    width: number;
    height: number;
    transform?: string;
    refCenter?: MutableRefObject<any>;
}

export interface cellActiveProps {
    x: number;
    y: number;
    cell: Element;
    symbol: string;
}

export interface players {
    [key: string]: string
}

export type getWinnerT = (winner: string) => void