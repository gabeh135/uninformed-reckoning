import React from 'react';
import { Link } from 'react-router-dom';
import './css/AnswerBox.css';

//const max = playerList.reduce((prev, current) => (prev.score > current.score) ? prev : current)

//TODO: opening does not change link color
export const AnswerBox = ({ score, currQuestion, input, timerCount }) => {
    console.log(currQuestion);
    return (
        <div className="answerContainer">
            <div className="answer-prompt">
                {currQuestion.answer.toLocaleString() + " " + currQuestion.unit}
            </div>
            {timerCount === 0 ? (
                <div className="answer">
                    {"You ran out of time!"}
                </div>
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
            <div className="score">
                {score + " point"}
                {score !== 1 ? ("s") : ("")}
            </div>
        </div>
    );
}

export default AnswerBox