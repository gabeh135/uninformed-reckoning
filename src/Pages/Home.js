import React, { useState } from 'react'
import './Home.css';
import { createNewRoom, getUserKeyForRoom, verifyUserName } from '../utils/utils';
import { db } from '../utils/firebase';
import { ref, set } from 'firebase/database';
import { Lobby } from './Lobby'

//TODO: structure data similar to how I will structure data in lobby
function Home() {
    const [name, setName] = useState("");
    const [roomID, setRoomID] = useState(0);
    const [rounds, setRounds] = useState(3);
    const [maxTime, setMaxTime] = useState(20);
    const [hostToggle, setHostToggle] = useState(true)
    const [inLobby, setInLobby] = useState(false);

    const handleRoom = async (e) => {
        e.preventDefault();
        if (hostToggle) {
            const roomKey = await createNewRoom(rounds, maxTime);
            setRoomID(roomKey)
            createUser(roomKey)
        } else {
            createUser(roomID)
        }
        setInLobby(true)
    }

    //TODO: handle joining in progress, game does not exist, game over
    function createUser(key) {
        const userID = getUserKeyForRoom(key);
        console.log(key)

        //TODO: add checking if name exists
        set(ref(db, "rooms/" + key + "/playerIDs/" + userID), {
            score: 0,
            isReady: false,
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
                    roomID={roomID}
                />
            </div>
        </div>
    )
    //TODO: fix the !hostStatus
    //TODO: handle joining game in progress
    return (
        <div>
            <div className="display-container">
                Uninformed Reckoning
            </div>
            <div className="home-box">
                <div className="toggle-container">
                    {!hostToggle ? (
                        <>
                            <button
                                className="toggle-button"
                                onClick={() => setHostToggle(true)}
                            >
                                Create Game
                            </button>
                            <div className="toggle-item">
                                <div className="toggle-text">Join Game</div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="toggle-item">
                                <div className="toggle-text">Create Game</div>
                            </div>
                            <button
                                className="toggle-button"
                                onClick={() => setHostToggle(false)}
                            >
                                Join Game
                            </button>
                        </>
                    )}
                </div>
                <div className="input-container">
                    <div className="form-container">
                        {hostToggle ? (
                            <form className="input-bubble">
                                <input 
                                    type="number"
                                    min="3"
                                    max="9"
                                    onChange={(e) => setRounds(e.target.value)}
                                    placeholder="Enter number of rounds"
                                />
                                <input
                                    type="number"
                                    min="20"
                                    max="60"
                                    onChange={(e) => setMaxTime(e.target.value)}
                                    placeholder="Enter amount of time"
                                />
                            </form>
                        ) : (
                            <form className="input-bubble">
                                <input
                                    onChange={(e) => setRoomID(e.target.value)}
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