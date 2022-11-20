
export interface cellParams {
    top: number;
    left: number;
    width: number;
    height: number;
    transform?: string;
}

export interface cellActiveProps {
    x: number;
    y: number;
    cell: Element | null;
    symbol: string;
}

export interface players {
    [key: string]: string
}

export type getWinnerT = (winner: string) => void