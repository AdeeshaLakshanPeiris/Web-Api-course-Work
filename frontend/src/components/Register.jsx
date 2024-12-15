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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <input
        type="text"
        placeholder="Name"
        className="border p-2 mb-2 w-full"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2 w-full"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2 w-full"
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        className="border p-2 mb-2 w-full"
        onChange={(e) => setRole(e.target.value)}
        value={role}
      >
        <option value="admin">Admin</option>
        <option value="driver">Driver</option>
        <option value="passenger">Passenger</option>
      </select>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
};

export default Register;
