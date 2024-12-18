import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute user:", user);
  console.log("Required role:", role);

  // Wait until loading completes
  if (loading) {
    return <p>Loading...</p>; // You can customize this loading UI
  }

  // If user is not logged in, redirect to login
  if (!user) {
    console.warn("User not logged in, redirecting to login.");
    return <Navigate to="/login" replace />;
  }

  // If user role does not match, redirect to login
  if (role && user.role !== role) {
    console.warn(`User role (${user.role}) does not match required role (${role}), redirecting.`);
    return <Navigate to="/login" replace />;
  }

  // If all checks pass, render the protected component
  return children;
};

export default ProtectedRoute;
