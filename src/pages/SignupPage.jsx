import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginpage/LoginPage.css";
const SignupPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { username, password };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.status === 201) {
        const parsed = await response.json();
        console.log(parsed);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="loginContainer">
        <h1>Signup</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
              placeholder="email"
            />
          </label>

          <label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              placeholder="password"
            />
          </label>
          <button className="loginBtn" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
