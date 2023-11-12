import React, { useState } from 'react'
import './Home.css';
import { useNavigate } from 'react-router-dom'
import { createNewRoom, getHostRoomID, getUserKeyForRoom, verifyUserName, writeToDatabase } from '../utils/utils';
import { db } from '../utils/firebase';
import { ref, set } from 'firebase/database';

function Home() {
    const [name, setName] = useState("");
    const [hostKey, setHostKey] = useState(0);
    const [rounds, setRounds] = useState(3);
    const [maxTime, setMaxTime] = useState(20);
    const [hostToggle, setHostToggle] = useState(true)
    const navigate = useNavigate()

    const handleRoom = async (e) => {
        e.preventDefault();
        var roomID;
        var hostRoomKey = hostKey;
        if (hostToggle) {
            roomID = await createNewRoom(rounds, maxTime);
            hostRoomKey = await createUser(roomID)
        } else {
            roomID = await getHostRoomID(hostRoomKey);
        }

        if (roomID) {
            await createUser(roomID);
            const path = 'lobbies/' + roomID
            navigate(path, { state: { isHost: hostToggle, hostKey: hostRoomKey } });
        }
    }

    async function createUser(id) {
        const userKey = getUserKeyForRoom(id);
        if (hostToggle) {
            writeToDatabase("hostKeys/" + userKey, {
                roomID: id
            })
        }

        set(ref(db, "rooms/" + id + "/playerKeys/" + userKey), {
            score: 0,
            isReady: false,
            isHost: hostToggle,
            currentAnswer: "",
            displayName: verifyUserName(name)
        });
        return userKey;
    }

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
                                    onChange={(e) => setHostKey(e.target.value)}
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