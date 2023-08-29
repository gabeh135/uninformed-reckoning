import { useEffect, useState } from "react";
import { db } from './firebase';
import { ref, get, child, onValue } from 'firebase/database';
import { snapshotToArray } from './utils';

//TODO: make only host access this
const questionList = await getQuestions();

export function calculateScore(input, question) {
  const given = Number(input);
  const expected = Number(question.answer);

  if (given <= 0) {
    return 0;
  }

  let baseScore;

  if (given < expected) {
    baseScore = 1 - (Math.log(expected) - Math.log(given));
  } else if (given > expected) {
    const logGiven = (2 * expected) - given;
    baseScore = 1 - (Math.log(expected) - Math.log(logGiven));
  } else {
    baseScore = 1;
  }

  return baseScore > 0 ? Math.floor(5000 * baseScore) : 0;
}

//TODO: get rid of snapshotToArray
export async function getQuestions() {
  const dbRef = ref(db);
  return get(child(dbRef, `/questions`)).then((snapshot) => {
    if (snapshot.exists()) {
      return snapshotToArray(snapshot);
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

export function setGameQuestions(roundCount) {
  const gameQuestions = questionList
    .sort(() => Math.random() - 0.5)
    .slice(0, roundCount);
  return gameQuestions;
}

//TODO: move to gameData
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