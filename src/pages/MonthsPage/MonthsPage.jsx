import "./MonthsPage.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useParams } from "react-router-dom";
import trashIcon from "../../assets/trash.png";
import AddMonthExpand from "./AddMonthExpand";
import backArrow from "../../assets/back.png";
import { UserContext } from "../../contexts/UserContext";

const MonthsPage = () => {
  const token = localStorage.getItem("authToken");

  const { currentUser } = useContext(AuthContext);

  const { yearId } = useParams();

  const [name, setName] = useState("");
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);
  const [showCheckbox, setshowCheckbox] = useState(false);
  const [error, setError] = useState("");

  const yearlyMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const payload = {
    name,
    year: `${yearId}`,
  };

  /*FUNCTION TO ADD A MONTH*/
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
        fetchMonth();
        fetchYears();
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*FECTCH ALL THE MONTHS FROM THIS YEAR*/
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
        console.log("chicorita-months", allMonths);
        setMonths(allMonths);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*DELETE A MONTH FROM THIS YEAR*/
  const deleteMonth = async (oneMonth) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/month/${oneMonth._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        fetchMonth();
        fetchYears();
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*FECTCH ALL YEARS*/
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

  useEffect(() => {
    fetchMonth();
    fetchYears();
  }, []);

  /*FUNCTION TO SORT MONTHS*/
  function sortByMonth(arr) {
    arr.sort(function (a, b) {
      return yearlyMonths.indexOf(a.name) - yearlyMonths.indexOf(b.name);
    });
  }
  sortByMonth(months);

  return (
    <div>
      <section className="MonthHeader">
        <Link to={`/user/years`}>
          <img src={backArrow} />
        </Link>
        {years.map((element) => {
          if (element._id === yearId) {
            return <h1 key={element._id}>{element.name}</h1>;
          }
        })}
      </section>

      <AddMonthExpand
        addMonth={addMonth}
        name={name}
        setName={setName}
        showCheckbox={showCheckbox}
        setshowCheckbox={setshowCheckbox}
        months={months}
        error={error}
        setError={setError}
        yearlyMonths={yearlyMonths}
      />
      <section className="MultiMonthCards">
        {months.map((oneMonth) => {
          return (
            <div key={oneMonth._id} className="MonthCard">
              <Link to={`/user/${oneMonth._id}/data`}>
                <h2>{oneMonth.name}</h2>
                <hr />
                <p>Income: 20.000€</p>
                <p>Expenses: 12.000€</p>
              </Link>
              <button
                type="button"
                onClick={() => {
                  const confirmed = window.confirm(
                    `Do you really want to delete ${oneMonth.name}?`
                  );
                  if (confirmed) {
                    deleteMonth(oneMonth);
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

export default MonthsPage;
