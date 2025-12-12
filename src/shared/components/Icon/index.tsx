import clsx from "clsx";
import { FC, MouseEvent } from "react";

interface IconProps {
  name: string;
  fill?: boolean;
  className?: string;
  isSymbol?: boolean;
  isOutlined?: boolean;
  isDisabled?: boolean;
  isSymbolOutline?: boolean;
  preventPropagation?: boolean;
  onClick?: () => void;
}

const Icon: FC<IconProps> = ({
  name = "",
  fill = false,
  className = "",
  isSymbol = false,
  isOutlined = false,
  isDisabled = false,
  isSymbolOutline = false,
  preventPropagation = false,
  onClick,
}) => {
  const iconStyle = clsx(className, {
    "enabled": !isDisabled,
    "disabled": isDisabled,
    "material-symbols-sharp": fill,
    "material-symbols-rounded": isSymbol,
    "material-icons-outlined": isOutlined,
    "material-symbols-outlined": isSymbolOutline
  });

  const handleClick = (e: MouseEvent<HTMLSpanElement>) => {
    preventPropagation && e.stopPropagation();
    !isDisabled && onClick?.();
  };

  return (
    <span className={iconStyle} onClick={handleClick}>
      {name}
    </span>
  );
};

export default Icon;
