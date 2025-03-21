import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { signin } from '../../services/userService'
import { setToken } from '../../utils/auth'
import { getUserFromToken } from '../../utils/auth'
// import { Button } from 'react-bootstrap'
import { UserContext } from '../../contexts/UserContext'

import { NavHistoryContext } from '../../contexts/NavHistoryContext'

// Styles
import styles from './Signin.module.css'
import '../../App.css'

export default function Signin() {
  // Context
  // We need to pass the context into the useContext hook, which will give us any values set to it (in this case, user & setUser)
  const { setUser } = useContext(UserContext)

  // State
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  })
  const [signInShow, setSignInShow] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false) 
  const [errors, setErrors] = useState({})
  const { history } = useContext(NavHistoryContext)
  const navigate = useNavigate()

  const handleNavigate = () => {
      navigate('/')
      setSignInShow(true)
  }

  const handleRegisterAccount = () => {
    setSignInShow(false)
    navigate('/signup')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await signin(formData)
      setToken(data.token)
      // Set the global user context/state
      setUser(getUserFromToken())
      setSignInShow(false)
      setIsSignedIn(true)
      console.log(`HISTORY ${history}`)
      handleNavigate()
    } catch (error) {
      setErrors(error.response.data)
    }
  }

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: '' })
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section className={styles.container}>
      <section className={styles.image}>
      </section>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        {/* Username */}
        <div className="form-control">
          <label htmlFor="identifier">Username or email</label>
          <input
            type="text"
            name="identifier"
            id="identifier"
            placeholder="Enter your username or email"
            required
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter a password"
            required
            onChange={handleChange}
          />
          {errors.message && <p className='error-block'>{errors.message}</p>}
        </div>
        
        <button
          disabled={!formData.password}
          type="submit"
          className="button"
        >
          Submit
        </button>

      </form>
      <button onClick={handleRegisterAccount} className={styles.button}>Don't have an account yet? Sign up here!</button>
    </section>
  )
}