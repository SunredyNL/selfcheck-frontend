import { useState } from "react";

const DataBox = ({ oneData }) => {
  const token = localStorage.getItem("authToken");

  const [showCheckbox, setShowCheckbox] = useState(false);

  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedValue, setUpdatedValue] = useState(0);

  const updatedPayload = {
    description: updatedDescription,
    value: updatedValue,
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

  /* DELETE DATA */
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

  return (
    <div key={oneData._id}>
      <div className="dataBox">
        <div className="dataBoxShown">
          <section className="dataBoxDescription">
            <p>{oneData.description}</p>
          </section>

          <section className="dataBoxValue">
            <p>{oneData.value} €</p>
          </section>

          <section className="dataBoxButton">
            <button
              type="button"
              onClick={() => setShowCheckbox(!showCheckbox)}
            >
              {showCheckbox ? "-" : "+"}
            </button>
          </section>

          <section className="dataBoxButton">
            <button
              type="button"
              onClick={() => {
                deleteData(oneData);
              }}
            >
              x
            </button>{" "}
          </section>
        </div>

        <div className="dataBoxHidden">
          {showCheckbox && (
            <form className="updateDataForm">
              <label>
                Description
                <input
                  value={updatedDescription}
                  onChange={(event) =>
                    setUpdatedDescription(event.target.value)
                  }
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
          )}
        </div>
      </div>
    </div>
  );
};

export default DataBox;
