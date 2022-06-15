import React, { useEffect, useRef, useState } from "react";
import useStore from "../../store/useStore";
import styles from "./Game.module.css";

const Game = () => {
  const { textData, fetchText } = useStore((state) => state);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState([]);

  useEffect(() => {
    fetchText();
  }, [fetchText]);

  const fieldRef = useRef(null);

  useEffect(() => {
    if (currentWordIndex && fieldRef.current) {
      fieldRef.current.scrollIntoView();
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
        />
        <div className={styles.timer}>Timer</div>
        <div className={styles.reStart}>Restart</div>
      </div>
    </div>
  );
};

export default Game;
