import React from 'react';
import './Room.css';
import { calculateScore } from '../utils/questions.js';
import AnswerBox from './Components/AnswerBox.js'
import InputBox from './Components/InputBox.js'
import Leaderboard from './Components/Leaderboard.js'
import QuestionBox from './Components/QuestionBox.js'
import { useLocation, useParams } from 'react-router-dom';
import { getUserKeyForRoom, updateDatabase } from '../utils/utils';
import { useGamePlayers, useGameData } from '../utils/gameData';
     
function Room() {

  //change?
  const { id } = useParams()
  const { state } = useLocation()
  const { isHost } = state
  const userKey = getUserKeyForRoom(id)

  const { playerList } = useGamePlayers(id);

  //TODO: fix this
  const { 
    timerCount, 
    setTimerCount, 
    currQuestion, 
    round, 
    score, 
    setScore, 
    input, 
    gameRun, 
    setGameRun, 
    setInput 
  } = useGameData(id)

  //TODO: score to be moved to database, restructure this when I restructure game data
  const handleSubmit = () => {
    setGameRun(false);
    const path = 'rooms/' + id + '/playerIDs/' + userKey + '/score'
    const newScore = calculateScore(input, currQuestion)
    const self = playerList.find((element) => {
      return element.key === userKey;
    })

    //delete after restructure
    setScore(newScore);

    updateDatabase(path, newScore + self.score)
  }

  //end game value here?
  const handleNext = () => {
    const path = 'rooms/' + id + '/currentRound'
    updateDatabase(path, round + 1)
  }

  return (
    //TODO: add a end of game screen, will look similar to answer box, and could use the same with a little tweaking. 
    //      { gamerun and current round < round count } => answer box, { current round >= round count } => post-game box
    //      will include a button which routes back to home, as well as displaying who won, component will add to leaderbox
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