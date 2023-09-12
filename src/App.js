import { Route, Routes } from 'react-router-dom';
import Room  from './Pages/Room.js';
import Home from './Pages/Home.js'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rooms/:id" element={<Room />} />
    </Routes>
  )
}

export default App;