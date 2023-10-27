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
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedValue, setUpdatedValue] = useState(0);
  const payload = {
    category,
    description,
    value,
    month: `${monthId}`,
  };

  const updatedPayload = {
    description: updatedDescription,
    value: updatedValue
  }

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

  const dataUpdate = async (oneData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/data/${oneData._id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedPayload),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        await response.json();
        location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (oneData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/data/${oneData._id}`,
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
          <div key={oneData._id}>
            <p>{oneData.category}</p>
            <p>{oneData.description}</p>
            <p>{oneData.value}</p>
            <form style={{ display: "grid", gridTemplate: "auto / 1fr" }}>
              <label>
                Description
                <input
                  value={updatedDescription}
                  onChange={(event) => setUpdatedDescription(event.target.value)}
                  required
                />
              </label>

              <label>
                Value
                <input
                  value={updatedValue}
                  onChange={(event) => setUpdatedValue(event.target.value)}
                  required
                />
              </label>

              <button
                type="submit"
                onClick={() => {
                  dataUpdate(oneData);
                }}
              >
                Update data
              </button>
            </form>
            <button
              type="button"
              onClick={() => {
                deleteData(oneData);
              }}
            >
              Delete data
            </button>
          </div>
        );
      })}
    </>
  );
};

export default DataPage;
