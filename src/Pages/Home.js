import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createNewRoom, getUserKeyForRoom, verifyUserName } from '../utils/utils';

import { db } from '../utils/firebase';
import { ref, set } from 'firebase/database';

//TODO: clean up code and add basic styling
function Home() {
    const [rounds, setRounds] = useState(3);
    const [maxTime, setMaxTime] = useState(20);
    const [guestKey, setGuestKey] = useState();
    const [guestName, setGuestName] = useState();

    var roomKey = 0;
    const navigate = useNavigate();

    const handleRoom = async(e) => {
        e.preventDefault();
        roomKey = await createNewRoom(rounds, maxTime);
        createUser(roomKey, true);
    }

    //TODO: add a function that checks whether game exists
    const handleGuest = async(e) => {
        e.preventDefault();
        createUser(guestKey, false)
    }

    //delete me
    const handleName = async(e) => {
        e.preventDefault();
        console.log(verifyUserName(guestName))
    }

    //TODO: if userID already exists for room id, navigate directly to room
    function createUser(roomKey, hostStatus) {
        const path = "/rooms/" + roomKey;
        const userID = getUserKeyForRoom(roomKey);


        //TODO: add full username functionality
        set(ref(db, "rooms/" + roomKey + "/playerIDs/" + userID), {
            score: 0,
            displayName: verifyUserName(guestName)
        });


        //if no given name and userID not found, switch home to new component prompting for name
        //if no game given here, automatically generate one
        //else
        navigate(path, { state: { isHost: hostStatus } });
    }

    return (
        <div>
            <form >
                <input
                    type="number"
                    onChange={(e) => setRounds(e.target.value)}
                    placeholder="set rounds"
                >
                </input>
            </form>
            <form>
                <input
                    type="number"
                    onChange={(e) => setMaxTime(e.target.value)}
                    placeholder="set time"
                >
                </input>
            </form>
            <form>
                <input
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="enter name"
                >
                </input>
            </form>
            <button onClick={handleRoom}>
                {"New Room"}
            </button>
            <form>
                <input 
                    onChange={(e) => setGuestKey(e.target.value)}
                    placeholder="room key"
                >
                </input>
                <button onClick={handleGuest}>
                    {"Go to room"}
                </button>
                <button onClick={handleName}>
                    {"delete me"}
                </button>
            </form>
        </div>
    );
}

export default Home;