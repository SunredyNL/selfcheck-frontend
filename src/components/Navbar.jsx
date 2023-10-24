import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);

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
          <Link to="/profile">Profile</Link>
        </p>
      )}
    </nav>
  );
};

export default Navbar;
