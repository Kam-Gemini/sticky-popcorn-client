import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const MainHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 20px;
`
const TitleImage = styled.div`
    display: flex;
    align-items: center;
`
const Heading = styled.h1`
    font-size: 3.5rem;
`
const Image = styled.img`
    height: 100px;
`

const Tagline = styled.div`
    margin: 0 20px;
`

export default function NavMenu() {
    const navigate = useNavigate()

    return (
        <>
            <MainHeading>
                <TitleImage>
                    <Heading>Sticky Popcorn</Heading>
                    <Image src="https://res.cloudinary.com/dvp3fdavw/image/upload/v1739356536/pngimg.com_-_popcorn_PNG21_lo8zgy.png" />
                </TitleImage>
                <Button variant="primary" onClick={() => navigate('/signin')}>Sign in</Button>
            </MainHeading>
            <Tagline>
                <p>Reviews that stick with you - Freshly Popped!</p>
            </Tagline>
        </>
    )
}