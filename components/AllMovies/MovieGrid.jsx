import styled from "styled-components";

export default function MovieGrid({ children }) {

    const Container = styled.section`
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        column-gap: 20px;
        row-gap: 20px;
    `
    return (
    <Container>
        { children }
    </Container>
    )
}