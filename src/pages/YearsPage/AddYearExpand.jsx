import { useState } from "react";

const AddYearExpand = ({
  addYear,
  name,
  setName,
  showCheckbox,
  setshowCheckbox,
  years,
  error,
  setError,
}) => {
  const handleCreateYear = () => {
    const yearExists = years.some((element) => element.name === parseInt(name));
    if (yearExists) {
      setError("Year already exists.");
    } else if (name.trim() === "") {
      setError("Year cannot be empty.");
    } else {
      setError("");
      setName("");
      addYear();
    }
  };

  return (
    <section className="AddYearFormCheckbox">
      <button type="button" onClick={() => setshowCheckbox(!showCheckbox)}>
        {showCheckbox ? "-" : "+"}
      </button>
      <div className="YearForm">
        {showCheckbox && (
          <form /* style={{ display: "grid", gridTemplate: "auto / 1fr" }} */>
            <label>
              <input
                value={name}
                placeholder="year"
                onChange={(event) => {
                  setName(event.target.value);
                  setError("");
                }}
                required
              />
            </label>
            <button type="button" onClick={handleCreateYear}>
              Create
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
};

export default AddYearExpand;
