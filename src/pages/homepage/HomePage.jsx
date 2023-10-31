import "./HomePage.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";
import SavingGif from "../../assets/saving.gif";
const HomePage = () => {
  const { currentUser } = useContext(AuthContext);
  const { isAuthenticated } = useContext(AuthContext);
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
            <Link to="/user/profile">
              <button className="HPbtn">Profile</button>
            </Link>
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
