import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate(`/login`);
    window.location.reload(false);
  };
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
        <>
          <p>
            <Link to={`/user/profile`}>Profile</Link>
          </p>
          <p>
            <Link to={`/user/years`}>Budget Track</Link>
          </p>

          <p>
            <button
              onClick={() => {
                handleLogout();
              }}
            >
              Sign out
            </button>
          </p>
        </>
      )}
    </nav>
  );
};

export default Navbar;
