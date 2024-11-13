import React from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_URL;

const DeleteAvailability = ({ availabilityId, onClose, onDelete, userId }) => {

    const handleDelete = async () => {
        try {
            // Replace with the actual URL of your backend delete route
            const response = await axios.delete(`${apiUrl}/deleteavaliability/${availabilityId}/${userId}`, {
                method: 'DELETE',
            });

            if (response.status === 200) {
                toast.success("Deleted Successfully");
                onDelete(availabilityId);  // Pass the availabilityId to parent for state update
                onClose();  // Close the modal after deletion
            } else {
                toast.error(response.data.message);
                console.error('Failed to delete availability');

            }
        } catch (error) {
            console.error('Error deleting availability:', error);
            toast.error(error.response?.data?.message || "Something went wrong!");
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


            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Are you sure?</h3>
                    <p className="text-gray-600 mb-4">You are about to delete this availability. This action cannot be undone.</p>
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-500 border border-gray-500 rounded hover:bg-gray-500 hover:text-white transition duration-200"
                        >
                            No
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 text-white bg-red-500 border border-red-500 rounded hover:bg-red-700 transition duration-200"
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default DeleteAvailability;
