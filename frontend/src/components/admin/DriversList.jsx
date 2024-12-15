import React, { useState, useEffect } from "react";
import axios from "axios";

const DriversList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null); // Selected driver for assigning bus
  const [busDetails, setBusDetails] = useState({
    number: "",
    route: "",
    seats: "",
    departureTime: "",
    arrivalTime: "",
    date: "",
  });

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/drivers");
        setDrivers(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch drivers");
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const handleDelete = async (driverId) => {
    if (!window.confirm("Are you sure you want to delete this driver?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/drivers/${driverId}`);
      setDrivers((prev) => prev.filter((driver) => driver._id !== driverId));
      alert("Driver deleted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete driver");
    }
  };

  const handleAssignBus = async () => {
    if (!selectedDriver) return;

    // Ensure all fields are filled
    if (
      !busDetails.number ||
      !busDetails.route ||
      !busDetails.seats ||
      !busDetails.departureTime ||
      !busDetails.arrivalTime ||
      !busDetails.date
    ) {
      alert("Please fill in all bus details");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/buses", {
        ...busDetails,
        driverId: selectedDriver._id, // Assign the bus to the selected driver
      });

      alert("Bus assigned successfully!");
      setBusDetails({
        number: "",
        route: "",
        seats: "",
        departureTime: "",
        arrivalTime: "",
        date: "",
      });
      setSelectedDriver(null); // Close modal
    } catch (err) {
      alert(err.response?.data?.message || "Failed to assign bus");
    }
  };

  if (loading) return <p>Loading drivers...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Drivers</h2>
      {drivers.length === 0 ? (
        <p>No drivers found.</p>
      ) : (
        <ul className="space-y-4">
          {drivers.map((driver) => (
            <li key={driver._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
              <p><strong>Name:</strong> {driver.name}</p>
              <p><strong>Email:</strong> {driver.email}</p>
              <p><strong>Phone:</strong> {driver.phone}</p>
              <div className="mt-2 flex space-x-2">
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  onClick={() => handleDelete(driver._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  onClick={() => setSelectedDriver(driver)} // Open modal to assign bus
                >
                  Assign Bus
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Assign Bus Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <button
              onClick={() => setSelectedDriver(null)} // Close modal
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              Assign Bus to {selectedDriver.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="number"
                placeholder="Bus Number"
                className="border p-2 rounded-md"
                value={busDetails.number}
                onChange={(e) => setBusDetails({ ...busDetails, number: e.target.value })}
              />
              <input
                type="text"
                name="route"
                placeholder="Route"
                className="border p-2 rounded-md"
                value={busDetails.route}
                onChange={(e) => setBusDetails({ ...busDetails, route: e.target.value })}
              />
              <input
                type="number"
                name="seats"
                placeholder="Seats"
                className="border p-2 rounded-md"
                value={busDetails.seats}
                onChange={(e) => setBusDetails({ ...busDetails, seats: e.target.value })}
              />
              <input
                type="time"
                name="departureTime"
                placeholder="Departure Time"
                className="border p-2 rounded-md"
                value={busDetails.departureTime}
                onChange={(e) => setBusDetails({ ...busDetails, departureTime: e.target.value })}
              />
              <input
                type="time"
                name="arrivalTime"
                placeholder="Arrival Time"
                className="border p-2 rounded-md"
                value={busDetails.arrivalTime}
                onChange={(e) => setBusDetails({ ...busDetails, arrivalTime: e.target.value })}
              />
              <input
                type="date"
                name="date"
                placeholder="Date"
                className="border p-2 rounded-md"
                value={busDetails.date}
                onChange={(e) => setBusDetails({ ...busDetails, date: e.target.value })}
              />
            </div>
            <button
              className="mt-6 w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={handleAssignBus}
            >
              Assign Bus
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriversList;
