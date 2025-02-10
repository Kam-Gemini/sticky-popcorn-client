import styles from './AllMovies.module.css';
import { Link, useNavigate } from 'react-router'

export default function MovieCard({ movie }) {

    const navigate = useNavigate()

    return (
        <article className={styles.card}>
            <Link to={`/movies/${movie._id}`} underline="none">
                <div>
                    <h2>{movie.title}</h2>
                </div>
                <div>
                    <img src={movie.poster_url} alt={movie.title} />
                </div>
                <div>
                    <p>Year: {movie.year}</p>
                    <p>Cast: {movie.cast.join(', ')}</p>
                    <p>Director: {movie.director}</p>
                    <p>Genre: {movie.genre.join(', ')}</p>
                    <p>Runtime: {movie.runtime}</p>
                    <p>Certificate: {movie.certificate}</p>
                </div>
            </Link>
        </article>
    )
}