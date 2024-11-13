import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import AddAvailability from './Addavalilability';
import EditAvailability from './EditAvaliability';
import DeleteAvailability from './DeleteAvaliability'; // Import DeleteAvailability
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const InstructorDashboard = ({ profile, userId }) => {
  const [availabilities, setAvailabilities] = useState([]);
  const [availabilityModal, setAvailabilityModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);  // State for delete modal
  const [availabilityToEdit, setAvailabilityToEdit] = useState(null);
  const [availabilityToDelete, setAvailabilityToDelete] = useState(null); // Availability to delete
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    if (profile.availabilities) {
      setAvailabilities(sortAvailabilities(profile.availabilities));
      setLoading(false); // Data is ready, set loading to false
    } else {
      setLoading(true); // Still loading data
    }
  }, [profile.availabilities]);

  const sortAvailabilities = (availabilities) => {
    return availabilities.sort((a, b) => {
      const aDate = dayjs(a.createdAt);
      const bDate = dayjs(b.createdAt);
      return aDate.isAfter(bDate) ? -1 : 1;
    });
  };

  dayjs.extend(relativeTime);

  const getTimeRemaining = (startDateTime) => {
    const start = dayjs(startDateTime);
    const now = dayjs();
    return start.isAfter(now) ? start.from(now, true) : 'Expired';
  };

  const handleAddAvailabilityModal = () => setAvailabilityModal(true);
  const handleCloseAddModal = () => setAvailabilityModal(false);

  const handleEditAvailabilityModal = (availability) => {
    setAvailabilityToEdit(availability);
    setEditModal(true);
  };
  const handleCloseEditModal = () => setEditModal(false);

  const handleDeleteAvailabilityModal = (availability) => {
    setAvailabilityToDelete(availability);
    setDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setDeleteModal(false);

  const handleAddAvailability = (newAvailability) => {
    setAvailabilities(prevAvailabilities =>
      sortAvailabilities([...prevAvailabilities, newAvailability])
    );
    handleCloseAddModal();
  };

  const handleUpdateAvailability = (updatedAvailability) => {
    setAvailabilities(prevAvailabilities =>
      prevAvailabilities.map(avail =>
        avail.id === updatedAvailability.id ? updatedAvailability : avail
      )
    );
    handleCloseEditModal();
  };

  const handleDeleteAvailability = (availabilityId) => {
    setAvailabilities(prevAvailabilities =>
      prevAvailabilities.filter(avail => avail.id !== availabilityId)
    );
    handleCloseDeleteModal();
  };

  return (
    <div className="w-full bg-gray-100 p-6">
      {/* Loading Spinner */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Dashboard</h2>
        <div>
          <button
            className="px-8 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-700 transition duration-200"
            onClick={handleAddAvailabilityModal}
          >
            Add
          </button>
        </div>

        <div className="space-y-4 mt-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Availabilities</h3>
          {availabilities.length > 0 ? (
            availabilities.map((availability, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 gap-4 bg-gray-100 rounded-md shadow-md"
              >
                <div>
                  <span className="text-lg font-medium text-gray-700">
                    {availability.classType}
                  </span>
                </div>
                <div>
                  <span className="text-lg font-medium text-gray-700">
                    {availability.date} | {availability.startTime} - {availability.endTime}
                  </span>
                </div>
                <div className="text-lg font-medium text-gray-500">
                  {getTimeRemaining(availability.date, availability.startTime)}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditAvailabilityModal(availability)}
                    className="px-3 py-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAvailabilityModal(availability)}
                    className="px-3 py-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No availabilities added yet.</p>
          )}
        </div>
      </div>

      {/* Add Availability Modal */}
      {availabilityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={handleCloseAddModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Add Availability</h3>
            <AddAvailability
              profile={profile}
              userId={userId}
              onAddAvailability={handleAddAvailability}
            />
          </div>
        </div>
      )}

      {/* Edit Availability Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={handleCloseEditModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Edit Availability</h3>
            <EditAvailability
              availability={availabilityToEdit}
              userId={userId}
              onUpdateAvailability={handleUpdateAvailability}
            />
          </div>
        </div>
      )}

      {/* Delete Availability Modal */}
      {deleteModal && (
        <DeleteAvailability
          availabilityId={availabilityToDelete?.id} 
          userId={userId}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteAvailability}
        />
      )}
    </div>
  );
};

export default InstructorDashboard;
