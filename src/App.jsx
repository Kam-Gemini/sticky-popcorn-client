import { Routes, Route, NavLink } from 'react-router'

import AllMovies from './components/AllMovies/AllMovies'
import SingleMovie from './components/SingleMovie/SingleMovie'

import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'

import AllReviews from './components/AllReviews/AllReviews'

import NavMenu from './components/NavMenu/NavMenu'

import SingleReview from "./components/SingleReview/SingleReview"


function App() {

  return (
    <>
      <nav>
        <NavMenu />
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<AllMovies />} />
          <Route path="/movies/:movieId" element={<SingleMovie />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />

          <Route path="/movies/:movieId/reviews" element={<AllReviews />} />
          <Route path="/movies/:movieId/reviews/:reviewId" element={<SingleReview />} />

        </Routes>
      </main>
    </>
  )
}

export default App
