import "./styles.css";
import React, { useState, useEffect } from "react";
export default function App() {
  const [randomNumber, setRandomNumber] = useState(0);
  const [clickedNumber, setClickedNumber] = useState();
  const [start, setStart] = useState(false);
  const [score, setScore] = useState(0);
  const blocks = 5;
  let timer;
  const startHandler = () => {
    setStart(true);
    timer = setInterval(() => {
      const randomNumber = parseInt(Math.random() * blocks);
      setRandomNumber(randomNumber);
      setClickedNumber();
    }, 1000);
  };
  const blockClickhandler = (i, randomNumber) => {
    if (!start) return;
    if (i === randomNumber) setScore((score) => ++score);
    setClickedNumber(i);
  };

  const getStyle = (i, randomNumber) => {
    if (!start) return;
    if (i === randomNumber && i === clickedNumber) return "green";
    if (i === clickedNumber && i !== randomNumber) return "red";
    if (i === randomNumber) return "blue";
  };

  const getHighScore = () => {
    const localStorageHighScore = localStorage.getItem("highScore") || 0;
    if (localStorageHighScore && localStorageHighScore > score) {
      return localStorageHighScore;
    }
    localStorage.setItem("highScore", score);
    return score;
  };

  useEffect(() => {
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="App">
      <h2>Blink Click</h2>
      <div className="score-container mb-20">
        <div>score: {score}</div>
        <div>highScore: {getHighScore()}</div>
      </div>
      <div className="container mt">
        {[...new Array(blocks)].map((b, i) => (
          <div
            className={`block ${getStyle(i, randomNumber)}`}
            onClick={() => blockClickhandler(i, randomNumber)}
          ></div>
        ))}
      </div>
      <button className="mt" onClick={startHandler}>
        start
      </button>
    </div>
  );
}
