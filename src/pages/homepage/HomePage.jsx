import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import SavingGif from "../../assets/saving.gif";
const HomePage = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { isAuthenticated } = useContext(AuthContext);
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
  //fake comments
  const comments = [
    {
      name: "Dwarves",
      id: 1,
      what: `"Best tool to ensure Mines of Moria's budget is up to date!"`,
    },
    {
      name: "Sauron",
      id: 2,
      what: `"If I knew this website exists, I would for sure win the war!"`,
    },
    {
      name: "Aragorn",
      id: 3,
      what: `"Super handy! Will for sure use during my ruling."`,
    },
  ];
  console.log(comments);
  return (
    <>
      <div className="container">
        <div className="intro">
          <img className="savingGif" src={SavingGif} />
          <p className="welcome">Welcome to SelfCheck</p>
          <p className="descr">Your personal assisstant to easy budgeting</p>
        </div>
        {!isAuthenticated && (
          <div className="buttons">
            <Link to="/login">
              <button className="HPbtn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="HPbtn">Sign-up</button>
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <div className="buttons">
            <p className="welcomeMsg">
              Hey <span className="name">{user.username}</span>!
            </p>
            <Link to="/user/years">
              <button className="HPbtn">Budget Track</button>
            </Link>
            <button
              className="HPbtn"
              id="deleteUser"
              type="button"
              onClick={() => {
                deleteUser();
              }}
            >
              Delete user
            </button>
          </div>
        )}
      </div>
      <div className="comments">
        {comments.map((oneComment) => {
          return (
            <div className="oneComment" key={oneComment.id}>
              <p className="commentWhat">{oneComment.what}</p>
              <p className="commentName">{oneComment.name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
