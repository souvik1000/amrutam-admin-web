import { FC } from "react";
import { Spin } from "antd";

import { LoaderSizes } from "@/enums/antComponentTypes";

import styles from "./Loader.module.scss";

interface LoaderProps {
  size?: LoaderSizes;
}

const Loader: FC<LoaderProps> = ({ size }) => {
  return (
    <div className={styles["loader-container"]}>
      <Spin size={size ? size : LoaderSizes.DEFAULT} />
    </div>
  );
};
export default Loader;
