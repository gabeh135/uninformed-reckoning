import { useEffect, useState } from 'react'
import { snapshotToArray } from './utils'
import { db } from './firebase'
import { get, child, ref, onValue } from 'firebase/database'

const defaultSource = 'https:www.wikipedia.org'

export const useGamePlayers = (id) => {
  const [playerList, setPlayerList] = useState([])
  useEffect(() => {
    const playersRef = ref(db, 'rooms/' + id + '/playerKeys');
    onValue(playersRef, (snapshot) => {
      const players = snapshotToArray(snapshot)
      setPlayerList(players)
    });
  }, [id]);

  return { playerList };
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
  const [timerMax, setTimerMax] = useState(20)
  var time = 20;

  useEffect(() => {
    const dbRef = ref(db)
    get(child(dbRef, 'rooms/' + id)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const currentRound = data.currentRound

        const roomQuestions = data.questions
        roomQuestions.forEach(function(tempQuestion) {
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
        setTimerMax(time)

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


  return { questions, timerCount, setTimerCount, currQuestion, round, endGame, gameRun, setGameRun, score, setScore, input, setInput }
}

/*
export const useTestGameData = (id) => {
  //set round data function somewhere
  var initialData;

  //don't pass setGameData, instead create a state "roundData" in room?
  const [ timerCount, setTimerCount ] = useState();
  var testData = { 
    currentRound: 0, 
    questions: [], 
    timerMax: 20, 
    maxRounds: 3
  }
  const [ score, setScore ] = useState(0);
  const [ input, setInput ] = useState("");
  const [ gameRun, setGameRun ] = useState(true); 
  const [ dataTest, setDataTest ] = useState();

  //move timer handler here, instead of handling submit when runs out, simply set gameRun to false
  //   building off of above, replace handleSubmit with a viewer for gameRun
  useEffect(() => {
    const getData = async () => {
      const dbRef = ref(db)
      await get(child(dbRef, 'rooms/' + id)).then((snapshot) => {
        if (snapshot.exists()) {
          const { currentRound, questions, timerMax, maxRounds } = snapshot.val();
          testData = snapshot.val();
          console.log(testData);

          initialData = {
            questions,
            timerMax,
            rounds: maxRounds
          }

          const initialGameData = {
            currQuestion: questions[currentRound],
            round: currentRound,
            endGame: false,
          }

          setDataTest(testData);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    };
    getData();
  }, [id])


  console.log(testData);


  return ( dataTest, timerCount, gameRun);
}
*/