import { useEffect, useState } from 'react'
import { snapshotToArray, getUserKeyForRoom } from './utils'
import { db } from './firebase'
import { get, child, ref, onValue } from 'firebase/database'

const defaultSource = 'https:www.wikipedia.org'

export const useGamePlayers = (id) => {
  const [playerList, setPlayerList] = useState([])
  const [self, setSelf] = useState([])
  useEffect(() => {
    const userKey = getUserKeyForRoom(id)
    const playersRef = ref(db, 'rooms/' + id + '/playerKeys');
    onValue(playersRef, (snapshot) => {
      const players = snapshotToArray(snapshot)
      setPlayerList(players)
      const user = players.find((element) => { 
        return element.key === userKey 
      })
      setSelf(user)
    });
  }, [id]);

  return { playerList, self };
}

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
  const [data, setData] = useState(); 
  var time = 20;

  useEffect(() => {
    const dbRef = ref(db)
    get(child(dbRef, 'rooms/' + id)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const currentRound = data.currentRound

        const roomQuestions = data.questions
        roomQuestions.forEach(function (tempQuestion) {
          if (!tempQuestion.source) {
            tempQuestion.source = "https:www.wikipedia.org";
          }
        });
        setQuestions(roomQuestions)
        setCurrQuestion(roomQuestions[currentRound])
        setRoundCount(data.maxRounds)
        setRound(currentRound)

        time = data.timerMax
        setTimerCount(time)

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

    onValue(ref(db, 'rooms/' + id + '/currentRound'), (snapshot) => {
      let value = snapshot.val()
      setRound(value)
      if (value === (roundCount)) {
        setEndGame(true)
        value = 0
      } else {
        get(child(dbRef, 'rooms/' + id + '/questions')).then((snapshot) => {
          const roomQuestions = snapshot.val()
          if (!roomQuestions[value].source) {
            roomQuestions[value].source = defaultSource;
          }
          setCurrQuestion(roomQuestions[value])
        })
        setGameRun(true)
        setTimerCount(time)
      }
      setScore(0)
      setInput("")
    });
  }, [id])

  return { questions, timerCount, setTimerCount, currQuestion, round, endGame, gameRun, setGameRun, score, setScore, input, setInput, roundCount }
}