import  { createContext, useState } from 'react'

export const AuthContext = createContext({user: null, setUser: () => {}})

const AuthProvider = (props) => {
    const [user, setUser] = useState(null)
    const [cartItemsCount, setCartItemsCount] = useState(0)

    return(
        <AuthContext.Provider value={{ user, setUser, cartItemsCount, setCartItemsCount }}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthProvider