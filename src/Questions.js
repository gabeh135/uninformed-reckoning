import { db } from './utils/firebase';
import { ref, get, child } from 'firebase/database';
import { snapshotToArray } from './utils/utils';

const questionList = await getQuestions();
console.log(questionList);

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

export async function getQuestions() {
  const dbRef = ref(db);
  return get(child(dbRef, `/questions`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshotToArray(snapshot);
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
/*
var array = [];
  for (var i = 0; i < roundCount; i++) {
    var random;
    do {
      random = Math.floor(Math.random() * numQuestions);
    }
    while(array.includes(random));
    array.push(random);
  }
*/
}

//make keys for chosen questions be based on database or host player 
export function getGameQuestions(roundCount) {
  const gameQuestions = questionList
    .sort(() => Math.random() - 0.5)
    .slice(0, roundCount);
  return gameQuestions;
}