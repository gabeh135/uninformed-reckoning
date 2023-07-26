import { db } from './firebase';
import { ref, child, push, set} from 'firebase/database';
import { getGameQuestions } from '../Questions.js';

var roomKey;

//TODO: be able to specify number of rounds and timer before creating a room, also passing 
//the questions list which is created by the "host" who is the user creating the room. For now I will do this in the top bar.
export async function createNewRoom(rounds, time) {
    //TODO: figure out where I should put this 
    roomKey = push(child(ref(db), 'rooms')).key;

    //TODO: make questions id based, decide if scores array goes here or by player
    set(ref(db, 'rooms/' + roomKey), {
        currentRound: 0,
        maxRounds: rounds,
        playerIDs: "",
        questions: getGameQuestions(rounds),
        scores: "",
        timerMax: time
    });
}

export function snapshotToArray(snapshot) {
    const returnArr = [];
    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;
  
      returnArr.push(item);
    });
    return returnArr;
}