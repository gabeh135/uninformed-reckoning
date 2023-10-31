import { db } from './firebase';
import { ref, child, push, set, get, update } from 'firebase/database';
import { setGameQuestions } from './questions.js';

export async function getSnapshotVal(path) {
    const dbRef = ref(db);
    get(child(dbRef, path)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            return snapshot.val();
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

export async function getHostRoomKey(hostID) {
    const dbRef = ref(db);
    var data;
    await get(child(dbRef, 'hostIDs/' + hostID + '/roomKey')).then((snapshot) => {
        if (snapshot.exists()) {
            console.log('found snapshot')
            console.log(snapshot.val())
            data = snapshot.val();
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
    return data;
}

export async function writeToDatabase(path, value) {
    set(ref(db, path), value);
}

//TODO: add functionality for array of paths and corrosponding values
export async function updateDatabase(path, value) {
    const updates = {};
    updates[path] = value
    return update(ref(db), updates);
}

export function getUserKeyForRoom(roomID) {
    //check cookie store for room id
    const storageKey = "userKey." + roomID
    const existingUserID = localStorage.getItem(storageKey);
    if (existingUserID) {
        return existingUserID
    } else {
        //generate unique id, math.random for now
        const uniqueID = String(Math.floor(Math.random() * 1000000));
        localStorage.setItem(storageKey, uniqueID);
        return uniqueID;
    }
    //if exists, we already have a user key returning
    //if doesn't, we need to create a unique string, store it, return it. 
    //per room, every time we call this we get this
}

//TODO: add more first and last names down the road
//TODO: add max name length
//TODO: check that name doesnt already exist
export function verifyUserName(name) {
    function getIndex(array) {
        return array[Math.floor(Math.random() * array.length)]
    }
    const names = {
        firstNames: ['Happy', 'Blue', 'Golden', 'Green', 'Shy', 'Baggier'],
        lastNames: ['Gecko', 'Tree', 'Dragon', 'Otter', 'Lamp', 'Wolf']
    }
    return (name === undefined || name === "") ? (
        getIndex(names.firstNames) + " " + getIndex(names.lastNames)
    ) : (name)
}

export async function createNewRoom(rounds, time) {
    const roomKey = push(child(ref(db), 'rooms')).key;
    const path = 'rooms/' + roomKey
    writeToDatabase(path, {
        currentRound: 0,
        numReady: 0,
        maxRounds: rounds,
        playerIDs: "",
        questions: setGameQuestions(rounds),
        timerMax: time
    })
    return roomKey;
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

