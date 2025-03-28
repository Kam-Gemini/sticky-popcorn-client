import styled from 'styled-components'
import {useContext, useState, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { getToken, removeToken } from '../../utils/auth'
import { Link, NavLink } from 'react-router'
import '../../App.css'
import styles from './NavMenu.module.css'

const MainHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px 230px;
`
const TitleImage = styled.div`
    display: flex;
    align-items: center;
`

const Heading = styled.h1`
    font-size: 4.5rem;
`
const Image = styled.img`
    height: 100px;
`

const Tagline = styled.div`
    margin: -20px 0;
`

export default function NavMenu() {
    const navigate = useNavigate()
    const [signInShow, setSignInShow] = useState(true)
    const [isSignedIn, setIsSignedIn] = useState(false) 
    const { user, setUser } = useContext(UserContext)

    const signOut = () => {
        removeToken()
        setUser(null)
        setSignInShow(true)
        setTimeout(() => navigate('/'), 100)
    }

    const handleSignin = () => {
        navigate('/signin')
        setSignInShow(false)
    }

    // Reset signInShow when navigating back to the main page
    useEffect(() => {
        if (location.pathname !== '/signin' && location.pathname !== '/signup') {
            setSignInShow(true)
        }
    }, [location.pathname])

    return (
        <>
            <MainHeading>
                { signInShow &&
                    <TitleImage className={styles.titlelink}>
                            <Link to="/">
                            <div>
                                <Heading className='site-name'>Sticky Popcorn</Heading>
                                <Tagline><p className={styles.tagline}>Reviews that stick with you - Freshly Popped!</p></Tagline>
                            </div>
                            <div>
                                <Image src="https://res.cloudinary.com/dvp3fdavw/image/upload/v1739356536/pngimg.com_-_popcorn_PNG21_lo8zgy.png" />
                            </div>
                            </Link>
                    </TitleImage>}
                <div>
                    {user && user._id
                    ? (
                        <>
                            <button onClick={() => navigate(`/movies/favourites`)}className='button'> ❤️ Favourites</button>
                            <button onClick={() => navigate(`/movies/watchlist`)}className='button'> 📺 Watchlist</button>
                            <button onClick={signOut} className={styles.button}>Sign out</button>
                        </> 
                    )
                    : ( !isSignedIn && signInShow &&
                        <>
                            <button onClick={handleSignin} className={styles.button}>Sign in</button>
                        </>
                    )
                    }
                </div>
            </MainHeading>
        </>
    )
}