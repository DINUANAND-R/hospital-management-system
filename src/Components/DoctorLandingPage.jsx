import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DoctorLandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Assuming doctorID and doctorName are passed via location.state
  const doctorID = location.state?.doctorID || 'Unknown ID';
  const doctorName = location.state?.doctorName || 'Doctor';

  const handleLogout = () => {
    // Clear any auth tokens or user data here if needed
    // Then navigate to login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Welcome, Dr. {doctorName}</h1>
      <p className="mb-8 text-gray-700">Your Doctor ID: {doctorID}</p>

      <div className="space-y-4 w-full max-w-md">
        <button
          onClick={() => navigate('/doctorAppointments', { state: { doctorID } })}
          className="w-full py-3 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded"
        >
          View Appointments
        </button>

        <button
          onClick={() => navigate('/doctorProfile', { state: { doctorID } })}
          className="w-full py-3 bg-green-500 hover:bg-green-700 text-white font-semibold rounded"
        >
          Profile
        </button>

        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-500 hover:bg-red-700 text-white font-semibold rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DoctorLandingPage;
