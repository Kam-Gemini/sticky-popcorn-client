import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { addUserFavourite, addUserWatchlist, movieShow } from '../../services/movieService'
import MovieRating from './Rating'
import Spinner from '../Spinner/Spinner'

import styles from './SingleMovie.module.css'

export default function SingleMovie() {

    // State
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const { user, setUser } = useContext(UserContext)

    // Location variables
    const { movieId } = useParams()

    // On initial render
    useEffect(() => {
        async function getMovie() {
            try {
                const data = await movieShow(movieId)
                setMovie(data)
            } catch (error) {
                if (error.status === 400) {
                    setError('Post not found.')
                } else {
                    setError(error.message)
                }

            } finally {
                setIsLoading(false)
            }
        }
        getMovie()
    }, [movieId]) // This empty dependency array ensures this effect only executes on initial render

    if (isLoading) {
        return <p>Loading...</p>;
      }
    
      if (error) {
        return <p>{error}</p>;
      }

    const handleAddFavourite = async (movieId) => {
    try {
            const response = await addUserFavourite(movieId)
            console.log(response)
            
            if (!response || !response._id) {
                throw new Error("Invalid response from the server");
            }
            if (!movieId) {
                throw new Error("Incorrect movie id")
            }

        } catch (error) {
            console.log(error)
            if (error.response && error.response.data && error.response.data.errors) {
                setError(error.response.data.errors)
            } else {
                setError({ general: "Something went wrong. Please try again." })
            }
        }
    }

    const handleAddWatchlist = async (movieId) => {
        try {
                const response = await addUserWatchlist(movieId)
                console.log(response)
                
                if (!response || !response._id) {
                    throw new Error("Invalid response from the server");
                }
                if (!movieId) {
                    throw new Error("Incorrect movie id")
                }
    
            } catch (error) {
                console.log(error)
                if (error.response && error.response.data && error.response.data.errors) {
                    setError(error.response.data.errors)
                } else {
                    setError({ general: "Something went wrong. Please try again." })
                }
            }
        }

    console.log(movie)
    return (
        <section className={styles.movie}>
            <div>
                <img src={movie.poster_url} alt={movie.title} />
                <MovieRating />
            </div>
            <div>
                <h3>{movie.title}</h3>
                <p>Year: {movie.year}</p>
                <p>Cast: {movie.cast.join(', ')}</p>
                <p>Director: {movie.director}</p>
                <p>Genre: {movie.genre.join(', ')}</p>
                <p>Runtime: {movie.runtime}</p>
                <p>Certificate: {movie.certificate}</p>
                { user ? 
                    (<div className={styles.icons}>
                        <button className={styles.button} id="add-favourite" onClick={() => {handleAddFavourite(movieId)}}><img src="https://res.cloudinary.com/dvp3fdavw/image/upload/v1739356535/heart_1_yybbex.png" /></button>
                        <button className={styles.button} id="add-watchlist" onClick={() => {handleAddWatchlist(movieId)}}><img src="https://res.cloudinary.com/dvp3fdavw/image/upload/v1739442031/television_djct6l.png" /></button>
                    </div>) : <></>
                }
                <Link to={`/movies/${movieId}/reviews`}>Read the Reviews
                </Link>
            </div>
        </section>
    )
}