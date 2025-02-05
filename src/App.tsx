import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Index from "./components/index";
import Login from "./ui-component/login";
import Register from "./ui-component/register";
import Auth from "./ui-component/auth";
import Dashboard from "./components/dashboard";
import PropertyDetails from "./components/property";
import Booking from "./components/booking";
import Analystic from "./dashboard/pages/analystic";
import Analyse from "./dashboard/pages/analyse";
import Property from "./dashboard/pages/property";
import PropDetails from "./dashboard/pages/propDetails";

// Utility function to get a cookie by name
const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

// Check if the user is authenticated based on the presence of a `userID` cookie
const isAuthenticated = (): boolean => {
  const userID = getCookie("userID");
  return userID !== null; // Returns true if `userID` cookie exists
};

// Type for PrivateRoute props
interface PrivateRouteProps {
  children: React.ReactNode;
}

// PrivateRoute component
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <Home>
              <Index />
            </Home>
          }
        />
        <Route
          path="/property/:id"
          element={
            <Home>
              <PropertyDetails />
            </Home>
          }
        />
        <Route
          path="/booking"
          element={
            <Home>
              <Booking />
            </Home>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<Auth />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard/"
          element={
            <PrivateRoute>
              <Dashboard>
                <Analystic />
              </Dashboard>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/property"
          element={
            <PrivateRoute>
              <Dashboard>
                <Property />
              </Dashboard>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/analystic"
          element={
            <PrivateRoute>
              <Dashboard>
                <Analyse />
              </Dashboard>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/propDetails/:id"
          element={
            <PrivateRoute>
              <Dashboard>
                <PropDetails />
              </Dashboard>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
