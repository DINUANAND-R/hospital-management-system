import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UserSignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null); // For image preview

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      if (file) {
        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('image', formData.image);

      const response = await axios.post(`http://localhost:9000/signUpUser`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert(`SignUp Successful  and your ID is ${response.data.userID}`);
        navigate('/userLanding'); // redirect after signup
      }

      console.log('User Sign Up Data:', formData);
    } catch (error) {
      console.log('Error occurred creating User', error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 text-blue-600 hover:text-blue-900 focus:outline-none bg-blue-200 px-4 py-2 rounded-lg shadow"
      >
        &larr; Back
      </button>

      {/* Form Card */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs">
        <h2 className="text-2xl font-semibold text-center mb-6">User Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="block w-full text-center px-4 py-2 border border-dashed border-blue-400 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-50"
            >
              ADD PHOTO
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-2 text-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-full mx-auto border-2 border-blue-300"
              />
              <p className="text-sm text-gray-500 mt-1">Image Preview</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        {/* Sign In Link */}
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/userLogin')}
            className="text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            Already have an account? Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
