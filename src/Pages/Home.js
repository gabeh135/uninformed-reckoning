import React, { useState } from 'react'
import './Home.css';
import { createNewRoom, getHostRoomKey, getUserKeyForRoom, verifyUserName, writeToDatabase } from '../utils/utils';
import { db } from '../utils/firebase';
import { ref, set } from 'firebase/database';
import { Lobby } from './Lobby'



//TODO: structure data similar to how I will structure data in lobby
function Home() {
    const [name, setName] = useState("");

    const [hostID, setHostID] = useState(0);
    const [roomKey, setRoomKey] = useState(0);


    const [rounds, setRounds] = useState(3);
    const [maxTime, setMaxTime] = useState(20);
    const [hostToggle, setHostToggle] = useState(true)
    const [inLobby, setInLobby] = useState(false);

    const handleRoom = async (e) => {
        e.preventDefault();
        if (hostToggle) {
            const tempKey = await createNewRoom(rounds, maxTime);
            setRoomKey(tempKey)
            createUser(tempKey)
            setInLobby(true);
        } else {
            const tempKey = await getHostRoomKey(hostID);
            if (tempKey) {
                setRoomKey(tempKey)
                createUser(tempKey);
                setInLobby(true);
            }
        }
    }

    //TODO: handle joining in progress, game does not exist, game over
    function createUser(key) {
        const userID = getUserKeyForRoom(key);
        if (hostToggle) {
            setHostID(userID);
            writeToDatabase("hostIDs/" + userID, {
                roomKey: key
            })
        }
        console.log(key)

        //TODO: add checking if name exists
        set(ref(db, "rooms/" + key + "/playerIDs/" + userID), {
            score: 0,
            isReady: false,
            currentAnswer: "",
            displayName: verifyUserName(name)
        });
    }

    if (inLobby) return (
        <div>
            <div className="display-container">
                Uninformed Reckoning
            </div>
            <div className="home-box">
                <Lobby
                    hostToggle={hostToggle}
                    roomKey={roomKey}
                    hostID={hostID}
                />
            </div>
        </div>
    )

    return (
        <div>
            <div className="display-container">
                Uninformed Reckoning
            </div>
            <div className="home-box">
                <div className="toggle-container">
                    <button
                        className={hostToggle ? "toggle-active" : "toggle-button"}
                        onClick={() => setHostToggle(true)}
                    >
                        Create
                    </button>
                    <button
                        className={hostToggle ? "toggle-button" : "toggle-active"}
                        onClick={() => setHostToggle(false)}
                    >
                        Join
                    </button>
                </div>
                <div className="input-container">
                    <div className="form-container">
                        {hostToggle ? (
                            <form className="input-bubble">
                                <input
                                    type="number"
                                    min="3"
                                    max="9"
                                    onChange={(e) => { setRounds(e.target.value) }}
                                    placeholder="Enter rounds: "
                                    id="rnd"
                                />
                                <input
                                    type="number"
                                    min="20"
                                    max="60"
                                    onChange={(e) => setMaxTime(e.target.value)}
                                    placeholder="Enter seconds: "
                                    id="tmr"
                                />
                            </form>
                        ) : (
                            <form className="input-bubble">
                                <input
                                    onChange={(e) => setHostID(e.target.value)}
                                    placeholder="Enter a room key"
                                />
                            </form>
                        )}
                    </div>
                    <div>
                        <form className="input-bubble">
                            <input
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter a nickname"
                            >
                            </input>
                        </form>
                    </div>
                    <div>
                        <button className="go-button" onClick={handleRoom}>
                            {!hostToggle ? "Join" : "Create"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;