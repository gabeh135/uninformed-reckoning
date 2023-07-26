import React, { useEffect } from 'react';
import './css/QuestionBox.css';

export const QuestionBox = ({ currQuestion, round, timerCount, setTimerCount, gameRun, newRound, handleSubmit }) => {
    useEffect(() => {
        const time =
            gameRun && timerCount > 0 && setTimeout(() => setTimerCount(timerCount - 1), 1000);
        if (timerCount === 0) {
            handleSubmit();
        }
        return () => clearInterval(time);
    }, [timerCount]);

    return (
        <div className="infoContainer">
            <div className="questionBox">
                <div>
                    {"Question " + (round + 1)}
                </div>
                <div className="prompt">
                    {currQuestion.prompt + "? "}
                </div>
            </div>
            <div className="endContainer">
                {gameRun ? (
                    <div className="timer">
                        {timerCount}
                    </div>
                ) : (
                    <button onClick={newRound} className="newButton">
                        Next Round
                    </button>
                )}
            </div>
        </div>
    );
}

export default QuestionBox;