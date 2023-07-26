import './css/Leaderboard.css'
import React, { useState } from 'react';
import { createNewRoom } from '../utils/utils';

//extra temporary
import { db } from '../utils/firebase';
import { ref, set } from 'firebase/database';

//this entire component is temporary and will likely change when game rooms implement
export const Leaderboard = ({ barVal, roundCount, setRoundCount, timerMax, setTimerMax }) => {
    const [lbRounds, setLbRounds] = useState(roundCount);
    const [lbTime, setLbTime] = useState(timerMax);

    //changes number of rounds and will display highscore when implemented into datastore
    const handleLB = (e) => {
        e.preventDefault();
        if (lbRounds > 0) {
            setRoundCount(lbRounds);

            //temporary
            set(ref(db, 'testing/roundData'), {
                numRounds: lbRounds
            });
        }
    }

    //changes max timer value
    const handleTime = (e) => {
        e.preventDefault();
        if (lbTime > 0) {
            setTimerMax(lbTime);

            //temporary
            set(ref(db, 'testing/timer'), {
                startVal: lbTime
            });
        }
    }

    //TODO: be able to set a limit for rounds and time,
    //give all this stuff a more permanent home
    const handleRoom = (e) => {
        e.preventDefault();
        createNewRoom(lbRounds, lbTime);
    }

    return (
        <div className="singlePlayerScore">
            {barVal === "top" ? (
                <div className="topBar">
                    <form >
                        <button onClick={handleLB} >
                            {roundCount + " rnds"}
                        </button>
                        <input
                            type="number"
                            onChange={(e) => setLbRounds(e.target.value)}
                        >
                        </input>
                    </form>
                    <form>
                        <button onClick={handleTime}>
                            {timerMax + " seconds"}
                        </button>
                        <input
                            type="number"
                            onChange={(e) => setLbTime(e.target.value)}
                        >
                        </input>
                    </form>
                    <form>
                        <button onClick={handleRoom}>
                            {"New Room"}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="bottomBar">
                    { "Score: 0" }
                </div>
            )}
        </div>
    );
}

export default Leaderboard;
