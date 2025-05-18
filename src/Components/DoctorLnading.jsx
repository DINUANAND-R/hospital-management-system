import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CalendarIcon, User, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
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
        return 'text-yellow-500';
      case 'confirmed':
        return 'text-green-500';
      case 'completed':
        return 'text-blue-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 mr-1" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 mr-1" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 mr-1" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 mr-1" />;
      default:
        return <AlertTriangle className="w-4 h-4 mr-1" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading appointments...</p>
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
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4 md:mb-6 text-gray-800">Appointment Management</h1>

      <div className="rounded-md border">
        <table>
          <thead>
            <tr>
              <th className="w-[150px] md:w-[200px]">Patient</th>
              <th className="w-[150px] md:w-[200px]">Doctor</th>
              <th className="w-[180px] md:w-[200px]">Appointment Date</th>
              <th className="w-[180px] md:w-[250px]">Reason</th>
              <th className="w-[120px] md:w-[150px]">Status</th>
              <th className="w-[150px] md:w-[200px]">Created At</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td className="font-medium">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-600" />
                      {appointment.patientID?.name || 'N/A'}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-600" />
                      {appointment.doctorID?.name || 'N/A'}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-2 text-gray-600" />
                      {appointment.appointmentDate ? format(new Date(appointment.appointmentDate), 'PPP pp') : 'N/A'}
                    </div>
                  </td>
                  <td className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {appointment.reason}
                  </td>
                  <td>
                    <div className={ "flex items-center " + getStatusColor(appointment.status)}>
                      {getStatusIcon(appointment.status)}
                      {appointment.status}
                    </div>
                  </td>
                  <td>
                    {appointment.createdAt? format(new Date(appointment.createdAt), 'PPP pp') : 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentManagement;
