import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DataPage = () => {
  const token = localStorage.getItem("authToken");

  const { monthId } = useParams();

  const [data, setData] = useState([]);

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [month, setMonth] = useState("");
  const payload = {
    category,
    description,
    value,
    month: `${monthId}`,
  };

  const addData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const currData = await response.json();
        console.log(currData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/data/${monthId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const allData = await response.json();
        console.log("chicorita", allData);
        setData(allData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <h1>Add data</h1>

      <form style={{ display: "grid", gridTemplate: "auto / 1fr" }}>
        <label>
          Type
          <input
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          />
        </label>

        <label>
          Description
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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

        <button
          type="submit"
          onClick={() => {
            addData();
          }}
        >
          Add as data
        </button>
      </form>

      {data.map((oneData) => {
        return (
            <p key={oneData._id}>{oneData.category}</p>
        );
      })}
    </>
  );
};

export default DataPage;
