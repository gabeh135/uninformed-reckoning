import React from 'react';
import './Room.css';
import { calculateScore } from '../utils/questions.js';

//TODO: figure out how to turn this into one import if possible/recommended
import AnswerBox from './GameComponents/AnswerBox.js'
import InputBox from './GameComponents/InputBox.js'
import Leaderboard from './GameComponents/Leaderboard.js'
import QuestionBox from './GameComponents/QuestionBox.js'
import ResultBox from './GameComponents/ResultBox.js'
import ResultInfo from './GameComponents/ResultInfo.js'

import { useLocation, useParams } from 'react-router-dom';
import { getUserKeyForRoom, updateDatabase } from '../utils/utils';
import { useGamePlayers, useGameData } from '../utils/gameData';

//TODO: add unique css for post-round screen
//TODO: styling for home page
//TODO: restructure data + imports
//TODO: restructure css (resultInfo + questionBox, resultBox + answerBox)
//TODO: timer doesn't count down at the moment, hide timer when answerBox

//when finished with TODO's: add a lot more questions, finish scoring, dial for timer, touch up styling for everything, 
//                           slight background gradient, add a leaderboard,
//                           go back button, add something saying 'waiting for host'
function Room() {
  const { id } = useParams()
  const { state } = useLocation()
  const { isHost } = state

  const userKey = getUserKeyForRoom(id)
  const { playerList } = useGamePlayers(id);

  const {
    timerCount,
    setTimerCount,
    currQuestion,
    round,
    endGame,
    score,
    setScore,
    input,
    gameRun,
    setGameRun,
    setInput
  } = useGameData(id)

  const handleSubmit = () => {
    setGameRun(false);
    const path = 'rooms/' + id + '/playerIDs/' + userKey + '/score'
    const newScore = calculateScore(input, currQuestion)
    const self = playerList.find((element) => {
      return element.key === userKey;
    })

    setScore(newScore);
    updateDatabase(path, newScore + self.score)
  }

  const handleNext = () => {
    const path = 'rooms/' + id + '/currentRound'
    updateDatabase(path, round + 1)

  }

  if (endGame) {
    return (
      <div>
        <div className="game-box">
          <ResultInfo 
            self={playerList.find((element) => {
              //move this function into ResultInfo
              return element.key === userKey;
            })}
          />
          <ResultBox
            playerList={playerList}
            userKey={userKey}
          />

        </div>
        <div className="scoreboard">
          <Leaderboard
            barVal="bottom"
            playerList={playerList}
          />
        </div>
      </div>
    )
  }
  return (
    <div>
      <div className="game-box">
        <QuestionBox
          currQuestion={currQuestion}
          timerCount={timerCount}
          setTimerCount={setTimerCount}
          round={round}
          gameRun={gameRun}
          handleSubmit={handleSubmit}
          isHost={isHost}
          handleNext={handleNext}
        />

        {gameRun ? (
          <InputBox
            input={input}
            setInput={setInput}
            currQuestion={currQuestion}
            handleSubmit={handleSubmit}
          />
        ) : (
          <AnswerBox
            input={input}
            currQuestion={currQuestion}
            score={score}
            timerCount={timerCount}
          />
        )}
      </div>
      <div className="scoreboard">
        <Leaderboard
          barVal="bottom"
          playerList={playerList}
        />
      </div>
    </div>
  );
}

export default Room;