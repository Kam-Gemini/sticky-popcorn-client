import { Routes, Route, NavLink } from 'react-router'

import AllMovies from '../components/AllMovies/AllMovies'

function App() {

  return (
    <>
      <nav>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<AllMovies />} />
        </Routes>
      </main>
    </>
  )
}

export default App
