import { useEffect } from "react"
import { useProductsContext } from "../hooks/useProductsContext"

// components
import ProductDetails from '../components/ProductDetails'
import ProductForm from '../components/ProductForm'

const Home = () => {
    
    const {products, dispatch} = useProductsContext();
    
    // useEffect will fire a component when rendered, want to only fire once, dependency array empty means fire only once
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/products')
            const json = await response.json()
            if(response.ok){
                dispatch({type: 'SET_PRODUCTS', payload: json})
            }
        }
        fetchProducts()
    }, [])
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