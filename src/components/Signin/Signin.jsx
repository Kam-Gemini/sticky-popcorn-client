import { useState, useContext } from 'react'
import { useNavigate } from 'react-router'
import { signin } from '../../services/userService'
import { setToken } from '../../utils/auth'
import { getUserFromToken } from '../../utils/auth'
import { Button } from 'react-bootstrap'
import { UserContext } from '../../contexts/UserContext'
import { useLocation } from "react-router-dom";
// Styles
import styles from './Signin.module.css'

export default function Signin(){
  // Context
  // We need to pass the context into the useContext hook, which will give us any values set to it (in this case, user & setUser)
  const { setUser } = useContext(UserContext)

  // State
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  // Location variables
  const navigate = useNavigate()

  const location = useLocation();
  const fromPage = location.state?.from || "unknown"

  //console.log(formData)
  // Events
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await signin(formData)
      setToken(data.token)
      // Set the global user context/state
      setUser(getUserFromToken())
      // Navigate to posts page
     // navigate(fromPage !== "unknown" ? fromPage : "/")
     navigate(-2)
    } catch (error) {
    //   setErrors(error.response.data.errors)
      setErrors(error.message)
    }
  }

  const handleChange = (e) => {
    //console.dir(e.target)
    setErrors({ ...errors, [e.target.name]: '' })
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section className={styles.container}>
        <div>
       {fromPage === '/' && <p>Welcome! You came from the home page.</p>}
       </div>
      <h1>Sign in</h1>
      <p>Log in to your account!</p>
      
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
          { errors.identifier && <p className='error-message'>{errors.identifier}</p> }
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
          { errors.password && <p className='error-message'>{errors.password}</p> }
        </div>

     
        <button disabled={formData.password === '' 
            //</form>|| formData.password !== formData.confirmPassword
            } type="submit">Submit</button>

      </form>


      <Button variant="primary" onClick={() => navigate('/signup')}>Don't have an account yet? Sign up here!</Button>
    </section>
  )
}