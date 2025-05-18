import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";  // Importing Link from react-router-dom
import { Menu, X } from "lucide-react";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // state for menu toggle

  // Toggle the hamburger menu on/off
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:9000/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = "/default-image.png";  // fallback image in case of error
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-blue-600 font-bold text-xl">MediCare</div>
            <div className="hidden md:flex space-x-6 items-center">
              <a href="/" className="text-gray-500 hover:text-blue-950 font-bold">Home</a>
              <a href="/services" className="text-gray-500 hover:text-blue-950 font-bold">Services</a>
              <a href="/doctors" className="text-gray-500 hover:text-blue-950 font-bold">Doctors</a>
              <a href="/contact" className="text-gray-500 hover:text-blue-950 font-bold">Contact</a>
              <Link to='/role'><button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-950 transition">Login</button></Link>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white px-4 pb-4 space-y-2">
            <a href="/" className="block text-gray-700 hover:text-blue-600">Home</a>
            <a href="/services" className="block text-gray-700 hover:text-blue-600">Services</a>
            <a href="/doctors" className="block text-gray-700 hover:text-blue-600">Doctors</a>
            <a href='/contact' className="block text-gray-700 hover:text-blue-600">Contact</a>
            <Link to='/role'><button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Login</button></Link>
          </div>
        )}
      </nav>

      <h1 className="text-4xl font-bold text-center text-blue-900 my-10">Meet Our Doctors</h1>

      {/* Doctor Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {doctors.map((doctor) => (
          <div
            key={doctor._id}
            className="bg-white border-2 border-gray-300 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 max-w-xs mx-auto"
          >
            <div className="w-full h-56 overflow-hidden rounded-t-lg border-4 border-blue-500">
              <img
                src={`http://localhost:9000/doctorImages/${doctor.image}`}
                alt={doctor.name}
                className="w-full h-full object-cover"
                onError={handleError}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-3">{doctor.name}</h3>
              <p className="text-gray-700 mb-3"><strong>Specialization:</strong> {doctor.specification}</p>
              <p className="text-gray-700 mb-4"><strong>Experience:</strong> {doctor.experience} years</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all duration-200">
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6 mt-10">
        <div className="text-center">
          <p>&copy; 2025 Your Hospital Name. All rights reserved.</p>
          <p>Contact us: contact@hospital.com | +123 456 7890</p>
        </div>
      </footer>
    </div>
  );
}
