import React, { useEffect } from 'react';
import './css/Leaderboard.css'

//TODO: add stuff on top here too
export const Leaderboard = ({ playerList, gameRun }) => {

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
                                {gameRun ? ("   ") : (
                                    <div className="player-answer">
                                        {player.currentAnswer ? player.currentAnswer : "   "}
                                    </div>
                                )}
                            </div>

                        </td>)
                    }
                </tr>
            </tbody>
        </table>
    );
}

export default Leaderboard;
