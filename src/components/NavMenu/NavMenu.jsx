import styled from 'styled-components'
import {useContext} from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { removeToken } from '../../utils/auth'
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

    const signOut = () => {
        removeToken ()
        setUser(null)
    }

    return (
        <>
            <MainHeading>
                <TitleImage>
                    <Heading>Sticky Popcorn</Heading>
                    <Image src="https://res.cloudinary.com/dvp3fdavw/image/upload/v1739297863/pngimg.com_-_popcorn_PNG21_rhjjqy.png" />
                </TitleImage>
                {user
                ? (
                    <>
                
                    <Button variant="primary" onClick={signOut}>Sign out</Button>
                  
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