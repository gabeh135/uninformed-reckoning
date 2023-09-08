import React, { useEffect, useState } from 'react'
import './Home.css'
import { getUserKeyForRoom, snapshotToArray } from '../utils/utils'
import { useNavigate } from 'react-router-dom'
import { updateDatabase } from '../utils/utils'

import { db } from '../utils/firebase'
import { onValue, ref} from 'firebase/database'

//move to utils or gamedata
const useLobbyState = (roomID, hostToggle) => {
    const [ numReady, setNumReady ] = useState(0);
    const [ numPlayers, setNumPlayers ] = useState(1);
    const navigate = useNavigate()
    
    useEffect(() => {
        onValue(ref(db, 'rooms/' + roomID + '/playerIDs'), (snapshot) => {
            const playerList = snapshotToArray(snapshot)
            const numberReady = playerList.filter((player) => (
                player.isReady === true)).length
            setNumReady(numberReady)
            setNumPlayers(playerList.length)

            if (numberReady > 0 && (numberReady === playerList.length)) {
                const path = 'rooms/' + roomID
                navigate(path, { state: { isHost: hostToggle } });
            }
        });
    }, [roomID])
    return { numReady, numPlayers };
}

export const Lobby = ({ hostToggle, roomID }) => {
    const [ ready, setReady ] = useState(false);
    const { numReady, numPlayers } = useLobbyState(roomID, hostToggle);
    const userKey = getUserKeyForRoom(roomID)

    function handleReady() {
        if (!ready) {
            const path = "/rooms/" + roomID + "/playerIDs/" + userKey + "/isReady"
            updateDatabase(path, true)
        }
        setReady(true)
    }

    //TODO: if player is host, add functionality to start game
    //TODO: display room key somewhere
    return (
        <div>
            <div>
                {numReady + "/" + numPlayers + " players ready"}
            </div>
            <button onClick={handleReady}>
                Ready
            </button>
            <div>
                {"Room key: " + roomID}
            </div>
        </div>
    );
}

export default Lobby;