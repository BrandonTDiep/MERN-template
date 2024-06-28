import { useAuthContext } from './useAuthContext'
import { useProductsContext } from "../hooks/useProductsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: dispatchProducts } = useProductsContext()

    // remove the two things that say we are logged in
    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
        dispatchProducts({ type: 'SET_PRODUCTS', payload: null })
    }

    return { logout }
}