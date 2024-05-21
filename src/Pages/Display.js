import React from 'react';
import './Display.css';
import { FaHome } from "react-icons/fa";
import { IconContext } from "react-icons";
import { updateDatabase } from '../utils/utils';

export const Display = ({ path, message, enableHome }) => {
    const handleExit = (e) => {
        e.preventDefault();
        updateDatabase(path, true);
    }

    return (
        <div>
            { enableHome ? (
                <div className="display-container">
                    <div className="display-message">
                        {message}
                    </div>
                    <IconContext.Provider value={{ color: "#ffffff", className: "home-icon" }}>
                        <FaHome onClick={handleExit}/>
                    </IconContext.Provider>
                </div>
            ) : (
                <div className="home-container">
                    <div className="display-message">
                        {message}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Display;