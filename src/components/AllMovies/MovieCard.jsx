import styles from './AllMovies.module.css'
import { Link } from 'react-router'


export default function MovieCard({ movie }) {

    return (
        <section className={styles.card}>
            <Link to={`/movies/${movie._id}`} className={styles.movieLink}> 
            <img src={movie.poster_url} alt={movie.title} className={styles.movieImage} />
                <header className={styles.movieTitle}>
                    <h3>{movie.title}</h3>
                </header>
                <section className={styles.movieInfo}>
                    <p>{movie.year}</p>
                    <p>Runtime: {movie.runtime}</p>
                </section>
            </Link>
        </section>
              
    )
}