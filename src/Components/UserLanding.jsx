import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function UserLanding() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const location = useLocation();
  const { userID, name } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-blue-600 font-bold text-xl hover:scale-105 transition-transform duration-300">
              MediCare
            </div>
            <div className="hidden md:flex space-x-6 items-center">
              {["/", "/services", "/doctors", "/contact"].map((path, idx) => (
                <Link
                  key={idx}
                  to={path}
                  className="text-gray-600 hover:text-blue-800 hover:underline underline-offset-4 font-medium transition duration-300"
                >
                  {["Home", "Services", "Doctors", "Contact"][idx]}
                </Link>
              ))}
              <Link to={'/'}><button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 shadow hover:shadow-lg transition duration-300">
                Logout
              </button></Link>
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
            {["/", "/services", "/#doctors", "/contact"].map((path, idx) => (
              <Link
                key={idx}
                to={path}
                className="block text-gray-700 hover:text-blue-600 hover:underline"
              >
                {["Home", "Services", "Doctors", "Contact"][idx]}
              </Link>
            ))}
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition duration-300">
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Welcome Section */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-gray-50 flex-grow px-4 sm:px-10 py-12">
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 animate-fade-in">
            Welcome Back, {name}
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Manage your health, book appointments, and keep track of your medical history with ease.
          </p>
          <Link
            to="/userAppointment"
            state={{ name, userID }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 hover:scale-105 transition duration-300 shadow hover:shadow-xl"
          >
            View My Appointments
          </Link>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/healthcare-concept-illustration_114360-1543.jpg"
            alt="Healthcare Illustration"
            className="w-full max-h-[400px] object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* Book Appointment Section */}
      <section className="bg-gray-100 py-16 px-4 sm:px-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2 overflow-hidden">
            <img
              src="https://img.freepik.com/free-vector/appointment-booking-with-calendar_23-2148573962.jpg"
              alt="Book Appointment"
              className="rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-blue-900 mb-4 animate-fade-in-up">
              Book Your Appointment
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Schedule your appointment with our expert doctors in just a few clicks. Ensure your health stays on track with timely consultations.
            </p>
            <Link
              to="/appointment"
              state={{ name, userID }}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
              onClick={() => console.log('Navigating with:', { name, userID })} // ADDED LOGGING
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="text-lg font-bold mb-1">MediCare</h4>
            <p className="text-xs text-gray-300">
              Empowering healthcare through technology. Book appointments, access records, and manage billing.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-1">Quick Links</h4>
            <ul className="space-y-1 text-xs">
              {["Home", "Services", "Contact", "Doctors"].map((label, i) => (
                <li key={i}>
                  <Link
                    to={["/", "/services", "/contact", "/#doctors"][i]}
                    className="hover:underline hover:text-blue-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-1">Contact</h4>
            <p className="text-xs text-gray-300">
              Email: support@medicare.com<br />
              Phone: +1 234 567 8901<br />
              Address: 123 Health St, Wellness City
            </p>
          </div>
        </div>
        <div className="text-center mt-6 text-xs text-gray-400">
          &copy; 2025 MediCare. All rights reserved.
        </div>
      </footer>
    </div>
  );
}