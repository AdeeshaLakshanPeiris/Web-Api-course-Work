import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const PassengerInfoPage = () => {
  const location = useLocation();
   const { user } = useAuth();

  const navigate = useNavigate();
  const { bus, selectedSeats } = location.state || {}; // Get data from the previous page
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  if (!bus || !selectedSeats) {
    return <p>No reservation data available. Please reserve your seats first.</p>;
  }

  console.log(user);

  const handleReservation = async () => {
    if (!fullName || !email || !phone) {
      alert("Please fill in all passenger details.");
      return;
    }

    setLoading(true);
    try {
      // Create reservations for each selected seat
      for (const seat of selectedSeats) {
        await axios.post("http://localhost:5000/api/reservations", {
          busId: bus._id,
          seatNumber: seat,
          passengerName: fullName,
        //   userID:user.id,
          date: new Date().toISOString().split("T")[0], // Current date
        });
      }

      alert("Reservation successful!");
      navigate("/buses"); // Redirect to bus list or confirmation page
    } catch (err) {
      alert(err.response?.data?.message || "Reservation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Passenger Information</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-600">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm text-gray-600">Phone</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-md p-2"
          />
        </div>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-bold mb-2">Your Booking Summary</h3>
          <p><strong>Bus:</strong> {bus.route} ({bus.number})</p>
          <p><strong>Selected Seats:</strong> {selectedSeats.join(", ")}</p>
          <p><strong>Total Amount:</strong> ${selectedSeats.length * 750} (₹750 per seat)</p>
        </div>
        <button
          onClick={handleReservation}
          className={`w-full py-2 px-4 rounded-md mt-4 ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600 text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm Reservation"}
        </button>
      </div>
    </div>
  );
};

export default PassengerInfoPage;
