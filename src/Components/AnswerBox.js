import React from 'react';
import './css/AnswerBox.css';

export const AnswerBox = ({ score, currQuestion, input, timerCount }) => {
    return (
        <div className="answerContainer">
            <div className="prompt">
                {currQuestion.answer.toLocaleString() + " " + currQuestion.unit}
            </div>
            { timerCount === 0 ? (
                <div className="answer">
                    {"You ran out of time!"}
                </div>
            ) : (
                <div className="answer">
                    {"You were " + Math.abs(currQuestion.answer - input).toLocaleString() + " away!"}
                </div>
            ) }
            <div className="score">
                { score + " point" }
                { score !== 1 ? ("s") : ("")}
            </div>
        </div>    
    );
}

export default AnswerBox