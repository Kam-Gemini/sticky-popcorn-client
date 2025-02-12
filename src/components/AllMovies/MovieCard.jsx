import styles from './AllMovies.module.css'
import styled from 'styled-components'
import { Link } from 'react-router'

const Title = styled.h2`
    margin: 20px 0;
`

export default function MovieCard({ movie }) {

    return (
        <article className={styles.card}>
            <Link to={`/movies/${movie._id}`} underline="none">
                <div>
                    <img src={movie.poster_url} alt={movie.title} />
                </div>
                <Title>
                    <h2>{movie.title}</h2>
                </Title>
                <div>
                    <p>{movie.year}</p>
                    <p>Runtime: {movie.runtime}</p>
                </div>
            </Link>
        </article>
    )
}