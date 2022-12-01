import React, {
    MutableRefObject,
    ReactNode
} from 'react';
import styles from './CoordsAxis.module.css';


interface Props {
    children?: ReactNode;
    refCenter: MutableRefObject<any>;
}


const CoordsAxis: React.FC<Props> = (props) => {

    return (
        <div ref={props.refCenter} className={styles.coordsCenter}>
            {
                props.children
            }
        </div>
    );
};

export default React.memo(CoordsAxis)   ;