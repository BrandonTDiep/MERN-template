// react context is a way that we can provide kind of global state to many diff components in the app

import { createContext, useReducer } from 'react'
export const ProductsContext = createContext()

export const productsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return{
                products: action.payload
            }
        case 'CREATE_PRODUCT':
            return{
                products: [action.payload, ...state.products]
            }
        case 'DELETE_PRODUCT':
            return{
                products: state.products.filter((p) => p._id !== action.payload._id)
            }    
        default:
            return state
            
    }

}

// next thing to do is provide that context to our application component so that our components can access it and the way we'll do that is by making a context provider compnent 
export const ProductsContextProvider = ({ children }) => {
    // reducer hook - similar to usestates in that we get back a state value and a function to update the state value and we also specify an intial value for the state but the difference is the reducer function 'productsReducer'. If we want to update, we callthe dispatch function and inside the function we would pass an object an argument and this object should hav ea type property which is normally a string
    const [state, dispatch] = useReducer(productsReducer, {
        products: null
    })
    
    return(
        //this is a componenet given by context we created and basically needs to wrap whatever parts of our application needs access to the context, in our case we'll wrap the whole component tree so that every component has to this context
        // the children property represents whatever components or template, 'ProductsContextProvider' thats accepting the props wraps so in this case the children property represents the app component that we just wrapped inside the index file so if we output children we are outputing the app component
        // somce this provider wraps the root app components which in turn wraps all other components, it means all components have access to our ProductContext
        <ProductsContext.Provider value={{...state, dispatch}}>
            { children }
        </ProductsContext.Provider>
    )
}