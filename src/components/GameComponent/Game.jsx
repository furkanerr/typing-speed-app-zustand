import React, { useEffect, useRef, useState } from "react";
import useStore from "../../store/useStore";
import styles from "./Game.module.css";

const Game = () => {
  const {
    textData,
    fetchText,
    checkIfCorrect,
    reStartTheGame,
    myTimer,
    duration,
  } = useStore((state) => state);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [keyDown,setKeyDown]  = useState(false);

  useEffect(() => {
    fetchText();
  }, [fetchText]);

  const fieldRef = useRef(null);

  useEffect(() => {
    if (currentWordIndex && fieldRef.current) {
      fieldRef.current.scrollIntoView();
    }
    if (correctAnswer.length > 0) {
      checkIfCorrect(correctAnswer[currentWordIndex - 1]);
    }
  }, [currentWordIndex]);

  const handleChange = (value) => {
    if (value.endsWith(" ")) {
      setCorrectAnswer((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[currentWordIndex] = word === textData[currentWordIndex];
        return newResult;
      });

      console.log(correctAnswer);
      setCurrentWordIndex((prev) => prev + 1);
      setUserInput("");
    } else {
      setUserInput(value);
    }
  };

  const handleReStartClick = () => {
    setCurrentWordIndex(0);
    setUserInput("");
    setCorrectAnswer([]);
    reStartTheGame();
    fetchText();
  };

  const handleKeyDown = () => {
    if(!keyDown){
      myTimer();
      setKeyDown(true);
    }
    

  };

  return (
    <div className={styles.Container}>
      <div className={styles.textArea}>
        {textData.map((text, index) => {
          if (correctAnswer[index] === true)
            return (
              <span
                key={index}
                ref={index === currentWordIndex ? fieldRef : null}
                className={styles.Correct}
              >
                {text}{" "}
              </span>
            );

          if (correctAnswer[index] === false)
            return (
              <span
                key={index}
                ref={index === currentWordIndex ? fieldRef : null}
                className={styles.Wrong}
              >
                {text}{" "}
              </span>
            );

          if (index === currentWordIndex)
            return (
              <span
                key={index}
                ref={index === currentWordIndex ? fieldRef : null}
                className={styles.current}
              >
                {text}{" "}
              </span>
            );
          else return <span key={index}>{text} </span>;
        })}
      </div>

      <div className={styles.InputandTimer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Start typing"
          value={userInput}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={() => handleKeyDown()}
        />
        <div className={styles.timer}>{duration}</div>
        <div className={styles.reStart} onClick={() => handleReStartClick()}>
          Restart
        </div>
      </div>
    </div>
  );
};

export default Game;
