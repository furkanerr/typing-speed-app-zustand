import React, { useState } from 'react'
import useStore from '../../store/useStore';
import styles from './result.module.css'
const ResultModal = ({isOpen,setIsOpen,setCorrectAnswer,setUserInput,setCurrentWordIndex,setKeyDown}) => {
    const {
        correctAnswers,
        wrongAnswers,
        reStartTheGame,
        fetchText
      } = useStore((state) => state);
 
    const [percentage,setPercentage] = useState(0);
    const handleClose = () => {
        setIsOpen(!isOpen);
        reStartTheGame();
        setCorrectAnswer([]);
        setUserInput("");
        setCurrentWordIndex(0);
        setKeyDown(false);
        fetchText();
    }

      useState(()=>{
        
        setPercentage(Math.round((correctAnswers / (correctAnswers + wrongAnswers)) * 100));

      },[correctAnswers,wrongAnswers])
  return (
    <div className={styles.Container}>
      <div className={styles.header}>Results</div>
        <div className={styles.percent}>{percentage}%</div>
        <div className={styles.correct}>{correctAnswers} Correct</div>
        <div className={styles.wrong}>{wrongAnswers} Wrong</div>
        <div className={styles.reStartButton} onClick={handleClose}>Restart</div>
    </div>
  )
}

export default ResultModal