import { useState } from "react";
import { QrReader } from "react-qr-reader"; // Corrected import
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import api from "../../api/api";
import { useLoader } from "../../context/LoaderContext";

const VerifyQRCode = () => {
  const [qrResult, setQrResult] = useState(null);
  const [verificationResult, setVerificationResult] = useState("");
  const [passengerDetails, setPassengerDetails] = useState(null);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const { openSuccess, openAlert, openWarning } = useModal();
  const { busId } = location.state || {};
  const { startLoading, stopLoading } = useLoader();

  

  const handleVerify = async (scannedData) => {
    try {
      const parsedData = JSON.parse(scannedData);

      console.log(parsedData);
      startLoading();
  
      // Get busId passed from the previous page (assumes state navigation was used)
      // Send data including busId, reservationIds, and date
      const res = await api.post("/reservations/verify", {
        reservationIds: parsedData.reservationIds,
        busId: busId, // Pass the busId for verification
        date: parsedData.date,
      });
  
      setVerificationResult(res.data.message); // Backend success message
      setPassengerDetails(res.data.reservations); // Passenger and seat details
      setError(""); // Clear errors
      setShowModal(true); // Open modal
    } catch (err) {

      setError(err.response?.data?.message || "Verification failed");
      setVerificationResult("");
      setPassengerDetails(null);

      openAlert(err.response?.data?.message)
    }
    finally{
      stopLoading();

    }
  };

  const handleScan = (result) => {
    if (result?.text) {
      setQrResult(result.text);
      handleVerify(result.text); // Verify the scanned data
    }
  };

  const handleError = () => {
    setError("Failed to scan QR code. Please try again.");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-600">QR Code Verification</h1>

      {/* QR Scanner */}
      <div className="w-72 h-72 mb-4 rounded-lg overflow-hidden shadow-lg bg-gray-200">
        <QrReader
          onResult={(result, error) => {
            if (result) handleScan(result);
            if (error) handleError();
          }}
          constraints={{ facingMode: "environment" }}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 rounded-lg bg-red-100 text-red-800 w-full max-w-lg text-center shadow-md">
          <strong>{error}</strong>
        </div>
      )}

      {/* Modal for Passenger Details */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            {verificationResult && (
              <div className="mb-4 text-green-700 bg-green-100 p-4 rounded shadow">
                <strong>{verificationResult}</strong>
              </div>
            )}
            <h2 className="text-xl font-bold text-gray-700 mb-4">Passenger and Seat Details</h2>
            <ul className="divide-y divide-gray-200">
              {passengerDetails &&
                passengerDetails.map((detail, index) => (
                  <li key={index} className="py-3">
                    <p>
                      <strong>Seat Number:</strong> {detail.seatNumber}
                    </p>
                    <p>
                      <strong>Name:</strong> {detail.passengerName}
                    </p>
                    <p>
                      <strong>Email:</strong> {detail.passengerEmail}
                    </p>
                    <p>
                      <strong>Phone:</strong> {detail.passengerPhone}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyQRCode;
