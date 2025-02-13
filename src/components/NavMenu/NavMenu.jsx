import styled from 'styled-components'
import {useContext, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { getToken, removeToken } from '../../utils/auth'
// import { NavLink } from 'react-router'

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

    const { user, setUser } = useContext(UserContext)
    console.log(user)

    const signOut = () => {
        removeToken ()
        setUser(null)
    }
    getToken()
    useEffect(() => {
        if (user && user._id) {
            // Perform any actions that depend on user._id here
            console.log(`User ID is available: ${user._id}`);
        }
    }, [user])

    return (
        <>
            <MainHeading>
                <TitleImage>
                    <Heading>Sticky Popcorn</Heading>
                    <Image src="https://res.cloudinary.com/dvp3fdavw/image/upload/v1739356536/pngimg.com_-_popcorn_PNG21_lo8zgy.png" />
                </TitleImage>
                {user && user._id
                ? (
                    <>
                        <Button variant="primary" onClick={() => navigate(`/`)}>Home</Button>
                        <Button variant="primary" onClick={signOut}>Sign out</Button>
                        <Button variant="primary" onClick={() => navigate(`/movies/favourites`)}>Favourites</Button>
                        <Button variant="primary" onClick={() => navigate(`/movies/watchlist`)}>Watchlist</Button>
                    </> 
                )
                : (
                    <>
                        <Button variant="primary" onClick={() => navigate('/signin')}>Sign in</Button>
                    </>
                )
            }
                
            </MainHeading>
            <Tagline>
                <p>Reviews that stick with you - Freshly Popped!</p>
            </Tagline>
        </>
    )
}