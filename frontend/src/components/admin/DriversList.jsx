import React, { useState, useEffect } from "react";
import axios from "axios";
import { useModal } from "../../context/ModalContext";
import api from "../../api/api";
import { useLoader } from "../../context/LoaderContext";

const DriversList = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDriver, setSelectedDriver] = useState(null);
 const { startLoading, stopLoading } = useLoader();
  const { openSuccess, openAlert, openWarning ,openConfirm } = useModal();
  const [busDetails, setBusDetails] = useState({
    number: "",
    route: "",
    seats: "",
    departureTime: "",
    arrivalTime: "",
    date: "",
  });
  const [image, setImage] = useState(null); // For bus image upload

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        startLoading();
        const res = await api.get("/drivers");
        setDrivers(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch drivers");
      } finally {
        stopLoading();
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  const handleDelete = async (driverId) => {
    openConfirm(
      "Are you sure you want to delete this driver?",
      async () => {
        try {
          // Perform the delete operation
          await api.delete(`/drivers/${driverId}`);
          setDrivers((prev) => prev.filter((driver) => driver._id !== driverId));
          openSuccess("Driver deleted successfully!");
        } catch (err) {
          // Handle errors using openAlert for better user feedback
          openAlert(err.response?.data?.message || "Failed to delete driver");
        }
      },
      "Confirm Delete"
    );
  };
  

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
      // alert("Please fill in all bus details");
      openWarning("Please fill in all bus details");
      return;
    }

    const formData = new FormData();
    formData.append("number", busDetails.number);
    formData.append("route", busDetails.route);
    formData.append("seats", busDetails.seats);
    formData.append("departureTime", busDetails.departureTime);
    formData.append("arrivalTime", busDetails.arrivalTime);
    formData.append("date", busDetails.date);
    formData.append("driverId", selectedDriver._id);
    if (image) formData.append("image", image);

    try {
      await api.post("/buses", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // alert("Bus assigned successfully!");
      openSuccess("Bus assigned successfully!");
      setBusDetails({
        number: "",
        route: "",
        seats: "",
        departureTime: "",
        arrivalTime: "",
        date: "",
      });
      setImage(null);
      setSelectedDriver(null); // Close modal
    } catch (err) {
      // alert(err.response?.data?.message || "Failed to assign bus");
      openAlert(err.response?.data?.message);
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
              <p>
                <strong>Name:</strong> {driver.name}
              </p>
              <p>
                <strong>Email:</strong> {driver.email}
              </p>
              <p>
                <strong>Phone:</strong> {driver.phone}
              </p>
              <div className="mt-2 flex space-x-2">
                <button
                  className="bg-gray-900 text-white py-1 px-3 rounded hover:bg-gray-700"
                  onClick={() => handleDelete(driver._id)}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-100 border border-black text-black py-1 px-3 rounded hover:bg-gray-600"
                  onClick={() => setSelectedDriver(driver)}
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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
            <button
              onClick={() => setSelectedDriver(null)}
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
                onChange={(e) =>
                  setBusDetails({ ...busDetails, number: e.target.value })
                }
              />
              <input
                type="text"
                name="route"
                placeholder="Route"
                className="border p-2 rounded-md"
                value={busDetails.route}
                onChange={(e) =>
                  setBusDetails({ ...busDetails, route: e.target.value })
                }
              />
              <input
                type="number"
                name="seats"
                placeholder="Seats"
                className="border p-2 rounded-md"
                value={busDetails.seats}
                onChange={(e) =>
                  setBusDetails({ ...busDetails, seats: e.target.value })
                }
              />

              <div>
                
<label className="block text-sm font-medium text-gray-700">
departure Time
  </label>
              <input
                type="time"
                name="departureTime"
                placeholder="Departure Time"
                className="border p-2 rounded-md"
                value={busDetails.departureTime}
                onChange={(e) =>
                  setBusDetails({ ...busDetails, departureTime: e.target.value })
                }
              />
              </div>


<div className="relative">
<label  className="block text-sm font-medium text-gray-700">
    Arrival Time
  </label>
              
              <input
                type="time"
                name="arrivalTime"
                placeholder="Arrival Time"
                className="border p-2 rounded-md"
                value={busDetails.arrivalTime}
                onChange={(e) =>
                  setBusDetails({ ...busDetails, arrivalTime: e.target.value })
                }
              />
</div>
               
              
              <input
                type="date"
                name="date"
                placeholder="Date"
                className="border p-2 rounded-md"
                value={busDetails.date}
                onChange={(e) =>
                  setBusDetails({ ...busDetails, date: e.target.value })
                }
              />
            </div>

            {/* Image Upload Section */}
            <div className="mt-4">
              <label className="block text-sm mb-2 font-semibold">
                Upload Bus Image
              </label>
              <div className="relative border-dashed border-2 border-gray-300 p-4 rounded-lg bg-white hover:bg-gray-100 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="text-center">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Bus Preview"
                      className="w-24 h-24 mx-auto rounded-lg object-cover"
                    />
                  ) : (
                    <p className="text-sm text-gray-500">Click to upload image</p>
                  )}
                </div>
              </div>
            </div>

            <button
              className="mt-6 w-full py-2 px-4 bg-gray-900 text-white rounded-md hover:bg-gray-700"
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
