import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const MonthsPage = () => {
  const token = localStorage.getItem("authToken");

  const { yearId } = useParams();

  const [name, setName] = useState("");
  const [months, setMonths] = useState([]);

  const payload = {
    name,
    year: `${yearId}`,
  };

  const addMonth = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/month`,
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
        const currMonth = await response.json();
        console.log(currMonth);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMonth = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/month/${yearId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const allMonths = await response.json();
        console.log("chicorita", allMonths);
        setMonths(allMonths);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMonth();
  }, []);

  return (
    <>
      <h1>Add month</h1>
      <form style={{ display: "grid", gridTemplate: "auto / 1fr" }}>
        <label>
          Month
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          onClick={() => {
            addMonth();
          }}
        >
          Add month
        </button>
      </form>

      {months.map((oneMonth) => {
        return (
          <Link to={`/user/${oneMonth._id}/data`} key={oneMonth._id}>
            <p>{oneMonth.name}</p>
          </Link>
        );
      })}
    </>
  );
};

export default MonthsPage;
