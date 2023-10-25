import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'

const ProfilePage = () => {
    const token = localStorage.getItem("authToken")
    const username = localStorage.getItem("username")
    const [user, setUser] = useState({});
    const { handleToken } = useContext(AuthContext)
    const fetchUser = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${username}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${token}`
                }
            })
            if (response.ok) {
                const parsed = await response.json()
                setUser(parsed.user)
                console.log(parsed.user)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <>
            <h1>Profile page</h1>
            <p>{user.username}</p>
        </>
    );
}

export default ProfilePage;