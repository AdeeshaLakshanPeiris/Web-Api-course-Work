import {useState} from 'react';
import api from "../../api/feedback_api.jsx";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        busNumber: '',
        complaint: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.busNumber || !formData.complaint) {
            alert('Please fill in all fields before submitting.');
            return;
        }

        try {
            const currentDateTime = new Date().toISOString(); // Get current date and time in ISO format
            const submissionData = {
                ...formData,
                submittedAt: currentDateTime, // Add timestamp to form data
            };

            console.log('Submitting complaint:', submissionData);

            const response = await api.post('/feedbacks/add', submissionData);

            if (response.status === 200 || response.status === 201) {
                alert('Your complaint has been successfully submitted.');
                // Reset form
                setFormData({name: '', email: '', busNumber: '', complaint: ''});
            } else {
                const errorData = response.data || {};
                alert(`Submission failed: ${errorData.message || 'Unexpected error occurred.'}`);
            }
        } catch (error) {
            console.error('Error submitting complaint:', error);

            if (error.response) {
                alert(`Submission failed: ${error.response.data?.message || 'Server error. Please try again later.'}`);
            } else if (error.request) {
                alert('No response from the server. Please check your internet connection and try again.');
            } else {
                alert(`An error occurred: ${error.message}`);
            }
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-12 px-6">
            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl">
                <h1 className="text-4xl text-gray-800 mb-6 text-center">Contact Us</h1>
                <p className="text-gray-600 mb-8 text-center text-sm">
                    Have a complaint about a bus? Fill out the form below, and we’ll get back to you.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="busNumber" className="block text-lg font-medium text-gray-700 mb-2">Bus
                            Number</label>
                        <input
                            type="text"
                            id="busNumber"
                            name="busNumber"
                            value={formData.busNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            placeholder="Enter the bus number"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="complaint"
                               className="block text-lg font-medium text-gray-700 mb-2">Complaint</label>
                        <textarea
                            id="complaint"
                            name="complaint"
                            value={formData.complaint}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                            placeholder="Describe your complaint in detail"
                            rows="6"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300"
                    >
                        Submit Complaint
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
