import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

const YearsPage = () => {
  const token = localStorage.getItem("authToken");

  const { currentUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const payload = {
    name,
    user: `${currentUser}`
  }

  const addYear = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/year`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      if (response.ok) {
        const currYear = await response.json();
        console.log(currYear);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchYears = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/year/${currentUser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const allYears = await response.json();
        console.log("chicorita", allYears);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchYears();
  }, []);

  return (
    <>
      <h1>Add year</h1>
      <form style={{ display: "grid", gridTemplate: "auto / 1fr" }}>
        <label>
          Year
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          onClick={() => {
            addYear();
          }}
        >
          Add year
        </button>
      </form>
    </>
  );
}

export default YearsPage;