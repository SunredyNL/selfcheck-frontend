import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
const NavbarExpand = ({
  showCheckbox,
  setshowCheckbox,
  handleLogout,
  isAuthenticated,
}) => {
  const selectRef = useRef(null);

  return (
    <section>
      <button
        className="navbarBtn"
        type="button"
        onClick={() => setshowCheckbox(!showCheckbox)}
      >
        {showCheckbox ? "| | |" : "| | |"}
      </button>
      {showCheckbox && (
        <div className="left">
          <ul className="nav">
            <li>
              <Link to="/">Home</Link>
            </li>

            {!isAuthenticated && (
              <>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}

            {isAuthenticated && (
              <>
                <li>
                  <Link to={`/user/profile`}>Profile</Link>
                </li>
                <li>
                  <Link to={`/user/years`}>Budget Track</Link>
                </li>

                <button
                  className="logoutBtn"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Sign out
                </button>
              </>
            )}
          </ul>
        </div>
      )}
    </section>
  );
};

export default NavbarExpand;
