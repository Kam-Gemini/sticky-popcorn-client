import { Routes, Route, NavLink } from 'react-router'

import AllMovies from './components/AllMovies/AllMovies'
import SingleMovie from './components/SingleMovie/SingleMovie'
import Filters from './components/NavMenu/Filters'

function App() {

  return (
    <>
      <nav>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<AllMovies />} />
          <Route path="/movies/:movieId" element={<SingleMovie />} />
        </Routes>
      </main>
    </>
  )
}

export default App
