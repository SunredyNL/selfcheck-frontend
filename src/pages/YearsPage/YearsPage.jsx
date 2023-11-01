import "./YearsPage.css";
import AddYearExpand from "./AddYearExpand";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import trashIcon from "../../assets/trash.png";
import backArrow from "../../assets/back.png";

const YearsPage = () => {
  const token = localStorage.getItem("authToken");

  const { currentUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [showCheckbox, setshowCheckbox] = useState(false);

  const [yearMonths, setYearMonths] = useState({});

  const [error, setError] = useState("");

  const payload = {
    name,
    user: `${currentUser}`,
  };

  /*FUNCTION TO ADD A YEAR*/
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
        fetchYears();
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*FECTCH ALL THE YEARS FROM THIS USER*/
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

  /*FUNCTION TO DELETE A YEAR*/
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
        fetchYears();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchYears();
  }, []);

  return (
    <div>
      <section className="YearHeader">
        <Link to={`/user/profile`}>
          <img src={backArrow} />
        </Link>
        <h1>Overview</h1>
      </section>
      <AddYearExpand
        addYear={addYear}
        name={name}
        setName={setName}
        showCheckbox={showCheckbox}
        setshowCheckbox={setshowCheckbox}
        years={years}
        error={error}
        setError={setError}
      />
      <section className="MultiYearCards">
        {years
          .sort((a, b) => b.name - a.name)
          .map((oneYear) => {
            const trackedMonths = oneYear.month;
            return (
              <div key={oneYear._id} className="YearCard">
                <Link to={`/user/${oneYear._id}/months`}>
                  <div>
                    <h2>{oneYear.name}</h2>
                    <p>Income: {oneYear.monthIncomeSum}€</p>
                    <p>Expenses: {oneYear.monthExpenseSum}€</p>
                    <p>Months tracked: {trackedMonths.length}</p>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    const confirmed = window.confirm(
                      `Do you really want to delete ${oneYear.name}?`
                    );
                    if (confirmed) {
                      deleteYear(oneYear);
                    }
                  }}
                >
                  <img src={trashIcon} />
                </button>
              </div>
            );
          })}
      </section>
    </div>
  );
};

export default YearsPage;
