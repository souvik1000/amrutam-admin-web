import clsx from "clsx";
import { FC } from "react";

import styles from "./pointerItem.module.scss";

type EmojiItemsProps = {
    icon: string;
    description: string
}

type PointerItemsProps = {
    textItems?: string[];
    customItems?: EmojiItemsProps[]
}

const PointerItems: FC<PointerItemsProps> = ({
    textItems = [], customItems
}) => {
    return customItems
    ? customItems.map(({ icon, description }, index) => {
        return <div key={index} className={styles.pointerItem}>
            <div>{icon}</div>
            <div className={styles.text}>{description}</div>
        </div>
    })
    : textItems.map((item, index) => {
        return <div key={index} className={clsx(styles.sideSpaces, styles.pointerItem)}>
            <div className={clsx("mt-2", "pointer")}></div>
            <div className={styles.text}>{item}</div>
        </div>
    })
}

export default PointerItems;
