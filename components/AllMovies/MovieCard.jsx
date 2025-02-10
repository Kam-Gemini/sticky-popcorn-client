import styled from "styled-components";

export default function MovieCard({ movie }) {
    const Movie = styled.div`
        border: 2px solid var(--text-secondary);
        border-radius: 8px;
        padding: 20px 0
    `

    const Image = styled.img`
        max-width: 100%;
        height: 200px;
    `

    const Heading = styled.h2`
        padding: 0 10px;
    `
    const Paragraph = styled.p`
        padding: 0 10px;
    `

    return (
        <Movie>
            <Heading>{movie.title}</Heading>
            <Image src={movie.poster_url} alt={movie.title} />
            <Paragraph>Year: {movie.year}</Paragraph>
            <Paragraph>Cast: {movie.cast}</Paragraph>
            <Paragraph>Director: {movie.director}</Paragraph>
            <Paragraph>Genre: {movie.genre}</Paragraph>
            <Paragraph>Runtime: {movie.runtime}</Paragraph>
            <Paragraph>Certificate: {movie.certificate}</Paragraph>
        </Movie>
    )
}