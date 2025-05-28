import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function AppointmentPage() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctorID: '',
    doctorName: '',
    doctorEmail: '',
    appointmentDate: '',
    reason: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const patientID = location.state?.userID;
  const patientName = location.state?.name;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:9000/doctors');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'doctorID') {
      const selectedDoctor = doctors.find((doctor) => doctor.doctorID === value);
      setFormData((prev) => ({
        ...prev,
        doctorID: value,
        doctorName: selectedDoctor?.name || '',
        doctorEmail: selectedDoctor?.email || '',
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientID) {
      alert('Error: Patient information is missing.');
      return;
    }

    if (!formData.doctorID) {
      alert('Please select a doctor.');
      return;
    }

    try {
      const selectedDoctor = doctors.find((doc) => doc.doctorID === formData.doctorID);
      if (!selectedDoctor) {
        alert("Selected doctor not found.");
        return;
      }

      const appointmentData = {
        doctorID: selectedDoctor.doctorID,
        doctorName: selectedDoctor.name,
        doctorEmail: selectedDoctor.email,
        patientID: patientID,
        appointmentDate: formData.appointmentDate,
        reason: formData.reason,
      };

      const response = await axios.post('http://localhost:9000/bookAppointment', appointmentData);

      if (response.status === 201) {
        alert('Appointment scheduled successfully!');
        setFormData({
          doctorID: '',
          doctorName: '',
          doctorEmail: '',
          appointmentDate: '',
          reason: '',
        });
        navigate(-1);
      } else {
        alert('Failed to schedule appointment.');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert(error.response?.data?.message || 'Failed to schedule appointment.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-blue-600 hover:text-blue-900 bg-blue-200 px-4 py-2 rounded-lg shadow"
      >
        &larr; Back
      </button>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Schedule Appointment</h2>
        <h3 className="text-lg text-gray-700 text-center mb-4">
          Booking for: <span className="font-semibold">{patientName}</span>
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="doctorID" className="block text-sm font-bold mb-2">
              Select a Doctor:
            </label>
            <select
              id="doctorID"
              name="doctorID"
              value={formData.doctorID}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            >
              <option value="">Select a Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor.doctorID}>
                  Dr. {doctor.name} ({doctor.specification})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="appointmentDate" className="block text-sm font-bold mb-2">
              Appointment Date and Time:
            </label>
            <input
              type="datetime-local"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label htmlFor="reason" className="block text-sm font-bold mb-2">
              Reason for Appointment:
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="Reason for appointment"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Schedule
          </button>
        </form>
      </div>
    </div>
  );
}
