import React, { useState } from 'react';
import './App.css';
import { getGameQuestions, roundCount, calculateScore } from './Questions.js';
import { QuestionBox } from './Components/QuestionBox.js';
import { AnswerBox } from './Components/AnswerBox.js';
import { InputBox } from './Components/InputBox.js';

function App() {
  const [questions, setQuestions] = useState(getGameQuestions())
  const [currQuestion, setCurrQuestion] = useState(questions[0])
  const [round, setRound] = useState(0)
  const [score, setScore] = useState(0)
  const [timerCount, setTimerCount] = useState(20)
  const [input, setInput] = useState("")
  const [gameRun, setGameRun] = useState(true);

  function newRound() {
    var tempRound = round + 1;
    if (tempRound === (roundCount)) {
      setQuestions(getGameQuestions());
      tempRound = 0;
    }
    setScore(0);
    setRound(tempRound);
    setCurrQuestion(questions[tempRound]);
    setInput("");
    setTimerCount(20);
    setGameRun(true);
  }

  const handleSubmit = () => {
    setGameRun(false);
    setScore(calculateScore(input, currQuestion));
  }

  return (
    <div>
      <div className="singlePlayerScore">
        Exit
      </div>
      <div className="game-box">
        <QuestionBox 
          currQuestion={currQuestion}
          timerCount={timerCount}
          setTimerCount={setTimerCount}
          round={round}
          gameRun={gameRun}
          newRound={newRound}
          handleSubmit={handleSubmit}
        />

        { gameRun ?  (
          <InputBox
          input={input}
          setInput={setInput}
          currQuestion={currQuestion}
          handleSubmit={handleSubmit}
          newRound={newRound}
          />
        ) : (
          <AnswerBox
          input={input}
          currQuestion={currQuestion}
          score={score}
          timerCount={timerCount}
          />
        ) }
      </div>
      <div className="singlePlayerScore">
        { "Score: 0" }
      </div>
    </div>
  );
}

export default App;

