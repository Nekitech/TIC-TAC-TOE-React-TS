import {MutableRefObject} from "react";

export interface cellParams {
    top: number;
    left: number;
    width: number;
    height: number;
    transform?: string;
    refCenter?: MutableRefObject<any>;
}
