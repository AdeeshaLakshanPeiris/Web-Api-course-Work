import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaChair } from "react-icons/fa"; // Seat icon

const ReservationPage = () => {
  const { id } = useParams(); // Get the bus ID from the route
  const [bus, setBus] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch bus details and reservations
  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const busResponse = await axios.get(`http://localhost:5000/api/buses/${id}`);
        setBus(busResponse.data);
      } catch (err) {
        console.error("Failed to fetch bus details:", err);
      }
    };

    const fetchReservations = async () => {
      try {
        const reservationResponse = await axios.get(`http://localhost:5000/api/reservations/${id}`);
        setReservations(reservationResponse.data);
      } catch (err) {
        console.error("Failed to fetch reservations:", err);
      }
    };

    fetchBusDetails();
    fetchReservations();
  }, [id]);

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleReservation = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    navigate("/passenger-info", {
      state: { bus, selectedSeats }, // Pass data to the next page
    });

    setLoading(true);
    // try {
    //   const reservedSeats = [];
    //   for (const seat of selectedSeats) {
    //     const res = await axios.post("http://localhost:5000/api/reservations", {
    //       busId: id,
    //       seatNumber: seat,
    //       passengerName: "John Doe", // Replace with logged-in user's name
    //       passengerId: "675bc727317e945aa3915b90", // Replace with logged-in user's ID
    //       date: new Date().toISOString().split("T")[0], // Current date
    //     });
    //     reservedSeats.push(res.data); // Store reservation data for passing to the next page
    //   }
  
    //   // Redirect to PassengerInfoPage and pass reservation details
    //   navigate("/passenger-info", {
    //     state: { bus, selectedSeats, reservedSeats }, // Pass data to the next page
    //   });
    // } catch (err) {
    //   alert(err.response?.data?.message || "Reservation failed");
    // } finally {
    //   setLoading(false);
    // }
  };
  if (!bus) return <p>Loading bus details...</p>;

  const isSeatReserved = (seat) =>
    reservations.some((r) => r.seatNumber === seat);

  // Define the 3+2 seat layout
  const rows = 8; // Number of rows
  const seatsPerRow = [3, 2]; // Define the seat configuration (3+2)
  const seatLayout = Array.from({ length: rows }).map((_, rowIndex) => {
    const row = [];
    let seatNumber = rowIndex * 5 + 1; // Start seat numbering
    seatsPerRow.forEach((count, index) => {
      for (let i = 0; i < count; i++) {
        row.push(seatNumber++);
      }
      if (index === 0) row.push(null); // Add an empty space for the aisle
    });
    return row;
  });

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bus Information */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <img
            src={bus.image || "https://via.placeholder.com/500x300"}
            alt={bus.route}
            className="w-full h-56 object-cover rounded-md mb-4"
          />
          <h1 className="text-2xl font-bold">{bus.route}</h1>
          <p className="text-gray-600 text-sm mb-2">
            <strong>Bus Number:</strong> {bus.number}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            <strong>Total Seats:</strong> {bus.seats}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            <strong>Seats Available:</strong> {bus.seats - reservations.length}
          </p>
        </div>

        {/* Seat Selection */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Select Your Seat</h2>

          {/* Bus Seat Layout */}
          <div className="flex flex-col items-center">
            {seatLayout.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center mb-4">
                {row.map((seat, index) =>
                  seat ? (
                    <div
                      key={seat}
                      className={`h-12 w-12 flex items-center justify-center rounded cursor-pointer border shadow-md ${
                        isSeatReserved(seat)
                          ? "bg-red-500 text-white cursor-not-allowed"
                          : selectedSeats.includes(seat)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => !isSeatReserved(seat) && handleSeatClick(seat)}
                    >
                      <FaChair />
                      <span className="text-xs">{seat}</span>
                    </div>
                  ) : (
                    <div key={index} className="h-12 w-12"></div> // Empty space for aisle
                  )
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-gray-200 border rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-red-500 border rounded"></div>
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-blue-500 border rounded"></div>
              <span>Selected</span>
            </div>
          </div>

          {/* Selected Seats */}
          {selectedSeats.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-bold">Selected Seats:</h3>
              <p>{selectedSeats.join(", ")}</p>
            </div>
          )}

          {/* Reservation Button */}
          <button
            className={`w-full py-2 px-4 rounded-md mt-6 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600 text-white"
            }`}
            onClick={handleReservation}
            disabled={loading}
          >
            {loading ? "Processing..." : "Reserve Seats"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationPage;
