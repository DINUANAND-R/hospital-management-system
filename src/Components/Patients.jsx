import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from "lucide-react";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Fetch patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:9000/users"); //  API endpoint
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = "/default-image.png";
  };

  // Handle patient delete
  const handleDelete = async (patientID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:9000/deleteUser/${patientID}`); // Changed to /deleteUser/:id
      setPatients(prevPatients => prevPatients.filter(patient => patient._id !== patientID));
    } catch (error) {
      console.error("Error deleting patient:", error);
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

      <h1 className="text-4xl font-bold text-center text-blue-900 my-10">Our Patients</h1>

      {/* Patient Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {patients.map((patient) => {
          const imagePath = patient.image && patient.image.startsWith('http')
            ? patient.image
            : `http://localhost:9000/userImages/${patient.image}`;
          return (
            <div
              key={patient._id}
              className="bg-white border-2 border-gray-300 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 max-w-xs mx-auto"
            >
              <div className="w-full h-56 overflow-hidden rounded-t-lg border-4 border-blue-500">
                <img
                  src={imagePath} // image path
                  alt={patient.name}
                  className="w-full h-full object-cover"
                  onError={handleError}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-blue-800 mb-3">{patient.name}</h3>
                <p className="text-gray-700 mb-3">
                  <strong>ID:</strong> {patient.userID}
                </p>{" "}
                {/* Changed to ID */}
                <div className="flex justify-between space-x-4"> {/* Added space-x-4 */}
                  <Link
                    to={`/updatePatient/${patient._id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" // Changed to blue
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(patient._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
