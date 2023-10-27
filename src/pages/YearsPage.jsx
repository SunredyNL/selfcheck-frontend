import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const YearsPage = () => {
  const token = localStorage.getItem("authToken");

  const { currentUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [years, setYears] = useState([]);

  const payload = {
    name,
    user: `${currentUser}`,
  };

  const addYear = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/year`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
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
        setYears(allYears);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteYear = async (oneYear) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/year/${oneYear._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        location.reload();
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

      {years.map((oneYear) => {
        return (
          <div key={oneYear._id}>
            <Link to={`/user/${oneYear._id}/months`}>
              <p>{oneYear.name}</p>
            </Link>
            <button
              type="button"
              onClick={() => {
                deleteYear(oneYear);
              }}
            >
              Delete year
            </button>
          </div>
        );
      })}
    </>
  );
};

export default YearsPage;
