import React from 'react';
import './css/Leaderboard.css'

export const Leaderboard = ({ playerList, gameRun }) => {
    return (
        <table className="leaderboard">
            <tbody>
                <tr>
                    {playerList.map((player, playerKey) =>
                        <td key={playerKey}>
                            <div className="leaderboard-player">
                                <div className="leaderboard-info">
                                    {player.displayName + ": " + player.score}
                                </div>
                                <div className="player-answer">
                                    {gameRun ? ("   ") : (player.currentAnswer)}
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
