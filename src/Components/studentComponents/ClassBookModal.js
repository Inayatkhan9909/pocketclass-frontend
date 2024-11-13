import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { toast, ToastContainer } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_URL;

const ClassBookModal = ({ booking, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    // Fetch current user details on component mount
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser({
                    studentId: currentUser.uid,
                    studentName: currentUser.displayName || 'Unknown',
                    studentEmail: currentUser.email,
                });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    if (!booking) return null;

    const { id, classType, instructorId, instructorName, date, startTime, endTime, studentsBooked, maxStudents } = booking;
    const availableSeats = maxStudents - studentsBooked;

    // Handle booking the class
    const handleBookClass = async () => {
        if (!user) {
            setError('You must be logged in to book a class.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${apiUrl}/bookclass`, {
                bookingId: id,
                instructorId,
                studentId: user.studentId,
                studentEmail: user.studentEmail,
                studentName: user.studentName,
                classType,
            });
            if (response.status === 200) {
                onClose(); // Close the modal on success
                toast.success('Class booked successfully!');
            } else {
                toast.error(response.data.message);
                console.error('Class booking failed! Try again');

            }
        } catch (error) {
            console.error(error);
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
                newestOnTop={false}
                closeButton={true}
                pauseOnHover={true}
                draggable={true}
                theme="colored"
            />


            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                        X
                    </button>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Book Class</h3>
                    <div>
                        <h4 className="text-xl font-semibold text-gray-700">{classType}</h4>
                        <p className="text-gray-600">Instructor: {instructorName}</p>
                        <p className="text-gray-600">Date: {date}</p>
                        <p className="text-gray-600">Time: {startTime} - {endTime}</p>
                        <p className="text-gray-600">Seats Available: {availableSeats}</p>
                    </div>

                    {error && <p className="text-red-500 mt-4">{error}</p>}

                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handleBookClass}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                            disabled={loading || availableSeats <= 0}
                        >
                            {loading ? 'Booking...' : 'Book'}
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ClassBookModal;
