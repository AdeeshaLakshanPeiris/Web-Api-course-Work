import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("passenger");

  const handleRegister = async () => {
    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      const res = await axios.post(`${apiBaseUrl}/users/register`, { name, email, password, role });
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message);

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">
        Create Your Account
      </h1>
  
      <div className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
  
        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
  
        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Create a strong password"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
  
        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Role
          </label>
          <select
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="driver">Driver</option>
            <option value="passenger">Passenger</option>
          </select>
        </div>
      </div>
  
      <button
        className="mt-6 w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-200"
        onClick={handleRegister}
      >
        Register
      </button>
  
      <p className="mt-4 text-sm text-purple-500 text-center">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-purple-500 hover:underline hover:text-purple-600"
        >
          Log In
        </a>
      </p>
    </div>
  </div>
  
  );
};

export default Register;
