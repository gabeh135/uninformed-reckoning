import { Route, Routes } from 'react-router-dom';
import Room  from './Pages/Room.js';
import Home from './Pages/Home.js'

/*TODO:
**finish multiplayer
**restructure database and room's data structure
**add temporary host functions such as next round and end game
**add a scoreboard to bottom of room
**room path to use a shorter string of numbers, maybe useLocations's key or host's id?

*add permanent next round button and scoreboard css
*adjustments to the ui/fix timer/redo css
*add a return to home screen
*ui for homescreen and a game-over screen
*more questions
*finalize scoring
*add a permanent leaderboard in database with highscores per round number
*    *building off of leaderboard, make presets for timer and number of rounds
*/
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rooms/:id" element={<Room />} />
    </Routes>
  )
}

export default App;