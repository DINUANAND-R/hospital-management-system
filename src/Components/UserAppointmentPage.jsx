import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Calendar } from 'lucide-react';

const UserAppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get userID from location.state or other means
  const userID = location.state?.userID || null;

  useEffect(() => {
    if (!userID) {
      setError('User ID is not available. Please log in.');
      setLoading(false);
      return;
    }

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/appointments/patient/${userID}`);
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch appointments.');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userID]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500">
        <p>Error: {error}</p>
        <button
          onClick={() => navigate('/login')}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  if (!appointments.length) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-500" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Appointments</h2>
          <p className="text-gray-600">You have not scheduled any appointments yet.</p>
          <button
            onClick={() => navigate('/userLanding')}
            className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go to User Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 bg-gray-300 hover:bg-gray-400 text-blue-800 font-semibold py-3 px-5  rounded-full"
        >
          &larr; Back
        </button>

        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Your Appointments</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
            >
              <div>
                {/* Display doctorID as a string (since no populated doctor info) */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Appointment with Doctor ID: {appointment.doctorID || 'Unknown'}
                </h2>
                <h3 className="text-gray-700 mb-2">
                  Doctor Name : {appointment.doctorName || 'No name provided'}
                </h3>
                <p className="text-gray-600 mb-2">
                  Doctor Email: {appointment.doctorEmail || 'No email provided'}
                </p>
                <p className="text-gray-600 mb-2">
                  Date: {new Date(appointment.appointmentDate).toLocaleString()}
                </p>
                <p className="text-gray-700 mb-2">
                  Reason: {appointment.reason || 'No reason provided'}
                </p>
                <p className="text-gray-500">
                  Status: <span className="font-medium">{appointment.status}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserAppointmentPage;
