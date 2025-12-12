import { FC } from "react";
import { Button as AntdButton, ButtonProps as AntButtonProps } from "antd";

import Icon from "../Icon";

// type DivClassProps = Pick<JSX.IntrinsicElements["div"], "className">;

interface ButtonProps extends AntButtonProps {
    name: string
    iconName?: string
    type?: "primary" | "default"
    onClick?: () => void
}

const Button: FC<ButtonProps> = ({
    name, iconName, className, type="default", onClick, ...rest
}) => {
    return (
        <AntdButton
            {...rest}
            color={type}
            variant="solid"
            className={className}
            onClick={onClick}
        >{iconName && <Icon fill isSymbol name={iconName} />}{name}</AntdButton>
    )
}

export default Button;