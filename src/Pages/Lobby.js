import React, { useEffect, useState } from 'react'
import './Home.css'
import { getUserKeyForRoom, snapshotToArray } from '../utils/utils'
import { useNavigate } from 'react-router-dom'
import { useLocation, useParams } from 'react-router-dom';
import { updateDatabase } from '../utils/utils'

import { db } from '../utils/firebase'
import { onValue, ref } from 'firebase/database'
import Display from './Display';

const useLobbyState = (id, isHost, userKey) => {
    const [numReady, setNumReady] = useState(0);
    const [numPlayers, setNumPlayers] = useState(1);
    const [username, setUsername] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        onValue(ref(db, 'rooms/' + id + '/playerKeys'), (snapshot) => {
            const playerList = snapshotToArray(snapshot)

            if (playerList.filter((player) => (
               (player.isHost | (player.key === userKey)) & 
                player.hasQuit)).length !== 0) navigate("/")

            const numberReady = playerList.filter((player) => (
                player.isReady === true & player.hasQuit === false)).length

            const numberPlayers = playerList.filter((player) => (
                player.hasQuit === false)).length

            setNumReady(numberReady)
            setNumPlayers(numberPlayers)

            setUsername(playerList.filter((player) => (player.key === userKey))[0].displayName)
                     
            if (numberReady > 0 && (numberReady === numberPlayers)) {
                const path = 'room'
                navigate(path, { state: { isHost: isHost } });
            }
        });
    }, [id])
    return { numReady, numPlayers, username };
}

function Lobby() {
    const { id } = useParams()
    const { state } = useLocation()
    const { isHost, hostKey } = state
    const userKey = getUserKeyForRoom(id)

    const [ ready, setReady ] = useState(false);
    const { numReady, numPlayers, username } = useLobbyState(id, isHost, userKey);

    const handleReady = () => {
        if (!ready) {
            const path = "/rooms/" + id + "/playerKeys/" + userKey
            updateDatabase(path + "/score", 0)
            updateDatabase(path + "/isReady", true)
        }
        setReady(true)
    }

    return (
        <div className="display-box">
            <Display
                message={username}
                path={"/rooms/" + id + "/playerKeys/" + userKey + "/hasQuit"}
                enableHome={true}
            />
            <div className="home-box">
                <div className="lobby-container">
                    <div className="lobby-info">
                        <div>
                            {"Host Key: " + hostKey}
                        </div>
                        <div className="ready-info">
                            {numReady + "/" + numPlayers + " players ready"}
                        </div>
                    </div>
                    <button onClick={handleReady} className={ready ? "go-locked" : "go-button"}>
                        Ready
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Lobby;