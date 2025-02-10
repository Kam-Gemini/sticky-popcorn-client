import styled from "styled-components";

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 20px;
  text-align: center;
`;

export default function MovieGrid({ children }) {
  return (
    <Container>
        {children}
    </Container>
  )
}