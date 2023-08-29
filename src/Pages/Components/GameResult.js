import React from 'react';
import './css/GameResult.css';

export const GameResult = ({ playerList, userKey }) => {
    return (
        <div className="resultContainer">
            <div className="endMessage">
                Game Over
            </div>
            <div className="winnerMessage">
                {" " + " wins!"}
            </div>
            <div className="winnerScore">
                {"They had " + "0 points"}
            </div>
        </div>
    );
}

export default AnswerBox