import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  // If the user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If the user's role does not match the required role, redirect to the login page
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // If authentication and role match, render the children (protected component)
  return children;
};

export default ProtectedRoute;
