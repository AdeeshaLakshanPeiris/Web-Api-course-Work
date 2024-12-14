import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Middleware/ProtectedRoute";
import DriverDashboard from "./components/driver/driverDashboard";
import AdminDashboard from "./components/admin/adminDashboard";
import ReservationPage from "./components/passenger/ReservationPage";
import BusList from "./components/passenger/BusList";
import PassengerInfoPage from "./components/passenger/ReservationInfoPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/buses"
            element={
              <ProtectedRoute role="passenger">
                <BusList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reservation/:id"
            element={
              <ProtectedRoute role="passenger">
                <ReservationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
           <Route
            path="/driver-dashboard"
            element={
              <ProtectedRoute role="driver">
                < DriverDashboard />
              </ProtectedRoute>
            }
          />
              <Route
            path="/passenger-info"
            element={
              <ProtectedRoute role="passenger">
                <PassengerInfoPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
