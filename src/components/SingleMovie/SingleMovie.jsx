import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import {movieShow } from '../../services/movieService'

import styles from './SingleMovie.module.css'

export default function SingleMovie() {

    // State
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

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


    return (
        <section className={styles.movie}>
            <h3>{movie.title}</h3>
            <img src={movie.poster_url} alt={movie.title} />
            <p>Year: {movie.year}</p>
            <p>Cast: {movie.cast.join(', ')}</p>
            <p>Director: {movie.director}</p>
            <p>Genre: {movie.genre.join(', ')}</p>
            <p>Runtime: {movie.runtime}</p>
            <p>Certificate: {movie.certificate}</p>
        </section>
    )
}