import { pageNotFoundConstants } from "./constants";
import SadFace from "src/assets/icons/sad-face.webp";

import styles from "./pageNotFound.module.scss";

const { sadFace, error, message } = pageNotFoundConstants;

const PageNotFound = () => {
  return (
    <div className={styles.pageNotFound}>
      <div className={styles.wrapper}>
        <img src={SadFace} alt={sadFace} className={styles.sadFace} />
        <p className={styles.content}>{error}</p>
        <p className={styles.subContent}>{message}</p>
      </div>
    </div>
  );
};

export default PageNotFound;
