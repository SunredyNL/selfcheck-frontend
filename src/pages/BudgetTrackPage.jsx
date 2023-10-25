import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const BudgetTrackPage = () => {
  const token = localStorage.getItem("authToken");

  const { currentUser } = useContext(AuthContext)

  const [user, setUser] = useState({});
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

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
        setIncomes(parsed.user.income);
        setExpenses(parsed.user.expense);
        console.log(parsed.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const sortYearData = () => {
    let yearArray = [];
    incomes.forEach((oneIncome) => {
      if (!yearArray.includes(oneIncome.year)) {
        yearArray.push(oneIncome.year);
      }
    });
    expenses.forEach((oneExpense) => {
      if (!yearArray.includes(oneExpense.year)) {
        yearArray.push(oneExpense.year);
      }
    });
    yearArray.sort((a, b) => a - b);
    return yearArray;
  };

  const sortMonthData = () => {
    let monthArray = [];
    incomes.forEach((oneIncome) => {
      if (!monthArray.includes(oneIncome.month)) {
        monthArray.push(oneIncome.month);
      }
    });
    expenses.forEach((oneExpense) => {
      if (!monthArray.includes(oneExpense.month)) {
        monthArray.push(oneExpense.month);
      }
    });
    monthArray.sort((a, b) => a - b);
    return monthArray;
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {/*     <select>
        {sortYearData().map((oneYear) => {
        return <option key={oneYear} value={oneYear}>{oneYear}</p>;
      })}
    </select> */}
      {sortMonthData().map((oneMonth) => {
        return <p key={oneMonth}>{oneMonth}</p>;
      })}
    </>
  );
};

export default BudgetTrackPage;
