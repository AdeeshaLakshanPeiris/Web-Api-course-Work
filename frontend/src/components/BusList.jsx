// src/components/BusList.js
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BusList = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/buses").then((res) => setBuses(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bus List</h1>
      {buses.map((bus) => (
        <div key={bus._id} className="border p-4 rounded mb-4">
          <h2 className="text-xl font-semibold">{bus.number} - {bus.route}</h2>
          <p>Seats: {bus.seats}</p>
          <p>Departure: {bus.departureTime}</p>
          <p>Arrival: {bus.arrivalTime}</p>
          <Link
            to={`/reservation/${bus._id}`}
            className="text-blue-500 hover:underline"
          >
            Reserve Seats
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BusList;