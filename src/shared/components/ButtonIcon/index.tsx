import clsx from "clsx"
import { FC } from "react"

import Icon from "../Icon"

import styles from "./ButtonIcon.module.scss"

type ButtonIconProps = {
    iconName: string
    disabled?: boolean
    onClick?: () => void
}

const ButtonIcon: FC<ButtonIconProps> = ({
    iconName,
    disabled = false,
    onClick,
}) => {
    return (
        <div
            className={clsx(styles.iconButton, { disabled: disabled })}
            onClick={onClick}
        >
            <Icon
                fill
                isSymbol
                name={iconName}
                isDisabled={disabled}
                className={styles.icon}
            />
        </div>
    )
}

export default ButtonIcon
