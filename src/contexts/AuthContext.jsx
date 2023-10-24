import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState()
    const [isAuthenticated, setIsAuthenticat] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleLogin = async currentToken => {
        setIsLoading(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                },
            })
            if (response.ok) {
                setToken(currentToken)
                setIsAuthenticat(true)
                window.localStorage.setItem("authToken", currentToken)
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }
    useEffect(() => {
        const tokenFromStorage = window.localStorage.getItem("authToken")
        if (tokenFromStorage) {
            handleLogin(tokenFromStorage)
        } else {
            setIsLoading(false)
        }
    }, [])

    const fetchWithToken = async (endpoint, callback, method = "GET", body) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api${endpoint}`, {
                method,
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
            if (response.ok) {
                const parsed = await response.json()
                callback(parsed)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AuthContext.Provider value={{ fetchWithToken, isLoading, isAuthenticated, handleLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider