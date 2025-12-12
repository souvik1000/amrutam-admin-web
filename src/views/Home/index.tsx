import { Col, Row } from "antd";
import { Outlet } from "react-router-dom";

import Header from "./Components/Header";
import Navbar from "./Components/Navbar";

import styles from "./home.module.scss";

const Home = () => {
  return (
    <div className={styles.baseContainer}>
      <Header />
      <div className={styles.body}>
        <Row className={styles.bodyRow}>
          <Col className={styles.menu} span={5}>
            <Navbar />
          </Col>
          <Col className={styles.itemInfo} span={19}>
            <Outlet />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
