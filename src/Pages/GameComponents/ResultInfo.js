import React from 'react';
import './css/ResultInfo.css';
import { useNavigate } from 'react-router-dom'

export const ResultInfo = ({ self }) => {
    const navigate = useNavigate();
    
    const handleEnd = (e) => {
        e.preventDefault();
        navigate("/")
    }

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
            <div className="buttonContainer">
                <button  className="newButton" onClick={handleEnd}>
                    Exit
                </button>
            </div>
        </div>
    );
}

export default ResultInfo;