import { useState, useEffect } from 'react'
import { movieIndex } from '../../services/movieService'
import MovieGrid from './MovieGrid'
import Filters from '../NavMenu/Filters'
import MovieCard from './MovieCard'
import Genre from '../NavMenu/Genre'
import styles from './AllMovies.module.css'


export default function AllMovies() {

    // State
    const [movies, setMovies] = useState([])
    const [displayedMovies, setDisplayedMovies] = useState([])
    const [filterBy, setFilterBy] = useState('All')
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    // On component mount (first render only)
    useEffect(() => {
        movieIndex()
            .then(data => {
                setMovies(data)
                setDisplayedMovies(data)
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        let results = movies

        if (filterBy === '1970') {
            results = results.filter(movie => movie.year >= 1970 && movie.year <= 1979);
            console.log('1970s')
          } else if (filterBy === '1980') {
            results = results.filter(movie => movie.year >= 1980 && movie.year <= 1989);
          } else if (filterBy === '1990') {
            results = results.filter(movie => movie.year >= 1990 && movie.year <= 1999);
          } else if (filterBy === '2000') {
            results = results.filter(movie => movie.year >= 2000 && movie.year <= 2009);
          } else if (filterBy === '2010') {
            results = results.filter(movie => movie.year >= 2010 && movie.year <= 2019);
          }

        if (searchTerm) {
            results = results.filter(movie => 
            movie.title.toLowerCase().startsWith(searchTerm.toLowerCase()))
        }

        if (selectedGenres.length > 0) {
            const selectedGenreNames = selectedGenres.map(genre => genre.name)
            console.log(selectedGenreNames)
            results = results.filter(movie => {
                return movie.genre.some((genre) => selectedGenreNames.includes(genre))
            })
        }

        setDisplayedMovies(results)

    }, [filterBy, searchTerm, movies, selectedGenres])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value.toLowerCase())
    };

    return (
        <main>
            <input 
            type="search" 
            name="search" 
            id="search" 
            placeholder="Search..." 
            onChange={handleSearch}
            value={searchTerm}
          />
            <Filters filterBy={filterBy} setFilterBy={setFilterBy}/>
            <Genre selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}/>
            <MovieGrid>
                {displayedMovies.map(movie => (
                    <MovieCard key={movie._id} movie={movie} />
                ))}
            </MovieGrid>
        </main>
    )
}

