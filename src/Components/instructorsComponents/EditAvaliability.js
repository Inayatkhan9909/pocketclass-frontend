import axios from 'axios';
import React, { useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_URL;


const EditAvailability = ({ availability, userId }) => {
    const [date, setDate] = useState(availability.date || '');
    const [startTime, setStartTime] = useState(availability.startTime || '');
    const [endTime, setEndTime] = useState(availability.endTime || '');
    const [classType, setClassType] = useState(availability.classType || '');
    const [loading, setLoading] = useState(false);

    // Check if there are any changes
    const hasChanges = () => {
        return (
            (date && date !== availability.date) ||
            (startTime && startTime !== availability.startTime) ||
            (endTime && endTime !== availability.endTime) ||
            (classType && classType !== availability.classType)
        );
    };

    // Validate and handle the form submission
    const handleEditAvailability = async () => {
        if (!hasChanges()) {
            toast.error("No changes made.");
            return;
        }

        setLoading(true);
        try {
            const updatedFields = {};
            if (date && date !== availability.date) updatedFields.date = date;
            if (startTime && startTime !== availability.startTime) updatedFields.startTime = startTime;
            if (endTime && endTime !== availability.endTime) updatedFields.endTime = endTime;
            if (classType && classType !== availability.classType) updatedFields.classType = classType;

            const response = await axios.put(`${apiUrl}/editavaliability/${availability.id}`, {
                method: 'PUT',
                instructorId:userId,
                ...updatedFields,
            });

            if (response.data.message === 'Availability updated successfully') {
                toast.success(response.data.message);
                // Reset fields to the updated values if needed
                setDate(updatedFields.date || date);
                setStartTime(updatedFields.startTime || startTime);
                setEndTime(updatedFields.endTime || endTime);
                setClassType(updatedFields.classType || classType);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating availability:', error);
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
                    onClick={handleEditAvailability}
                    className={`w-full px-4 py-2 mt-4 font-semibold text-white bg-green-600 rounded-md transition duration-200 ${
                        loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                    }`}
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Update Availability'}
                </button>
            </div>
        </>
    );
};

export default EditAvailability;
