import React, { useEffect, useState } from 'react'
import './Home.css'
import { getUserKeyForRoom, snapshotToArray } from '../utils/utils'
import { useNavigate } from 'react-router-dom'
import { useLocation, useParams } from 'react-router-dom';
import { updateDatabase } from '../utils/utils'

import { db } from '../utils/firebase'
import { onValue, ref } from 'firebase/database'

const useLobbyState = (id, isHost) => {
    const [numReady, setNumReady] = useState(0);
    const [numPlayers, setNumPlayers] = useState(1);
    const navigate = useNavigate()

    console.log("lobby")

    useEffect(() => {
        onValue(ref(db, 'rooms/' + id + '/playerKeys'), (snapshot) => {
            const playerList = snapshotToArray(snapshot)
            const numberReady = playerList.filter((player) => (
                player.isReady === true)).length
            setNumReady(numberReady)
            setNumPlayers(playerList.length)

            if (numberReady > 0 && (numberReady === playerList.length)) {
                const path = 'room'
                navigate(path, { state: { isHost: isHost } });
            }
        });
    }, [id])
    return { numReady, numPlayers };
}

function Lobby() {
    const { id } = useParams()
    const { state } = useLocation()
    const { isHost, hostKey } = state
    const userKey = getUserKeyForRoom(id)

    const [ ready, setReady ] = useState(false);
    const { numReady, numPlayers } = useLobbyState(id, isHost);
console.log("lobby")
    //TODO: if a player joins the room and the room's host is not there, player is now a "temp host" until host joins

    function handleReady() {
        if (!ready) {
            const path = "/rooms/" + id + "/playerKeys/" + userKey + "/isReady"
            updateDatabase(path, true)
        }
        setReady(true)
    }

    return (
        <div>
            <div className="display-container">
                Uninformed Reckoning
            </div>
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