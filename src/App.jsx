import { Routes, Route, NavLink } from 'react-router'

import AllMovies from './components/AllMovies/AllMovies'
import SingleMovie from './components/SingleMovie/SingleMovie'
import Signup from './components/Signup/Signup'
//import Signin from './components/Signin/Signin'

function App() {

  return (
    <>
      <nav>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<AllMovies />} />
          <Route path="/movies/:movieId" element={<SingleMovie />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="signin" element={<Signin />} /> */}
        </Routes>
      </main>
    </>
  )
}

export default App
