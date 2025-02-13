import './App.css'

import { Routes, Route, NavLink } from 'react-router'

import AllMovies from './components/AllMovies/AllMovies'
import FavouriteMovies from './components/AllMovies/FavouriteMovies'
import Watchlist from './components/AllMovies/Watchlist'
import SingleMovie from './components/SingleMovie/SingleMovie'

import Signup from './components/Signup/Signup'
import Signin from './components/Signin/Signin'

import AllReviews from './components/AllReviews/AllReviews'

import NavMenu from './components/NavMenu/NavMenu'

import SingleReview from "./components/SingleReview/SingleReview"
import CreateReview from './components/CreateReview/CreateReview'
import UpdateReview from './components/UpdateReview/UpdateReview'


function App() {

  return (
    <>
      <nav>
        <NavMenu />
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<AllMovies />} />
          <Route path="/movies/favourites" element={<FavouriteMovies />} />
          <Route path="/movies/watchlist" element={<Watchlist />} />

          <Route path="/movies/:movieId" element={<SingleMovie />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />

          <Route path="/movies/:movieId/reviews" element={<AllReviews />} />
          <Route path="/movies/:movieId/reviews/:reviewId" element={<SingleReview />} />
          <Route path="/movies/:movieId/create-review" element={<CreateReview />} />
          <Route path="/movies/:movieId/reviews/:reviewId/edit" element={<UpdateReview />} />

        </Routes>
      </main>
    </>
  )
}

export default App
