import { Routes, Route, NavLink } from 'react-router'

import AllMovies from '../components/AllMovies/AllMovies'
import NavMenu from '../components/NavMenu/NavMenu'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav>
        <NavMenu />
      </nav>
      <main>
        <Routes>
          <Route path="/movies" element={<AllMovies />} />
          <Route path="/posts/:postId" element={<SingleMovie />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
        </Routes>
      </main>
    </>
  )
}

export default App
