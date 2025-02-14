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
    const [isFavourite, setIsFavourite] = useState(false)
    const [isWatchlist, setIsWatchlist] = useState(false)

    // Location variables
    const { movieId } = useParams()
    const { user } = useContext(UserContext)

    // On initial render
    useEffect(() => {
        async function getMovie() {
            try {
                const data = await movieShow(movieId)
                setMovie(data)
                setIsFavourite(data?.favouritedBy?.some(fb => fb._id === user._id))
                setIsWatchlist (data?.watchlistBy?.some(wb => wb._id === user._id))
            } catch (error) {
                if (error.status === 400) {
                    setError('Movie not found.')
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
            setMovie(response)
            setIsFavourite(!isFavourite)

            if (!response || !response._id) {
                throw new Error("Invalid response from the server");
            }
            if (!movieId) {
                throw new Error("Incorrect movie id")
            }

        } catch (error) {
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
                setMovie(response)
                setIsWatchlist(!isWatchlist)
                
                if (!response || !response._id) {
                    throw new Error("Invalid response from the server");
                }
                if (!movieId) {
                    throw new Error("Incorrect movie id")
                }
    
            } catch (error) {
                if (error.response && error.response.data && error.response.data.errors) {
                    setError(error.response.data.errors)
                } else {
                    setError({ general: "Something went wrong. Please try again." })
                }
            }
        }

    return (
        <section className={styles.movie}>
            <div>
                <img src={movie.poster_url} alt={movie.title} className={styles.movieImage} />
                <MovieRating />
            </div>
            <div>
                <h3 className={styles.movieTitle}>{movie.title}</h3>
                <p className={styles.movieInfo}>
                    Year: {movie.year}</p>
                <p className={styles.movieInfo}>
                    Cast: {movie.cast.join(', ')}</p>
                <p className={styles.movieInfo}>
                    Director: {movie.director}</p>
                <p className={styles.movieInfo}>
                    Genre: {movie.genre.join(', ')}</p>
                <p className={styles.movieInfo}>
                    Runtime: {movie.runtime}</p>
                <p className={styles.movieInfo}>
                    Certificate: {movie.certificate}</p>
                <Link to={`/movies/${movieId}/reviews`} className={styles.button}>Read the Reviews
                </Link>
                { user ? 
                    (<div className={styles.icons}>
                        <button className={styles.button} id="add-favourite" onClick={() => {handleAddFavourite(movieId)}}>{ isFavourite ? <img src="https://res.cloudinary.com/dvp3fdavw/image/upload/v1739356535/heart_1_yybbex.png" /> : <img src="https://res.cloudinary.com/dvp3fdavw/image/upload/v1739356535/heart_r6m3po.png" />}</button>
                        <button className={styles.button} id="add-watchlist" onClick={() => {handleAddWatchlist(movieId)}}>{ isWatchlist ? <img src="https://res.cloudinary.com/dvp3fdavw/image/upload/v1739442031/television_djct6l.png" /> : <img src="https://res.cloudinary.com/dvp3fdavw/image/upload/v1739356535/tv_rkyzjg.png" />}</button>
                    </div>) : <></>
                }
                <Link to={`/`} className={styles.button}>Back to all movies
                </Link>
            </div>
        </section>
    )
}