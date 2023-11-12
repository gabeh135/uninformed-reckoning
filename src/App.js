import { Route, Routes } from 'react-router-dom';
import Room  from './Pages/Room.js';
import Lobby from './Pages/Lobby.js';
import Home from './Pages/Home.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lobbies/:id" element={<Lobby />} />
      <Route path="/lobbies/:id/room" element={<Room />} />
    </Routes>
  )
}

export default App;