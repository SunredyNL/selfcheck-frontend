import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
const ProfilePage = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { userData } = useContext(UserContext);

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
  const deleteUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${currentUser}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        localStorage.removeItem("authToken");
        navigate(`/signup`);
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <h1>Profile page</h1>
      <p>{user.username}</p>
      <button
        type="button"
        onClick={() => {
          deleteUser();
        }}
      >
        Delete this user
      </button>
    </>
  );
};

export default ProfilePage;
