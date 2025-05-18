import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from "lucide-react";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:9000/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = "/default-image.png";
  };

  const handleDelete = async (doctorID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:9000/doctorDelete/${doctorID}`);
      setDoctors(prevDoctors => prevDoctors.filter(doctor => doctor._id !== doctorID));
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 text-blue-600 hover:text-blue-900 focus:outline-none bg-blue-200 px-4 py-2 rounded-lg shadow"
      >
        &larr; Back
      </button>

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
              <div className="flex justify-between">
                {/* Update Button */}
                <Link
                  to={{
                    pathname: `/doctorUpdate`,
                    state: { doctorId: doctor._id } // Pass doctor ID in state
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(doctor._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
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

