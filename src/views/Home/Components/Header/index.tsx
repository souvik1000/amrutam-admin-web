import { Avatar } from "antd";

import LogoFile from "@/assets/icons/logo.svg";
import { AvatarSize } from "@/enums/antComponentTypes";
import CompNameFile from "@/assets/icons/name-logo.svg";

import styles from "./header.module.scss";

const { LARGE } = AvatarSize;

const Header = () => {
    return <div className={styles.header}>
        <div className={styles.logo}>
          <img src={LogoFile} alt="Company Logo" />
          <img src={CompNameFile} alt="Company Name" />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userDetails}>
            <div className={styles.userName}>Souvik Ghosh</div>
            <div className={styles.userRole}>Administrator</div>
          </div>
          <Avatar size={LARGE} className={styles.userAvatar}>SG</Avatar>
        </div>
      </div>
}

export default Header;