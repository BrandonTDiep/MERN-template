import { useState } from 'react'
import { useProductsContext } from "../hooks/useProductsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const ProductForm = () => {
  const { dispatch } = useProductsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])


  const handleSubmit = async (e) => {
    e.preventDefault() // prevents the default action of form submitting

    if (!user) {
      setError('You must be logged in')
      return
    }

    const product = {title, amount}

    const response = await fetch('/api/products/', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if(!response.ok){
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if(response.ok){
      setTitle('')
      setAmount('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_PRODUCT', payload: json})
    }
  }

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a New Product</h3>
      
      <label>Product Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Amount:</label>
      <input 
        type="number" 
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        className={emptyFields.includes('amount') ? 'error' : ''}
      />
      <button>Add Product</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ProductForm