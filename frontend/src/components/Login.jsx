import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useModal } from "../context/ModalContext";
import { useLoader } from "../context/LoaderContext";

const Login = () => {
  const { login ,user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { openSuccess, openAlert, openWarning } = useModal();
  const { startLoading, stopLoading } = useLoader();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  
  const handleLogin = async () => {
    

    try {
      setLoading(true);
      startLoading();
      
      
      const res = await axios.post(`${apiBaseUrl}/users/login`, {
        email,
        password,
      });
      const { token } = res.data;

      // Decode the token to get user data
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userData = {
        id: decodedToken.id,
        role: decodedToken.role,
        email,
      };

      // Save user data to AuthContext
      login(userData);

      openSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        if (userData.role === "admin") {
          navigate("/admin-dashboard");
        } else if (userData.role === "passenger") {
          navigate("/buses");
        } else if (userData.role === "driver") {
          navigate("/driver-dashboard");
        } else {
          openWarning("Unknown role! Contact support.");
        }
      }, 1500);
    } catch (err) {
      openAlert(err.response?.data?.message || "Login failed! Try again.");
      stopLoading();
      // alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
      stopLoading();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="absolute bottom-0 right-0 overflow-hidden lg:inset-y-0 ">
        <img
          className="w-auto h-full"
          src="https://d33wubrfki0l68.cloudfront.net/1e0fc04f38f5896d10ff66824a62e466839567f8/699b5/images/hero/3/background-pattern.png"
          alt="Background Pattern"
        />
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 relative z-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Bus Reservation Login</h1>
        <p className="text-center text-gray-600 mb-8">
          Please log in to access your dashboard
        </p>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className={`w-full mt-6 py-2 font-semibold  text-white bg-gray-900 rounded-xl hover:bg-gray-700  ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-700"
          }`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className=" font-semibold "
            >
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
