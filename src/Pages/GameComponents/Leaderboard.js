import React from 'react';
import './css/Leaderboard.css'

//TODO: add stuff on top here too
export const Leaderboard = ({ barVal, playerList }) => {
    return (
        <table style={{ width: 500 }}>
            <tbody>
                <tr>
                {playerList.map((player, playerKey) =>
                    <td key={playerKey}>
                        {player.displayName + ": " + player.score}
                    </td>)}
                </tr>
            </tbody>
        </table>
    );
}

export default Leaderboard;
