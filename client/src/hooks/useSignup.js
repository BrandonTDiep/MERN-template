import { useState } from 'react'

// hooks & context
import { useAuthContext } from "../hooks/useAuthContext"

// utils & assets
import axiosInstance from '../utils/axiosInstance'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    try{
      const response = await axiosInstance.post('/api/user/signup', {
        email,
        password
      })

      const json = response.data // contains json web token and email

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    } catch(error) {
      setIsLoading(false)
      setError(error.response.data.error)
    }
  }

  return { signup, isLoading, error }
}