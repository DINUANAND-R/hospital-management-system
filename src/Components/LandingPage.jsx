import { useState } from "react";
import { Menu, X } from "lucide-react";
import { User, Users, Calendar } from "lucide-react";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-2">
              <img src={logo} alt="MediCare Logo" className="h-19 w-auto mt-3 " />
              <span className="text-blue-600 font-bold text-xl">MediCare</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              <a href="/" className="text-gray-500 hover:text-blue-950 font-bold">Home</a>
              <a href="/services" className="text-gray-500 hover:text-blue-950 font-bold">Services</a>
              <a href="/doctors1" className="text-gray-500 hover:text-blue-950 font-bold">Doctors</a>
              <a href="/contact" className="text-gray-500 hover:text-blue-950 font-bold">Contact</a>
              <Link to='/role'>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-950 transition">Login</button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white px-4 pb-4 space-y-2">
            <a href="/" className="block text-gray-700 hover:text-blue-600">Home</a>
            <a href="/services" className="block text-gray-700 hover:text-blue-600">Services</a>
            <a href="/doctors1" className="block text-gray-700 hover:text-blue-600">Doctors</a>
            <a href='/contact' className="block text-gray-700 hover:text-blue-600">Contact</a>
            <Link to='/role'>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Login</button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="flex flex-col md:flex-row items-center justify-between bg-gray-50 flex-grow px-4 sm:px-10 py-12">
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            Quality Healthcare at Your Fingertips
          </h1>
          <p className="text-gray-600 mb-6">
            Manage appointments, consult doctors, and access your medical records easily with MediCare.
          </p>
          <Link to='/role'>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition">
              Get Started
            </button>
          </Link>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/healthcare-concept-illustration_114360-1543.jpg"
            alt="Healthcare Illustration"
            className="w-full max-h-[400px] object-contain"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg shadow transform hover:scale-105 transition duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">📅 Appointment Booking</h3>
              <p className="text-gray-600">
                Book your medical appointments quickly and easily through our digital system with real-time scheduling.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow transform hover:scale-105 transition duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">🧑‍⚕️ Our Doctors</h3>
              <p className="text-gray-600">
                Connect with experienced doctors and specialists across various medical fields for the care you need.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow transform hover:scale-105 transition duration-300 ease-in-out">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">💳 Online Billing</h3>
              <p className="text-gray-600">
                Pay bills securely online, view invoices, and keep track of your payments all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="bg-blue-50 py-12 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center flex-col transform hover:scale-105 transition duration-300 ease-in-out">
              <div className="text-blue-600 text-4xl mb-4">
                <User size={40} />
              </div>
              <h3 className="text-2xl font-semibold text-blue-800 mb-2">250+</h3>
              <p className="text-gray-600">Experienced Doctors</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center flex-col transform hover:scale-105 transition duration-300 ease-in-out">
              <div className="text-blue-600 text-4xl mb-4">
                <Users size={40} />
              </div>
              <h3 className="text-2xl font-semibold text-blue-800 mb-2">50,000+</h3>
              <p className="text-gray-600">Patients Served</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-center flex-col transform hover:scale-105 transition duration-300 ease-in-out">
              <div className="text-blue-600 text-4xl mb-4">
                <Calendar size={40} />
              </div>
              <h3 className="text-2xl font-semibold text-blue-800 mb-2">15+</h3>
              <p className="text-gray-600">Years of Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">MediCare</h2>
            <p className="text-gray-300">
              MediCare is your trusted platform for managing hospital appointments, accessing medical records, and staying in touch with your healthcare providers.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:underline text-gray-300">Home</a></li>
              <li><a href="/services" className="hover:underline text-gray-300">Services</a></li>
              <li><a href="/doctors1" className="hover:underline text-gray-300">Doctors</a></li>
              <li><a href="/contact" className="hover:underline text-gray-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-300 mb-2">123 MediStreet, Health City, 456789</p>
            <p className="text-gray-300 mb-2">Phone: +91 9876543210</p>
            <p className="text-gray-300">Email: support@medicare.com</p>
          </div>
        </div>
        <div className="mt-8 border-t border-blue-700 pt-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} MediCare. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
