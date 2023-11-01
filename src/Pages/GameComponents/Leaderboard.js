import React, { useEffect } from 'react';
import './css/Leaderboard.css'

//TODO: add stuff on top here too
export const Leaderboard = ({ playerList, gameRun }) => {

    //If answer = 0 or null, display nothing
    //Set previous answer to answer when answer box displaying, else display ___
    return (
        <table style={{ width: 500 }} className="leaderboard">
            <tbody>
                <tr>
                    {playerList.map((player, playerKey) =>
                        <td key={playerKey}>
                            <div className="leaderboard-player">
                                <div className="leaderboard-info">
                                    {player.displayName + ": " + player.score}
                                </div>
                                <div className="player-answer">
                                    {gameRun ? ("   ") : (
                                        player.currentAnswer ? (player.currentAnswer) : ("   ")
                                    )}
                                </div>
                            </div>
                        </td>)
                    }
                </tr>
            </tbody>
        </table>
    );
}

export default Leaderboard;
