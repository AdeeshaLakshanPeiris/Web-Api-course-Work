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
import QRCodePage from "./components/passenger/QRCodePage";
import Navbar from "./components/NavBar";
import PublicRoute from "./Middleware/PublicRoute";
import VerifyQRCode from "./components/driver/VerifyQRCode";



const App = () => {
  return (
    <AuthProvider>
      
      <Router>
      <Navbar />
        <Routes>
       
          {/* Public Routes */}
          
           {/* Public Routes */}
           <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />


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
          <Route path="/qr-code" element={<QRCodePage/>} />
          <Route path="/verify-code" element={< VerifyQRCode/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
