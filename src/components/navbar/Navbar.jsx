import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import "./Navbar.css";
import NavbarExpand from "./NavbarExpand";

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showCheckbox, setshowCheckbox] = useState(false);
  //function to log user out
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate(`/login`);
    window.location.reload(false);
  };
  return (
    <>
      <div>
        <NavbarExpand
          handleLogout={handleLogout}
          showCheckbox={showCheckbox}
          setshowCheckbox={setshowCheckbox}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </>
  );
};

export default Navbar;
