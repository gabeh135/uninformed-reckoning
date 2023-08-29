import React from 'react';
import './css/GameInfo.css';

export const GameInfo = ({ playerList, userKey }) => {
    const handleEnd = (e) => {
        e.preventDefault();
        alert("game over!")
    }

    return (
        <div className="infoContainer">
            <div className="playerBox">
                <div>
                    Your score was:
                </div>
                <div className="message">
                    {" points"}
                </div>
            </div>
            <div className="buttonContainer">
                <button  className="newButton" onClick={handleEnd}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default GameInfo;