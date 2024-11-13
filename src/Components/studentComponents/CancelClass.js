import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_URL;

const CancelClass = ({ booking, userId, onClose }) => {
  const [bookingId,setBookingId]=useState();
 useEffect(()=>{
setBookingId(booking.id);
 },[booking])
  const confirmCancellation = async () => {
    try {
      const response = await fetch(`${apiUrl}/cancelbooking/${bookingId}/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Class Canceled`);
        toast.success("Class Canceled ");
        onClose();
      } else {
        toast.error('Failed to cancel booking:')
        console.error('Failed to cancel booking:', await response.json());
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.error('Error canceling booking:', error);
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
    
    <button
      onClick={confirmCancellation}
      className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
    >
      Yes, Cancel Booking
    </button>

    </>
  );
};

export default CancelClass;
