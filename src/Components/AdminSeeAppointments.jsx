import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CalendarIcon, User, Clock, CheckCircle, XCircle, AlertTriangle, ArrowLeft } from 'lucide-react'; // Added ArrowLeft
import { format } from 'date-fns';



const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:9000/appointments');
        setAppointments(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch appointments');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400'; // Yellow
      case 'confirmed':
        return 'text-green-400';   // Green
      case 'completed':
        return 'text-blue-400';     // Blue
      case 'cancelled':
        return 'text-red-400';     // Red
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 mr-1 text-yellow-400" />; // Yellow
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 mr-1 text-green-400" />; // Green
      case 'completed':
        return <CheckCircle className="w-4 h-4 mr-1 text-blue-400" />;     // Blue
      case 'cancelled':
        return <XCircle className="w-4 h-4 mr-1 text-red-400" />;     // Red
      default:
        return <AlertTriangle className="w-4 h-4 mr-1 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-blue-500">Loading appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-blue-50 to-violet-50 min-h-screen">
      <div className="flex justify-start mb-4">
        <button onClick={() => window.history.back()} className="bg-white/20 text-blue-600 hover:bg-white/30 hover:text-blue-500 border-blue-300 rounded-md px-4 py-2 flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6 md:mb-8 text-gray-800 text-center bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
        Appointment Management
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200
                       transition-transform transform hover:scale-105 hover:shadow-xl
                       hover:border-violet-300"
          >
            <div className="p-4 border-b bg-gradient-to-r from-violet-100 to-blue-100">
              <h2 className="text-xl font-semibold flex items-center text-blue-700">
                <CalendarIcon className="w-5 h-5 mr-2" />
                Appointment Details
              </h2>
              <p className="text-gray-600 text-sm">
                Made on: {appointment.createdAt ? format(new Date(appointment.createdAt), 'PPP pp') : 'N/A'}
              </p>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-gray-700">
                <span className="font-medium text-violet-600">Patient:</span>
                <span className="ml-1 text-blue-800"> {appointment.patientID?.name || 'N/A'} </span>
                <span className="text-gray-500 text-sm ml-2">(ID: {appointment.patientID?._id || 'N/A'})</span>
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-violet-600">Doctor:</span>
                <span className="ml-1 text-blue-800"> {appointment.doctorID?.name || 'N/A'}</span>
                <span className="text-gray-500 text-sm ml-2">(ID: {appointment.doctorID?._id || 'N/A'})</span>
              </p>
              <p className="text-gray-700 flex items-center">
                <CalendarIcon className="w-4 h-4 mr-2 text-blue-600 inline-block" />
                <span className="font-medium text-violet-600">Date:</span>
                <span className="ml-1 text-blue-800">  {appointment.appointmentDate ? format(new Date(appointment.appointmentDate), 'PPP pp') : 'N/A'}</span>
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-violet-600">Reason:</span>
                <span className="ml-1 text-blue-800">  {appointment.reason}</span>
              </p>
              <p className={`flex items-center ${getStatusColor(appointment.status)}`}>
                {getStatusIcon(appointment.status)}
                <span className="font-medium">Status:</span>
                <span className="ml-1"> {appointment.status}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      {appointments.length === 0 && (
        <div className="text-center text-gray-500 mt-8 p-4 bg-white/50 rounded-lg border border-dashed border-gray-300 backdrop-blur-md">
          <p className="text-lg">No appointments found.</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;

