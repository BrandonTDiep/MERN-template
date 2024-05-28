import { useContext } from "react";
import { ProductsContext } from "../context/ProductContext";

//this hook returns to us the value of this context which is the value we passed into the provider component
export const useProductsContext = () => {
    const context = useContext(ProductsContext)

    if(!context){
        throw Error('useProductsContext must be used inside an ProductsContextProvider')
    }

    return context
}