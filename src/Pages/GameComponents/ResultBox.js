import React, { useEffect } from 'react';
import './css/ResultBox.css';
import { useNavigate } from 'react-router-dom'
import { updateDatabase } from '../../utils/utils';

import { db } from '../../utils/firebase'
import { onValue, ref } from 'firebase/database'
import { getGameQuestions } from '../../utils/questions';

export const ResultBox = ({ playerList, userKey, isHost, id, roundCount }) => {
    const navigate = useNavigate()

    useEffect(() => {
        var hostKey;
        playerList.forEach(function (player) {
            if (player.isHost) {
                hostKey = player.key;
            }
        })

        onValue(ref(db, 'rooms/' + id + '/playerKeys/' + userKey), (snapshot) => {
            const playerSnapshot = snapshot.val();
            console.log(playerSnapshot)
            if (playerSnapshot.isReady == false) {
                navigate('/lobbies/' + id, { state: { isHost: isHost, hostKey: hostKey } });
            }
        });
    }, [id])

    function getWinningPlayer() {
        const winningPlayer = playerList.reduce((prev, current) => (
            prev.score > current.score) ? prev : current);
        return winningPlayer
    }
    function getMessage() {
        const winner = getWinningPlayer();
        return ((winner.key === userKey) ? "You won" : (
            winner.displayName + " wins"
        ));
    }

    function getScoreMessage() {
        const winner = getWinningPlayer()
        const scoreMessage = (winner.key === userKey) ? "You" : "They"
        return scoreMessage + " had " + winner.score + " points"
    }

    const handleReplay = () => {
        const path = 'rooms/' + id
        
        playerList.forEach(function (player) {
            updateDatabase((path + '/playerKeys/' + player.key + '/isReady'), false);
        })
        updateDatabase((path + '/questions'), getGameQuestions(roundCount));
        updateDatabase((path + '/currentRound'), 0);
    }

    return (
        <div className="result-box">
            <div className="resultContainer">
                <div className="box-message">
                    {getMessage()}
                </div>
                <div className="subMessage">
                    Game Over!
                </div>
                <div className="scoreMessage">
                    {getScoreMessage()}
                </div>
            </div>
            {isHost ? (
                <button onClick={handleReplay} className="replayButton">
                    Play Again
                </button>) : ("")
            }
        </div>
    );
}

export default ResultBox