import { useProductsContext } from "../hooks/useProductsContext"
import { useAuthContext } from '../hooks/useAuthContext'

// utils & assets
import axiosInstance from '../utils/axiosInstance'

const ProductDetails = ({ product }) => {

  const { dispatch } = useProductsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    try {
      const response  = await axiosInstance.delete('/api/products/' + product._id, 
      {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      dispatch({type: 'DELETE_PRODUCT', payload: response.data})
    } catch (error) {
      console.error("Failed to delete the product", error);
    }
    


  }
  return (
    <div className="product-details">
        <h4>{product.title}</h4>
        <p><strong>Amount: </strong>{product.amount}</p>
        <p>{product.createdAt}</p>
        <span onClick={handleClick}>delete</span>
    </div>
  )
}

export default ProductDetails

// one using right now is rafce
