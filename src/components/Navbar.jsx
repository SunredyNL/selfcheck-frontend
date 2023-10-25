import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const username = localStorage.getItem("username")
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("username")
    navigate(`/login`)
    window.location.reload(false);
  }
  return (
    <nav>
      <p>
        <Link to="/">Home</Link>
      </p>

      {!isAuthenticated && (
        <>
          <p>
            <Link to="/signup">Signup</Link>
          </p>
          <p>
            <Link to="/login">Login</Link>
          </p>
        </>
      )}

      {isAuthenticated && (
        <p>
          <Link to={`/${username}/profile`}>Profile</Link>
        </p>
      )}
      {isAuthenticated && (
        <p>
          <Link to={`/${username}/addData`}>Add data</Link>
        </p>
      )}
      {isAuthenticated && (
        <p>
          <button onClick={() => { handleLogout() }}>Sign out</button>
        </p>
      )}
    </nav>
  );
};

export default Navbar;
