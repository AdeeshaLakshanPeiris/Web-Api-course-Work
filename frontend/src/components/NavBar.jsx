import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user data from context
    navigate("/"); // Redirect to login page
  };

  return (
    <nav className="bg-purple-500 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold">
          Bus Reservation
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {user && (
            <>
              {/* Conditionally render links based on user role */}
              {user.role === "admin" && <Link to="/admin-dashboard">Admin Dashboard</Link>}
              {user.role === "passenger" && <Link to="/buses">Buses</Link>}
              {user.role === "driver" && <Link to="/driver-dashboard">Driver Dashboard</Link>}
            </>
          )}
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="hidden md:inline-block">
                Hello, <strong>{user.email}</strong>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/"
              className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
