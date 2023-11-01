import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/loginpage/LoginPage";
import HomePage from "./pages/homepage/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import YearsPage from "./pages/YearsPage/YearsPage";
import MonthsPage from "./pages/MonthsPage/MonthsPage";
import DataPage from "./pages/DataPage/DataPage";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/user/years"
          element={
            <PrivateRoute>
              <YearsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/:yearId/months"
          element={
            <PrivateRoute>
              <MonthsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/:monthId/data"
          element={
            <PrivateRoute>
              <DataPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
