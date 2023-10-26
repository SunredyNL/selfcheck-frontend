import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from "./components/PrivateRoute";
import AddData from "./pages/AddDataPage";
import BudgetTrackPage from "./pages/BudgetTrackPage";
import YearsPage from "./pages/YearsPage";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path='/user/profile'
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path='/user/years'
          element={
            <PrivateRoute>
              <YearsPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/user/addData'
          element={
            <PrivateRoute>
              <AddData />
            </PrivateRoute>
          }
        />
        <Route
          path='/user/budgetTrack'
          element={
            <PrivateRoute>
              <BudgetTrackPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
