import { useRef } from "react";

const AddMonthExpand = ({
  addMonth,
  name,
  setName,
  showCheckbox,
  setshowCheckbox,
  months,
  error,
  setError,
  yearlyMonths,
}) => {
  const selectRef = useRef(null);

  const handleCreateMonth = () => {
    const monthExists = months.some((element) => element.name === name);
    if (monthExists) {
      setError("Month already exists.");
    } else if (name.trim() === "") {
      setError("Month cannot be empty.");
    } else {
      setError("");
      setName("");
      selectRef.current.value = "";
      addMonth();
    }
  };

  return (
    <section className="AddMonthFormCheckbox">
      <button type="button" onClick={() => setshowCheckbox(!showCheckbox)}>
        {showCheckbox ? "-" : "+"}
      </button>
      <div className="MonthForm">
        {showCheckbox && (
          <form
            id="addMonthForm" /* style={{ display: "grid", gridTemplate: "auto / 1fr" }} */
          >
            <label>
              <select
                ref={selectRef}
                onChange={(event) => {
                  setName(event.target.value);
                  setError("");
                }}
                required
              >
                <option value="">Select a month</option>
                {yearlyMonths.map((month) => {
                  return (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  );
                })}
              </select>
            </label>
            <button type="button" onClick={handleCreateMonth}>
              Create
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
};

export default AddMonthExpand;
