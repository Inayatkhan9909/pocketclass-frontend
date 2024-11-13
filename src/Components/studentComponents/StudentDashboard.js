import React, { useEffect, useState } from 'react';
import { db, collection, onSnapshot } from '../../Config/firebase.config';
import CancelClass from './CancelClass';

const StudentDashboard = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [classToCancel, setClassToCancel] = useState(null);

  useEffect(() => {
    const bookingsCollection = collection(db, 'bookings');

    const unsubscribe = onSnapshot(
      bookingsCollection,
      (snapshot) => {
        const bookingsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(bookingsList);
        const userBookings = bookingsList.filter((booking) =>
          booking.students.some((student) => student.id === userId)
        );

        setBookings(userBookings);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const handleCancelModal = (booking) => {
    console.log(booking);
    setClassToCancel(booking);
    setShowCancelModal(true);
  };

  const closeModal = () => {
    setShowCancelModal(false);
    setClassToCancel(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">My Booked Classes</h2>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{booking.classType}</h3>
              <p className="text-gray-600">Instructor: {booking.instructorName}</p>
              <p className="text-gray-600">Date: {booking.date}</p>
              <p className="text-gray-600">Time: {booking.startTime} - {booking.endTime}</p>
              <button
                onClick={() => handleCancelModal(booking)}
                className="mt-4 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No bookings found for this user.</p>
      )}

      {/* Cancel Modal */}
      {showCancelModal && classToCancel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-800">Confirm Cancellation</h3>
            <p className="text-gray-600 mt-2">Are you sure you want to cancel the class: <strong>{classToCancel.classType}</strong>?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-200"
              >
                No, Keep Booking
              </button>
              <CancelClass
                booking={classToCancel}
                userId={userId}
                onClose={closeModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
