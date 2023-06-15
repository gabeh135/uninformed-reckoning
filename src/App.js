import React, { useState } from 'react';
import './App.css';
import { getGameQuestions, calculateScore } from './Questions.js';
import AnswerBox from './Components/AnswerBox.js'
import InputBox from './Components/InputBox.js'
import Leaderboard from './Components/Leaderboard.js'
import QuestionBox from './Components/QuestionBox.js'

function App() {
  const [questions, setQuestions] = useState(getGameQuestions())
  const [currQuestion, setCurrQuestion] = useState(questions[0])
  const [round, setRound] = useState(0)
  const [roundCount, setRoundCount] = useState(3)
  const [score, setScore] = useState(0)
  const [timerCount, setTimerCount] = useState(20)
  const [timerMax, setTimerMax] = useState(20);
  const [input, setInput] = useState("")
  const [gameRun, setGameRun] = useState(true)

  function newRound() {
    var tempRound = round + 1;
    if (tempRound === (roundCount)) {
      //newGame
      setQuestions(getGameQuestions());
      tempRound = 0;
    }
    setScore(0);
    setRound(tempRound);
    setCurrQuestion(questions[tempRound]);
    setInput("");
    setTimerCount(timerMax);
    setGameRun(true);
  }

  /*
  function newGame() {
      setRound(0)
      setQuestions(getGameQuestions());
  }
  */

  const handleSubmit = () => {
    setGameRun(false);
    setScore(calculateScore(input, currQuestion));
  }

  return (
    <div>
      <div className="singlePlayerScore">
        <Leaderboard
          barVal="top"
          roundCount={roundCount}
          setRoundCount={setRoundCount}
          timerMax={timerMax}
          setTimerMax={setTimerMax}
        />
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
        <Leaderboard
          barVal="bottom"
        />
      </div>
    </div>
  );
}

export default App;

/*
<div className="singlePlayerScore">
  Leaderboard
</div>


<div className="singlePlayerScore">
  { "Score: 0" }
</div>
*/

