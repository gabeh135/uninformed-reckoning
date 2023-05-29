import React, { useEffect } from 'react';
import './TimedQuestion.css';


export const TimedQuestion = ({ currQuestion, count, setCount }) => {
    useEffect(() => {
        count > 0 && setTimeout(() => setCount(count - 1), 1000);
    });

    return (
        <div>
            <h1 className="questionBox">
                { currQuestion.prompt + "? "}
                <span className="timer">
                    { count }
                </span>
            </h1>
        </div>
    );
}