import { useState } from "react"
import { Link } from 'react-router-dom'

// hooks & context
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  })
  
  const handleBlur = (e) => { 
    const { id, value } = e.target
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: value.trim() === ''
    }))
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: email.trim() === '',
      password: password.trim() === ''
    }))

    // Return if there are any errors
    if (email.trim() === '' || password.trim() === '') {
      return
    }

    await login(email, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3 className="mb-3">Log In</h3>
      
      <label htmlFor="email" className="mb-1">Email address:</label>
      <input 
        id="email"
        className={`mb-3 ${errors.email && 'error-border'}`}
        autoComplete="email"
        type="email" 
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleBlur} 
        value={email} 
      />
      {errors.email && <p className="error-message">Please enter your email.</p>}
      
      <label htmlFor="password" className="mb-1">Password:</label>
      <input 
        id="password"
        className={`mb-3 ${errors.password && 'error-border'}`}
        autoComplete="new-password"
        type="password" 
        onChange={(e) => setPassword(e.target.value)}
        onBlur={handleBlur} 
        value={password} 
      />
      {errors.password && <p className="error-message">Please enter your password.</p>}


      <button disabled={isLoading} className="mb-3">Log in</button>
      <Link to="/signup" className="nav-link">Don't have an account?  Sign Up</Link>

      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login