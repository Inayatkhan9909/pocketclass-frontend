import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const apiUrl = process.env.REACT_APP_API_URL;

const AddAvailability = ({ profile, userId }) => {
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [classType, setClassType] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Function to validate form fields
    const validateForm = () => {
        if (!date || !startTime || !endTime || !classType) {
            toast.error("All fields are required!");
            return false;
        }
        if (new Date(date) < new Date()) {
            toast.error("Date cannot be in the past.");
            return false;
        }
        if (startTime >= endTime) {
            toast.error("End time must be later than start time.");
            return false;
        }
        return true;
    };

    // Handling the availability submission
    const handleAddAvailability = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/instructoravaliability`, {
                instructorId: userId,
                instructorName: `${profile.firstname} ${profile.lastname}`,
                email: profile.email,
                contact: profile.contact,
                date,
                startTime,
                endTime,
                classType,
            });

            if (response.data.message === 'Availability added successfully') {
                toast.success(response.data.message);
                setSuccessMessage("Booking availability successfully added!");
                setDate('');
                setStartTime('');
                setEndTime('');
                setClassType('');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error adding availability:', error);
            toast.error(error.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeButton
                pauseOnHover
                draggable
                theme="colored"
            />

            <div className="space-y-4">
                {successMessage && (
                    <p className="text-center text-green-600 font-semibold">{successMessage}</p>
                )}

                <label className="block text-lg font-medium text-gray-700">
                    Class Type (Science, Arts, Yoga, etc.)
                    <input
                        type="text"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={classType}
                        onChange={(e) => setClassType(e.target.value)}
                    />
                </label>

                <label className="block text-lg font-medium text-gray-700">
                    Date
                    <input
                        type="date"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>

                <label className="block text-lg font-medium text-gray-700">
                    Start Time
                    <input
                        type="time"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                    />
                </label>

                <label className="block text-lg font-medium text-gray-700">
                    End Time
                    <input
                        type="time"
                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                    />
                </label>

                <button
                    onClick={handleAddAvailability}
                    className={`w-full px-4 py-2 mt-4 font-semibold text-white bg-green-600 rounded-md transition duration-200 ${
                        loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                    }`}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save Availability'}
                </button>
            </div>
        </>
    );
};

export default AddAvailability;
