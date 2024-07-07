import { useEffect } from "react"
import { useProductsContext } from "../hooks/useProductsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import ProductDetails from '../components/ProductDetails'
import ProductForm from '../components/ProductForm'

// utils & assets
import axiosInstance from '../utils/axiosInstance'

const Home = () => {
    
    const {products, dispatch} = useProductsContext();
    const {user} = useAuthContext()
    
    // useEffect will fire a component when rendered, want to only fire once, dependency array empty means fire only once
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/api/products', 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                dispatch({type: 'SET_PRODUCTS', payload: response.data})
                if (user) {
                    fetchProducts()
                }
            }
            catch(error) {
                console.log(error)

            }

        }

        if (user) {
            fetchProducts()
        }
    }, [dispatch, user])

    return(
        <div className="home">
            <div className="products">
                {/* only if we have a value for 'products', we'll start to map through them */}
                {products && products.map((product) => (
                    <ProductDetails key={product._id} product = {product}/>
                ))}
            </div>
            <ProductForm />
        </div>
    )
}

export default Home