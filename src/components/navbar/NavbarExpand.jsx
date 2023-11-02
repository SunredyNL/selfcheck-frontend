import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import menuIcon from "../../assets/menu.png";
import "./Navbar.css";
const NavbarExpand = ({
  showCheckbox,
  setshowCheckbox,
  handleLogout,
  isAuthenticated,
}) => {
  return (
    <section>
      <button
        className="navbarBtn"
        type="button"
        onClick={() => setshowCheckbox(!showCheckbox)}
      >
        <img src={menuIcon}></img>
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
              <div className="nav">
                <li>
                  <Link to={`/user/years`}>Budget Track</Link>
                </li>
                <li className="budgetTrackButton">
                  <Link onClick={() => handleLogout()}>Sign out</Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </section>
  );
};

export default NavbarExpand;
