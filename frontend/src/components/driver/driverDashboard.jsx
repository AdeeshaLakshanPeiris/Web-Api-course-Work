import { useState } from "react";
import AddBus from "./AddBus";
import VerifyQRCode from "./VerifyQRCode";
import BusList from "./BusList";

const DriverDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("addBus"); // Active component state

  const renderContent = () => {
    switch (activeComponent) {
      case "addBus":
        return <AddBus />;
      case "verifyQR":
        return <VerifyQRCode />;
      case "busList":
        return <BusList />;
      default:
        return <p>Select an option from the sidebar</p>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Section */}
      <aside className="w-64 bg-purple-600 text-white flex-shrink-0 p-6">
        <h1 className="text-2xl font-bold mb-6">Driver Dashboard</h1>
        <nav className="space-y-4">
          <button
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeComponent === "addBus" ? "bg-purple-800" : "hover:bg-purple-700"
            }`}
            onClick={() => setActiveComponent("addBus")}
          >
            Add Bus
          </button>
          {/* <button
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeComponent === "verifyQR" ? "bg-purple-800" : "hover:bg-purple-700"
            }`}
            onClick={() => setActiveComponent("verifyQR")}
          >
            Verify QR Codes
          </button> */}
          <button
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeComponent === "busList" ? "bg-purple-800" : "hover:bg-purple-700"
            }`}
            onClick={() => setActiveComponent("busList")}
          >
            Verify QR Codes
          </button>
        </nav>
      </aside>

      {/* Main Content Section */}
      <main className="flex-1 bg-white rounded-lg shadow-md m-6 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default DriverDashboard;
