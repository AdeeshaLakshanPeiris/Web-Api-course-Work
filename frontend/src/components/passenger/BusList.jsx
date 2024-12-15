import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BusList = () => {
  const [buses, setBuses] = useState([]); // Original bus data from API
  const [filteredBuses, setFilteredBuses] = useState([]); // Filtered buses for display
  const [searchTerm, setSearchTerm] = useState(""); // Search input value
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  

  // Fetch buses from API
  useEffect(() => {
    
    axios.get(`${apiBaseUrl}/buses`).then((res) => {
      setBuses(res.data);
      setFilteredBuses(res.data); // Initialize with full data
    });
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter buses based on the search term
    const filtered = buses.filter((bus) =>
      bus.route.toLowerCase().includes(term) ||
      bus.number?.toLowerCase().includes(term) || // Filter by bus number
      bus.type?.toLowerCase().includes(term) // Optionally filter by type if it's in the data
    );
    setFilteredBuses(filtered);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Search and Filter Section */}
        <div className="flex items-center mb-8">
          <input
            type="text"
            placeholder="Search by Route, Bus Type, or Number..."
            className="w-full max-w-md px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-300"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            className="ml-4 px-4 py-2 bg-purple-500 text-white rounded-md shadow hover:bg-purple-600"
            onClick={() => setFilteredBuses(buses)} // Reset search results
          >
            Reset
          </button>
        </div>

        {/* Bus Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBuses.length > 0 ? (
            filteredBuses.map((bus) => (
              <div
                key={bus._id}
                className="bg-white border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <img
                    src={bus.image || "https://via.placeholder.com/300x200"} // Replace with bus image URL or placeholder
                    alt={bus.route}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Bus Details */}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">{bus.route}</h2>
                  <p className="text-sm text-gray-600">Seats: {bus.seats} Passengers</p>
                  <p className="text-sm text-gray-600">Departure: {bus.departureTime}</p>
                  <p className="text-sm text-gray-600">Arrival: {bus.arrivalTime}</p>

                  <div className="mt-4">
                    <Link
                      to={`/reservation/${bus._id}`}
                      className="block w-full text-center px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition"
                    >
                      Reserve Seats
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">
              No buses match your search criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusList;
