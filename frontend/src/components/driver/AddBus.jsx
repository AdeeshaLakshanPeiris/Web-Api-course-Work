import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Assuming you have AuthContext for managing authentication

const AddBus = () => {
  const { user } = useAuth(); // Get the logged-in user's data (e.g., driver ID)
  const [busDetails, setBusDetails] = useState({
    number: "",
    route: "",
    seats: "",
    departureTime: "",
    arrivalTime: "",
    date: "",
  });

  const [loading, setLoading] = useState(false); // Loading state for the button
  const [error, setError] = useState(""); // Error message

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBus = async () => {
    if (
      !busDetails.number ||
      !busDetails.route ||
      !busDetails.seats ||
      !busDetails.departureTime ||
      !busDetails.arrivalTime ||
      !busDetails.date
    ) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        ...busDetails,
        driverId: user?.id, // Include the driver's ID from AuthContext
      };
console.log(payload);
      const res = await axios.post("http://localhost:5000/api/buses", payload);
      alert(res.data.message);

      setBusDetails({
        number: "",
        route: "",
        seats: "",
        departureTime: "",
        arrivalTime: "",
        date: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add bus");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 via-blue-500 to-purple-500 text-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Add a New Bus</h2>
      <p className="text-sm text-purple-200 mb-6">
        Fill in the details below to add a new bus to the system.
      </p>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="number"
          placeholder="Bus Number"
          className="border rounded-md p-2 text-black"
          value={busDetails.number}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="route"
          placeholder="Route"
          className="border rounded-md p-2 text-black"
          value={busDetails.route}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="seats"
          placeholder="Seats"
          className="border rounded-md p-2 text-black"
          value={busDetails.seats}
          onChange={handleInputChange}
        />
        <input
          type="time"
          name="departureTime"
          placeholder="Departure Time"
          className="border rounded-md p-2 text-black"
          value={busDetails.departureTime}
          onChange={handleInputChange}
        />
        <input
          type="time"
          name="arrivalTime"
          placeholder="Arrival Time"
          className="border rounded-md p-2 text-black"
          value={busDetails.arrivalTime}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          className="border rounded-md p-2 text-black"
          value={busDetails.date}
          onChange={handleInputChange}
        />
      </div>

      <button
        className={`mt-6 w-full py-2 px-4 rounded-md ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
        onClick={handleAddBus}
        disabled={loading}
      >
        {loading ? "Adding Bus..." : "Add Bus"}
      </button>
    </div>
  );
};

export default AddBus;
