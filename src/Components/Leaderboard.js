import './css/Leaderboard.css' 
import React, { useState } from 'react';
import { getHighScore, getPlayerScore } from '../Players.js';

export const Leaderboard = ( {barVal, roundCount, setRoundCount, timerMax, setTimerMax} ) => {   
    const [lbRounds, setLbRounds] = useState(roundCount);
    const [lbTime, setLbTime] = useState(timerMax);
    
    //temporary display of highscore
    const handleLB = (e) => {
        e.preventDefault();
        if (lbRounds > 0) {
            setRoundCount(lbRounds);
            alert("Highscore for " + lbRounds + " rounds is: " + getHighScore());
        }
    }
    const handleTime = (e) => {
        e.preventDefault();
        if (lbTime > 0) {
            setTimerMax(lbTime);
        }
    }

    return (
        <div className="singlePlayerScore">
            { barVal === "top" ? (
                <div className="topBar">
                    <form >
                        <button onClick={handleLB} >
                            { roundCount + " rnds"}
                        </button>
                        <input 
                            type="number"
                            onChange={(e) => setLbRounds(e.target.value)}
                        >
                        </input>
                    </form>
                    <form>
                        <button onClick={handleTime} >
                            { timerMax + " seconds"}
                        </button>
                        <input 
                            type="number"
                            onChange={(e) => setLbTime(e.target.value)}
                        >
                        </input>
                    </form>
                </div>
            ) : (
                <div className="bottomBar">
                    {"Score: " + getPlayerScore()}
                </div>
            ) }
        </div>    
    );
}

export default Leaderboard;
