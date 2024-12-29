import {useEffect, useState} from "react";
import api from "../../api/feedback_api.jsx";

const FeedbackList = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch feedback data from the API
        const fetchFeedbacks = async () => {
            try {
                const response = await api.get("/feedbacks/feedbacks"); // Use GET for fetching
                if (response.status !== 200) {
                    throw new Error("Failed to fetch feedbacks.");
                }
                setFeedbacks(response.data.feedbacks || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    const deleteFeedback = async (id) => {
        try {
            const response = await api.delete(`/feedbacks/delete/${id}`);
            if (response.status !== 200) {
                throw new Error("Failed to delete feedback.");
            }
            // Update the feedback list after deletion
            setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-8 bg-gray-50 rounded-xl shadow-lg">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Feedback List</h2>
            {feedbacks.length === 0 ? (
                <p className="text-gray-500 text-lg">No feedbacks available at the moment.</p>
            ) : (
                <ul className="space-y-6">
                    {feedbacks.map((feedback) => (
                        <li
                            key={feedback._id}
                            className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {feedback.name}
                                </h3>
                                <p className="text-sm text-gray-500 italic">
                                    Submitted on:
                                    <span className="ml-1 font-medium text-blue-600">
                                {new Date(feedback.submittedAt).toLocaleDateString()}
                            </span> at
                                    <span className="ml-1 font-medium text-blue-600">
                                {new Date(feedback.submittedAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                                </p>
                            </div>
                            <div className="text-gray-700 mb-4">
                                <p className="mb-2">
                                    <span className="font-medium">Email:</span> {feedback.email}
                                </p>
                                <p className="mb-2">
                                    <span className="font-medium">Bus Number:</span> {feedback.busNumber}
                                </p>
                                <p>
                                    <span className="font-medium">Complaint:</span> {feedback.complaint}
                                </p>
                            </div>
                            <button
                                onClick={() => deleteFeedback(feedback._id)}
                                className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                Delete Feedback
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FeedbackList;
