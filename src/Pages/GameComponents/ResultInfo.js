import React from 'react';
import './css/ResultInfo.css';

export const ResultInfo = ({ self }) => {
    return (
        <div className="playerContainer">
            <div className="playerBox">
                <div>
                    Your score was:
                </div>
                <div className="message">
                    {self.score + " points"}
                </div>
            </div>
        </div>
    );
}

export default ResultInfo;