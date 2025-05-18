import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DoctorLogin() {
  const [formData, setFormData] = useState({
    doctorID: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:9000/doctorLogin`, formData);

      if (response.status === 200) {
        alert('Login Successful');
        // Navigate to doctor's dashboard or appropriate page
      }

      console.log('Login Data:', formData);
    } catch (error) {
      console.log('Error Occurred During Login', error);
      alert('Login Failed. Please check your credentials.');
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 text-blue-600 hover:text-blue-900 bg-blue-200 px-4 py-2 rounded-lg shadow"
      >
        &larr; Back
      </button>

      {/* Login Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs">
        <h2 className="text-2xl font-semibold text-center mb-6">Doctor Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Doctor ID */}
          <input
            type="text"
            name="doctorID"
            placeholder="Doctor ID"
            value={formData.doctorID}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Log In
          </button>
        </form>

        {/* Sign Up Redirect */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/doctorSignUp')}
            className="text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
