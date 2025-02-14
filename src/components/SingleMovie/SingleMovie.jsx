import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { addUserFavourite, addUserWatchlist, movieShow } from '../../services/movieService'
import { reviewIndex } from "../../services/reviewService"
import MovieRating from './Rating'
import Spinner from '../Spinner/Spinner'

import styles from './SingleMovie.module.css'

export default function SingleMovie() {

    // State
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [randomReview, setRandomReview] = useState(null)
    const { user, setUser } = useContext(UserContext)
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


    useEffect(() => {
        reviewIndex(movieId)
            .then((reviews) => {
                if (reviews.length > 0) {
                    const randomIndex = Math.floor(Math.random() * reviews.length)
                    setRandomReview(reviews[randomIndex])
                }
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error)
            })
    }, [movieId])



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
            console.log(response)

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
    }

    return (
        <section className={styles.movie}>
            <div>
                <img src={movie.poster_url} alt={movie.title} className={styles.movieImage} />
                <MovieRating />
            </div>
            <div className={styles.detailsContainer}>
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

                {user ?
                    (<div className={styles.icons}>

                        <button className={styles.button} id="add-favourite" onClick={() => {handleAddFavourite(movieId)}}>{ isFavourite ? <img src="https://res.cloudinary.com/dvp3fdavw/image/upload/v1739356535/heart_1_yybbex.png" /> : <img src="https://res.cloudinary.com/dvp3fdavw/image/upload/v1739356535/heart_r6m3po.png" />}</button>
                        <button className={styles.button} id="add-watchlist" onClick={() => {handleAddWatchlist(movieId)}}>{ isWatchlist ? <img src="https://res.cloudinary.com/dvp3fdavw/image/upload/v1739442031/television_djct6l.png" /> : <img src="https://res.cloudinary.com/dvp3fdavw/image/upload/v1739356535/tv_rkyzjg.png" />}</button>

                    </div>) : <></>
                }

                <div className={styles.reviewContainer}>
                    {randomReview && (
                        <section className={styles.randomReview}>
                            <h3>What others are saying:</h3>
                            <blockquote className={styles.reviewContent}>
                                "{randomReview.content}"
                            </blockquote>
                            <p className={styles.reviewAuthor}>- {randomReview.author.username}</p>
                        </section>

                    )}
                </div>
                <Link to={`/movies/${movieId}/reviews`} className={styles.button}>Read all the Reviews
                </Link>
                <Link to={`/`} className={styles.button}>Back to all movies
                </Link>
            </div>

        </section>

    )
}