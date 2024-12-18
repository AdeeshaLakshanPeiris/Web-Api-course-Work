import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext"; // Assuming you have AuthContext for managing authentication
import { useModal } from "../../context/ModalContext";

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

  const [image, setImage] = useState(null); // State for the image
  const [loading, setLoading] = useState(false); // Loading state for the button
  const [error, setError] = useState(""); // Error message
  const { openSuccess, openAlert, openWarning } = useModal();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBusDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // Handle form submission
  const handleAddBus = async () => {
    if (
      !busDetails.number ||
      !busDetails.route ||
      !busDetails.seats ||
      !busDetails.departureTime ||
      !busDetails.arrivalTime ||
      !busDetails.date ||
      !image
    ) {
      // setError("Please fill in all fields and upload an image");
      openAlert("Please fill in all fields and upload an image");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("number", busDetails.number);
      formData.append("route", busDetails.route);
      formData.append("seats", busDetails.seats);
      formData.append("departureTime", busDetails.departureTime);
      formData.append("arrivalTime", busDetails.arrivalTime);
      formData.append("date", busDetails.date);
      formData.append("driverId", user?.id); // Include the driver's ID
      formData.append("image", image); // Attach the image file

      console.log(formData);

      const res = await axios.post(`${apiBaseUrl}/buses`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // alert(res.data.message);
      openSuccess(res.data.message);

      setBusDetails({
        number: "",
        route: "",
        seats: "",
        departureTime: "",
        arrivalTime: "",
        date: "",
      });
      setImage(null);
    } catch (err) {
      // setError(err.response?.data?.message || "Failed to add bus");
      openAlert(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-400 via-gray-500 to-gray-500 text-white rounded-lg shadow-md p-6 space-y-6 animate-fade-in">
    <h2 className="text-3xl font-bold mb-4 text-center">Add a New Bus</h2>
    <p className="text-sm text-gray-200 text-center">
      Fill in the details below to add a new bus to the system.
    </p>
  
    {error && (
      <div className="bg-red-200 text-red-700 p-3 rounded-lg">
        <p>{error}</p>
      </div>
    )}
  
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <input
        type="text"
        name="number"
        placeholder="Bus Number"
        className="border rounded-md p-2 text-black shadow-sm focus:ring focus:ring-gray-300 focus:outline-none"
        value={busDetails.number}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="route"
        placeholder="Route"
        className="border rounded-md p-2 text-black shadow-sm focus:ring focus:ring-gray-300 focus:outline-none"
        value={busDetails.route}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="seats"
        placeholder="Seats"
        className="border rounded-md p-2 text-black shadow-sm focus:ring focus:ring-gray-300 focus:outline-none"
        value={busDetails.seats}
        onChange={handleInputChange}
      />
      <input
        type="time"
        name="departureTime"
        placeholder="Departure Time"
        className="border rounded-md p-2 text-black shadow-sm focus:ring focus:ring-gray-300 focus:outline-none"
        value={busDetails.departureTime}
        onChange={handleInputChange}
      />
      <input
        type="time"
        name="arrivalTime"
        placeholder="Arrival Time"
        className="border rounded-md p-2 text-black shadow-sm focus:ring focus:ring-gray-300 focus:outline-none"
        value={busDetails.arrivalTime}
        onChange={handleInputChange}
      />
      <input
        type="date"
        name="date"
        placeholder="Date"
        className="border rounded-md p-2 text-black shadow-sm focus:ring focus:ring-gray-300 focus:outline-none"
        value={busDetails.date}
        onChange={handleInputChange}
      />
    </div>
  
    {/* Image Upload Section */}
    <div>
      <label className="block text-sm mb-2 font-semibold">Upload Bus Image</label>
      <div className="relative border-dashed border-2 border-gray-300 p-4 rounded-lg bg-white text-black hover:bg-gray-100 transition">
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
  
    {/* Submit Button */}
    <button
      className={`mt-6 w-full py-3 px-5 rounded-lg font-semibold tracking-wide text-lg transition-all shadow-md ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gray-900 hover:bg-gray-700 hover:shadow-lg"
      }`}
      onClick={handleAddBus}
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <span>Adding Bus...</span>
          <div className="w-4 h-4 border-t-2 border-white border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        "Add Bus"
      )}
    </button>
  </div>
  
  );
};

export default AddBus;
