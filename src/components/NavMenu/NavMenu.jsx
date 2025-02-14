import styled from 'styled-components'
import {useContext, useState, useEffect} from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { getToken, removeToken } from '../../utils/auth'
import { Link, NavLink } from 'react-router'
import '../../App.css'
import './NavMenu.module.css'

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

    const signOut = () => {
        removeToken()
        setUser(null)
        setTimeout(() => navigate('/'), 100)
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
                    <Link to="/">
                    <div className="sitename">
                    {/* <Heading className='site-name'>Sticky Popcorn</Heading> */}
                    </div>
                    </Link>
                    <Image src="https://res.cloudinary.com/dvp3fdavw/image/upload/v1739356536/pngimg.com_-_popcorn_PNG21_lo8zgy.png" />
                </TitleImage>
                {user && user._id
                ? (
                    <>
                        <button onClick={() => navigate(`/movies/favourites`)}className='button'> ❤️ Favourites</button>
                        <button onClick={() => navigate(`/movies/watchlist`)}className='button'> 📺 Watchlist</button>
                        <button onClick={signOut}className='button'>Sign out</button>
                    </> 
                )
                : (
                    <>
                        <button onClick={() => navigate('/signin')}className='button'>Sign in</button>
                    </>
                )
            }
                
            </MainHeading>
            <Tagline>
                <p className='tagline'>Reviews that stick with you - Freshly Popped!</p>
            </Tagline>
        </>
    )
}