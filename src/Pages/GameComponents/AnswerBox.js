import React from 'react';
import { Link } from 'react-router-dom';
import './css/AnswerBox.css';

export const AnswerBox = ({ score, currQuestion, input, timerCount }) => {
    return (
        <div className="answerContainer">
            <div className="answer-prompt">
                {currQuestion.answer.toLocaleString() + " " + currQuestion.unit}
            </div>
            {timerCount === 0 ? (
                <div />
            ) : (
                <div className="answer">
                    {"You were " + Math.abs(currQuestion.answer - input).toLocaleString() + " away!"}
                </div>
            )}
            <Link to={currQuestion.source}
                target="_blank"
                rel="noopener noreferrer"
                className="source"
            >
                view source
            </Link>
            {timerCount === 0 ? (
                <div className="score">
                    {"You ran out of time!"}
                </div>
            ) : (
                <div className="score">
                    {score + " point"}
                    {score !== 1 ? ("s") : ("")}
                </div>
            )}

        </div>
    );
}

export default AnswerBox