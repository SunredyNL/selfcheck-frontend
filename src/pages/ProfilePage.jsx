import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";

const ProfilePage = () => {
  const token = localStorage.getItem("authToken");

  const { currentUser } = useContext(AuthContext);
  const { userData } = useContext(UserContext);
  console.log(userData);

  const [user, setUser] = useState({});
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${currentUser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const parsed = await response.json();
        setUser(parsed.user);
        console.log(parsed.user);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <h1>Profile page</h1>
      <p>{user.username}</p>
    </>
  );
};

export default ProfilePage;
