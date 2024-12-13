import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReservationPage = () => {
  const { id } = useParams(); // Get the bus ID from the route
  const [bus, setBus] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

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
    try {
      for (const seat of selectedSeats) {
        await axios.post("http://localhost:5000/api/reservations", {
          busId: id,
          seatNumber: seat,
          passengerName: "John Doe", // Replace with logged-in user's name
          passengerId: "675bc727317e945aa3915b90",    // Replace with logged-in user's ID
          date: new Date().toISOString().split("T")[0], // Current date
        });
      }
      alert("Reservation successful!");
      setSelectedSeats([]); // Clear selected seats

      // Refresh reservations
      const res = await axios.get(`http://localhost:5000/api/reservations/${id}`);
      setReservations(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Reservation failed");
    }
  };

  if (!bus) return <p>Loading bus details...</p>;

  const isSeatReserved = (seat) =>
    reservations.some((r) => r.seatNumber === seat);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reserve Seats for {bus.number}</h1>
      <p>Route: {bus.route}</p>
      <p>Available Seats: {bus.seats - reservations.length}</p>
      <div className="grid grid-cols-8 gap-2 mt-4">
        {Array.from({ length: bus.seats }, (_, i) => i + 1).map((seat) => (
          <div
            key={seat}
            className={`p-2 text-center rounded cursor-pointer ${
              isSeatReserved(seat)
                ? "bg-red-500 text-white cursor-not-allowed"
                : selectedSeats.includes(seat)
                ? "bg-blue-500 text-white"
                : "bg-green-500 text-white"
            }`}
            onClick={() => !isSeatReserved(seat) && handleSeatClick(seat)}
          >
            {seat}
          </div>
        ))}
      </div>
      {selectedSeats.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Selected Seats</h2>
          <p>{selectedSeats.join(", ")}</p>
          <button
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleReservation}
          >
            Confirm Reservation
          </button>
        </div>
      )}
    </div>
  );
};

export default ReservationPage;
