import { useState } from "react"

// hooks & context
import { useSignup } from "../hooks/useSignup"

// utils & assets
import { validatePassword } from '../utils/passwordValidator';

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [errors, setErrors] = useState({
    email: false,
  })
  
  const handleBlur = (e) => { 
    const { id, value } = e.target
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: value.trim() === ''
    }))
  }; 

  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: email.trim() === '',
    }))

    setPasswordErrors(validatePassword(password));

    // Return if there are any errors
    if (email.trim() === '' || passwordErrors.length > 0) {
      return
    }


    await signup(email, password)
  }

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordErrors(validatePassword(value));
  };

  const handlePasswordBlur = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordErrors(validatePassword(value));
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3 className="mb-3">Sign Up</h3>

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
      {error && <p className="error-message">{error}</p>}

      <label htmlFor="password" className="mb-1">Password:</label>
      <input 
        id="password"
        className={`mb-3 ${passwordErrors.length !== 0 && 'error-border'}`}
        autoComplete="new-password"
        type="password" 
        onChange={handlePasswordChange}
        onBlur={handlePasswordBlur} 
        value={password} 
      />
      {passwordErrors.length > 0 && (
        <ul className="error-message">
          {passwordErrors.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      )}
      
      <button disabled={isLoading}>Sign up</button>

    </form>
  )
}

export default Signup