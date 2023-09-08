import { useEffect, useState } from 'react'
import { snapshotToArray } from './utils'
import { db } from './firebase'
import { get, child, ref, onValue } from 'firebase/database'

export const useGamePlayers = (id) => {
  const [playerList, setPlayerList] = useState([])
  useEffect(() => {
    const playersRef = ref(db, 'rooms/' + id + '/playerIDs');
    onValue(playersRef, (snapshot) => {
      const players = snapshotToArray(snapshot)
      setPlayerList(players)
    });
  }, [id]);

  return { playerList };
}

//TODO: restructure down the road, maybe split into multiple
//      there is a lot of redundency here too
//TODO: handle joining a game midway through, it works when questions are going but not on answer box
export const useGameData = (id) => {
  const [questions, setQuestions] = useState([])
  const [currQuestion, setCurrQuestion] = useState([])
  const [round, setRound] = useState(0)
  const [roundCount, setRoundCount] = useState(3)
  const [score, setScore] = useState(0)
  const [input, setInput] = useState("")
  const [gameRun, setGameRun] = useState(true)
  const [endGame, setEndGame] = useState(false)
  const [timerCount, setTimerCount] = useState(20)
  const [timerMax, setTimerMax] = useState(20)

  /*
    const [initialData, setInitialData] = useState({
      questions: [],
      roundCount: 3,
      timerMax: 20,
    })

    const [roundData, setRoundData] = useState({
      currQuestion: [],
      round: 0,
      input: "",
      timerCount: 20,
      gameRun: true,
      roundScore: 0,
    })
  
  
  */

  useEffect(() => {
    const dbRef = ref(db)
    get(child(dbRef, 'rooms/' + id)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const currentRound = data.currentRound

        const roomQuestions = data.questions
        setQuestions(roomQuestions)
        setCurrQuestion(roomQuestions[currentRound])
        setRoundCount(data.maxRounds)
        setRound(currentRound)

        const time = data.timerMax
        setTimerCount(time)
        setTimerMax(time)

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

    //add functionality to check for game end
    onValue(ref(db, 'rooms/' + id + '/currentRound'), (snapshot) => {
      let value = snapshot.val()
      setRound(value)
      //change to functions for end of game
      if (value === (roundCount)) { 
        setEndGame(true)
        value = 0 
      }
      else {
        get(child(dbRef, 'rooms/' + id + '/questions')).then((snapshot) => {
          const roomQuestions = snapshot.val()
          setCurrQuestion(roomQuestions[value])
        })
        setGameRun(true)
        setTimerMax(timerMax)
      }
      setScore(0)
      setInput("")
    });
  }, [id])


  return { questions, timerCount, setTimerCount, currQuestion, round, endGame, score, setScore, input, gameRun, setGameRun, setInput }
}