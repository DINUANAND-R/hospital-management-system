import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UserLogin() {
  const [formData, setFormData] = useState({
    userID: '',
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
      // ✅ Explicitly set the Content-Type header
      const response = await axios.post('http://localhost:9000/loginUser', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert(`Login Successful`);
        navigate('/userLanding', {
          state: {
            userID: formData.userID,
            name: response.data.name,
          },
        });
      }
    } catch (error) {
      console.log('Login error:', error);
      alert('Login failed. Please check credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-blue-600 hover:text-blue-900 bg-blue-200 px-4 py-2 rounded-lg shadow"
      >
        ← Back
      </button>

      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs">
        <h2 className="text-2xl font-semibold text-center mb-6">User Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="userID"
            placeholder="User ID"
            value={formData.userID}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/userSignUp')}
            className="text-blue-600 hover:text-blue-800"
          >
            Don’t have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}