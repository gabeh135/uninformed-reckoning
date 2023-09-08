import React from 'react'
import './Home.css';

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
        //const roomKey = await createNewRoom(rounds, maxTime);
        //setRoomID(roomKey)
        if (hostToggle) {
            const roomKey = await createNewRoom(rounds, maxTime);
            setRoomID(roomKey)
            createUser(roomKey)
        } else {
            createUser(roomID)
        }
        setInLobby(true)
    }

    //TODO: if userID already exists for room id, navigate directly to room
    function createUser(key) {
        //const path = "/rooms/" + roomID;
        const userID = getUserKeyForRoom(key);
        console.log(key)


        //TODO: add full username functionality
        set(ref(db, "rooms/" + key + "/playerIDs/" + userID), {
            score: 0,
            isReady: false,
            displayName: verifyUserName(name)
        });


        //navigate(path, { state: { isHost: hostStatus } });
    }
    
    if (inLobby) return (
        <div>
            <div className="display-container">
                Uknown Reckoning
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
                Uknown Reckoning
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

/*

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
                </form>*/