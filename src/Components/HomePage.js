import React, { useEffect, useState } from 'react';
import { db, collection, onSnapshot } from '../Config/firebase.config'; // Updated imports for Firestore
import { formatDistanceToNow } from 'date-fns'; // For calculating how many days left
import ClassBookModal from './studentComponents/ClassBookModal'; // Import the modal component

const HomePage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to track data fetching
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [currentBooking, setCurrentBooking] = useState(null); // Store the booking details for the modal

  // Real-time listener for bookings collection
  useEffect(() => {
    // Set up the real-time listener
    const bookingsCollection = collection(db, 'bookings');
    const unsubscribe = onSnapshot(bookingsCollection, (snapshot) => {
      const bookingsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(bookingsList);
      setLoading(false); // Set loading to false once data is fetched
    }, (error) => {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    });

    // Clean up listener on component unmount
    return () => unsubscribe();
  }, []);

  // Calculate available seats
  const calculateAvailableSeats = (studentsBooked, maxStudents) => {
    return maxStudents - studentsBooked; // Calculate remaining available seats
  };

  // Handle opening the modal for booking or canceling
  const handleBooking = (booking) => {
    setCurrentBooking(booking);
    setShowModal(true); // Open modal
  };

  // Handle canceling the modal
  const handleCloseModal = () => {
    setShowModal(false); // Close modal
    setCurrentBooking(null); // Reset current booking
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-xl text-gray-800">Loading...</h2> {/* Display loading text */}
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl text-gray-800">No classes available at the moment.</h2> {/* Message when no data */}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Available Bookings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => {
          const { instructorName, classType, date, startTime, endTime, studentsBooked, maxStudents } = booking;
          const daysLeft = formatDistanceToNow(new Date(date), { addSuffix: true });
          const availableSeats = calculateAvailableSeats(studentsBooked, maxStudents);

          return (
            <div key={booking.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{classType}</h2>
              <p className="text-gray-600">Instructor: {instructorName}</p>
              <p className="text-gray-600">Date: {date}</p>
              <p className="text-gray-600">Time: {startTime} - {endTime}</p>
              <p className="text-gray-600">Days Left: {daysLeft}</p>
              <p className="text-gray-600">Seats Available: {availableSeats}</p>

              <button
                onClick={() => handleBooking(booking)}
                className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
              >
                Book Now
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal for booking or canceling */}
      {showModal && (
        <ClassBookModal
          booking={currentBooking}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default HomePage;
