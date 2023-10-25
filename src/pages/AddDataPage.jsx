import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

const AddExpensePage = () => {
  const token = localStorage.getItem("authToken");

  const { currentUser } = useContext(AuthContext);

  const [userId, setUserId] = useState("");
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(0);
  const payload = {
    name,
    value,
    user: `${userId}`,
    month,
    year,
  };
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
        setUserId(parsed.user._id);
        console.log(parsed.user);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const addExpense = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/expense`,
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
        const currExpense = await response.json();
        console.log(currExpense);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addIncome = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/income`,
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
        const currIncome = await response.json();
        console.log(currIncome);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <h1>Add data</h1>
      <form style={{ display: "grid", gridTemplate: "auto / 1fr" }}>
        <label>
          Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label>
          Value
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            required
          />
        </label>
        <label>
          Month
          <input
            value={month}
            onChange={(event) => setMonth(event.target.value)}
            required
          />
        </label>
        <label>
          Year
          <input
            value={year}
            onChange={(event) => setYear(event.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          onClick={() => {
            addExpense();
          }}
        >
          Add as expense
        </button>
        <button
          type="submit"
          onClick={() => {
            addIncome();
          }}
        >
          Add as income
        </button>
      </form>
    </>
  );
};

export default AddExpensePage;
