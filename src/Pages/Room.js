import React from 'react';
import './Room.css';
import { calculateScore } from '../utils/questions.js';
import Display from './Display.js'
import AnswerBox from './GameComponents/AnswerBox.js'
import InputBox from './GameComponents/InputBox.js'
import Leaderboard from './GameComponents/Leaderboard.js'
import QuestionBox from './GameComponents/QuestionBox.js'
import ResultBox from './GameComponents/ResultBox.js'
import ResultInfo from './GameComponents/ResultInfo.js'

import { useLocation, useParams } from 'react-router-dom';
import { getUserKeyForRoom, updateDatabase } from '../utils/utils';
import { useGamePlayers, useGameData } from '../utils/gameData';
import { getGameQuestions } from '../utils/questions.js';

function Room() {
  const { id } = useParams()
  const { state } = useLocation()
  const { isHost } = state

  const userKey = getUserKeyForRoom(id)
  const { playerList, self } = useGamePlayers(id);

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
    setInput,
    roundCount
  } = useGameData(id)


  const handleSubmit = () => {
    setGameRun(false);
    const path = 'rooms/' + id + '/playerKeys/' + userKey
    const newScore = calculateScore(input, currQuestion)

    setScore(newScore);
    updateDatabase((path + '/score'), newScore + self.score)
    updateDatabase((path + '/currentAnswer'), input)
  }

  const handleNext = () => {
    const path = 'rooms/' + id
    playerList.forEach(function(player) {
      const path = 'rooms/' + id + '/playerKeys/' + player.key
      updateDatabase((path + '/currentAnswer'), "");
    })
    updateDatabase(path + '/currentRound', round + 1)
  }

  const handleReplay = () => {
    const path = 'rooms/' + id
    
    playerList.forEach(function (player) {
        updateDatabase((path + '/playerKeys/' + player.key + '/isReady'), false);
    })
    updateDatabase((path + '/questions'), getGameQuestions(roundCount));
    updateDatabase((path + '/currentRound'), 0);
  }

  if (endGame) {
    return (
      <div className="room-box">
        <Display
          path={"/rooms/" + id + "/playerKeys/" + userKey + "/hasQuit"}
          enableHome={true}
          message={self.displayName}
        />
        {/* <div className="name-display">
          { self.displayName }
        </div> */}
        <div className="game-box">
          <ResultInfo 
            self={self}
          />
          <ResultBox
            playerList={playerList}
            userKey={userKey}
            isHost={isHost}
            id={id}
            handleReplay={handleReplay}
          />

        </div>
        <div className="scoreboard">
          <Leaderboard
            playerList={playerList}
            gameRun={gameRun}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="room-box">
      <Display
          path={"/rooms/" + id + "/playerKeys/" + userKey + "/hasQuit"}
          enableHome={true}
          message={self.displayName}
      />
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
          playerList={playerList}
          gameRun={gameRun}
        />
      </div>
    </div>
  );
}

export default Room;