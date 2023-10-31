import React, { useEffect, useState } from 'react'
import './Home.css'
import { getUserKeyForRoom, snapshotToArray } from '../utils/utils'
import { useNavigate } from 'react-router-dom'
import { updateDatabase } from '../utils/utils'

import { db } from '../utils/firebase'
import { onValue, ref } from 'firebase/database'

//move to utils or gamedata
const useLobbyState = (roomKey, hostToggle) => {
    const [numReady, setNumReady] = useState(0);
    const [numPlayers, setNumPlayers] = useState(1);
    const navigate = useNavigate()

    useEffect(() => {
        onValue(ref(db, 'rooms/' + roomKey + '/playerIDs'), (snapshot) => {
            const playerList = snapshotToArray(snapshot)
            const numberReady = playerList.filter((player) => (
                player.isReady === true)).length
            setNumReady(numberReady)
            setNumPlayers(playerList.length)

            if (numberReady > 0 && (numberReady === playerList.length)) {
                const path = 'rooms/' + roomKey
                navigate(path, { state: { isHost: hostToggle } });
            }
        });
    }, [roomKey])
    return { numReady, numPlayers };
}

export const Lobby = ({ hostToggle, roomKey, hostID }) => {
    const [ ready, setReady ] = useState(false);
    const { numReady, numPlayers } = useLobbyState(roomKey, hostToggle);
    const userID = getUserKeyForRoom(roomKey)

    function handleReady() {
        if (!ready) {
            const path = "/rooms/" + roomKey + "/playerIDs/" + userID + "/isReady"
            updateDatabase(path, true)
        }
        setReady(true)
    }

    //TODO: if player is host, add functionality to start game
    //TODO: display room key somewhere
    return (
        <div className="lobby-container">
            <div className="lobby-info">
                <div>
                    {"Host ID: " + hostID}
                </div>
                <div className="ready-info">
                    {numReady + "/" + numPlayers + " players ready"}
                </div>
            </div>

            <button onClick={handleReady} className={ready ? "go-locked" : "go-button"}>
                Ready
            </button>

        </div>
    );
}

export default Lobby;