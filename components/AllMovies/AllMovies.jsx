import { useState, useEffect } from 'react'
import { movieIndex } from '../../services/movieService'
import MovieGrid from './MovieGrid'
// import Filters from './Filters';
import MovieCard from './MovieCard';
import styles from './AllMovies.module.css'


export default function AllMovies() {

    // State
    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // On component mount (first render only)
    useEffect(() => {
        movieIndex()
            .then(data => setMovies(data))
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }, [])


    const [filterBy, setFilterBy] = useState('All')
    const results = movies.filter(movie => {
        return movie.year === filterBy || filterBy === 'All'
    })

    return (
        <main>
            {/* <Filters filterBy={filterBy} setFilterBy={setFilterBy} listAllYears={listAllYears} /> */}
            <MovieGrid>
                {movies.map(movie => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </MovieGrid>
        </main>
    )
}

// const listAllYears = [...new Set(movies.map(movie => movie.year))].sort((a, b) => a - b)

