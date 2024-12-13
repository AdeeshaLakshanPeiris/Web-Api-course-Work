export const HomePage = () => {
    return (
      <div className="p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Bus Reservation System</h1>
        <a
          href="/buses"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          View Bus Schedule
        </a>
      </div>
    );
  };