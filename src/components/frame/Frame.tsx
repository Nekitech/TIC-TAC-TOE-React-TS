import React, {useEffect, useState} from 'react'
import styles from './Frame.module.css'
import Field from "../field/Field";
import {fieldSize} from "../../game/constants";
import {getWinnerT} from "../../game/interfaces";

function Frame(props: { getWinner: getWinnerT }) {
    const frame = React.useRef<HTMLDivElement | null>(null);
    const [frameOffset, setFrameOffset] = useState({
        frameLeft: 0,
        frameTop: 0
    });
    useEffect(() => {
        if(frame.current) {
            frame.current.style.width = `${fieldSize}px`
            frame.current.style.height = `${fieldSize}px`

            setFrameOffset({
                frameLeft: frame.current.getBoundingClientRect().left,
                frameTop: frame.current.getBoundingClientRect().top
            })
        }
    }, [frameOffset.frameLeft, frameOffset.frameTop]);



    return (
        <div ref={frame} className={styles.frame}>
            <Field getWinner={props.getWinner} frameLeft={frameOffset.frameLeft} frameTop={frameOffset.frameTop}/>
        </div>
    );
}

export default Frame;