import { useState } from "react";
import editIcon from "../../../assets/edit.png";
import trashIcon from "../../../assets/trash.png";
import updateIcon from "../../../assets/update.png";

const DataBox = ({ oneData, monthUpdate, fetchData }) => {
  const token = localStorage.getItem("authToken");

  const [showCheckbox, setShowCheckbox] = useState(false);

  const [updatedDescription, setUpdatedDescription] = useState(
    oneData.description
  );
  const [updatedValue, setUpdatedValue] = useState(oneData.value);

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
        fetchData();
        monthUpdate();
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
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dataBox" data-category={oneData.category} key={oneData._id}>
      <div className="dataBoxShown">
        <div>
          <section className="dataBoxDescription">
            <p>{oneData.description}</p>
          </section>

          <section className="dataBoxValue">
            <p>{oneData.value} €</p>
          </section>
        </div>

        <div>
          <section>
            <button
              type="button"
              onClick={() => setShowCheckbox(!showCheckbox)}
              className={showCheckbox ? "dataBoxButtonActive" : "dataBoxButton"}
              data-category={oneData.category}
            >
              <img src={editIcon} />
            </button>
          </section>

          <section>
            <button
              type="button"
              onClick={() => {
                deleteData(oneData);
                monthUpdate();
              }}
              className="dataBoxButton"
              data-category={oneData.category}
            >
              <img src={trashIcon} />
            </button>{" "}
          </section>
        </div>
      </div>

      <div>
        {showCheckbox && (
          <div className="dataBoxHidden" data-category={oneData.category}>
            <form className="updateDataForm">
              <div className="updateDataFormText">
                <label>
                  <p>Description</p>
                  <input
                    value={updatedDescription}
                    onChange={(event) =>
                      setUpdatedDescription(event.target.value)
                    }
                    required
                  />
                </label>

                <label>
                  <p>Value</p>
                  <input
                    value={updatedValue}
                    onChange={(event) => setUpdatedValue(event.target.value)}
                    required
                  />
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={() => {
                    dataUpdate(oneData);
                  }}
                  className="dataBoxButton"
                  data-category={oneData.category}
                >
                  <img src={updateIcon} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataBox;
