import React from 'react';
import './css/ResultBox.css';

//handle both players having same score
//change up styling in box
//If you win, "game over" goes in very top, nothing in subMessage, 
//      "You win!" goes in scoreMessage
export const ResultBox = ({ playerList, userKey }) => {
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

    //handle only 1 point
    function getScoreMessage() {
        const winner = getWinningPlayer()
        const scoreMessage = (winner.key === userKey) ? "You" : "They"
        return scoreMessage + " had " + winner.score + " points"
    }

    return (
        <div className="resultContainer">
            <div className="message">
                {getMessage()}
            </div>
            <div className="subMessage">
                Game Over!
            </div>
            <div className="scoreMessage">
                {getScoreMessage()}
            </div>
        </div>
    );
}

export default ResultBox