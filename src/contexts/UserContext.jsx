import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const token = localStorage.getItem("authToken");

  const { currentUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/${currentUser}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const parsed = await response.json();
        console.log("Beautiful", parsed);
        setUserData(parsed);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{
        userData,
        fetchUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
