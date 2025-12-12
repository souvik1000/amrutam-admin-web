import clx from "clsx";

import { noDataConstants } from "./constants";
import SadFace from "src/assets/icons/sad-face.webp";

import styles from "./noData.module.scss";

type NoDataProps = {
  heading?: string;
  subheading?: string;
  image?: string;
  imageAlt?: string;
  centered?: boolean;
  className?: string;
  iconHeight?: string;
  iconWidth?: string;
  noSubHeading?: boolean;
}

const { line1, line2, sadFace } = noDataConstants;

const NoData = ({
  image,
  imageAlt,
  iconWidth,
  className,
  subheading,
  iconHeight,
  noSubHeading,
  heading = line1,
  centered = false,
}: NoDataProps) => {
  return (
    <div className={clx(styles.wrapper, { [styles.centered]: centered }, className)}>
      <img
        src={image || SadFace}
        alt={imageAlt || sadFace}
        className={styles.sadFace}
        style={{ height: iconHeight, width: iconWidth }}
      />
      <p className={styles.content}>{heading}</p>
      {!noSubHeading && <p className={styles.content}>{subheading ?? line2}</p>}
    </div>
  );
};

export default NoData;
