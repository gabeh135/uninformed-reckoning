import { db } from './firebase';
import { ref, get, child } from 'firebase/database';
import { snapshotToArray } from './utils';

const scoreMultiplier = 500;
var questionList = await getQuestions();

export function calculateScore(input, question) {
  const given = Number(input);
  const expected = Number(question.answer);

  if (given <= 0) {
    return 0;
  }

  let baseScore;

  if (given < expected) {
    baseScore = 1 - ((Math.log(expected) / Math.log(5)) - (Math.log(given) / Math.log(5)));
  } else if (given > expected) {
    baseScore = 1 - ((Math.log(given) / Math.log(4)) - (Math.log(expected) / Math.log(4)));
  } else {
    baseScore = 1;
  }

  return baseScore > 0 ? Math.floor(scoreMultiplier * baseScore) : 0;
}

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

export function getGameQuestions(roundCount) {
  const gameQuestions = questionList
    .sort(() => Math.random() - 0.5)
    .slice(0, roundCount);
  return gameQuestions;
}