import React from "react";
import Game from "../components/GameComponent/Game";
import styles from './HomePage.module.css';
const HomePage = () => {
  return (
    <div className={styles.Container}>
      <Game />
    </div>
  );
};

export default HomePage;
