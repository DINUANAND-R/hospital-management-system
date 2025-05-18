import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function DoctorSignUp() {
    const [formData, setFormData] = useState({
        name: '', email: '', specification: '', password: '', experience: '', image: null,
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            setFormData((prev) => ({ ...prev, image: file }));
            setImagePreview(file ? URL.createObjectURL(file) : null);
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => formDataToSend.append(key, value));
            const response = await axios.post('http://localhost:9000/doctorSignUp', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.status === 201) {
                alert(`SignUp Successful! Your Doctor ID is: ${response.data.doctor.doctorID}`);
                navigate('/signin');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An unexpected error occurred.');
            console.error('Error during sign up:', error); // Added error logging on the client
        }
    };

    const handleBack = () => navigate(-1);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
            <button onClick={handleBack} className="absolute top-4 left-4 text-blue-600 hover:text-blue-900 bg-blue-200 px-4 py-2 rounded-lg shadow">&larr; Back</button>
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs">
                <h2 className="text-2xl font-semibold text-center mb-6">Doctor Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
                    <select name="specification" value={formData.specification} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required>
                        <option value="" disabled>Select Specialization</option>
                        <option value="Cardiologist">Cardiologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Pediatrician">Pediatrician</option>
                        <option value="Orthopedic">Orthopedic</option>
                        <option value="Psychiatrist">Psychiatrist</option>
                    </select>
                    <input type="text" name="experience" placeholder="Years of Experience" value={formData.experience} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
                    <input type="file" name="image" accept="image/*" onChange={handleChange} className="w-full" required />
                    {imagePreview && <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-full mx-auto" />}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Sign Up</button>
                    {message && <p className="text-red-500 text-sm text-center mt-2">{message}</p>}
                </form>
            </div>
        </div>
    );
}