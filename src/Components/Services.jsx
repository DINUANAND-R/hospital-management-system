import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-blue-600 font-bold text-xl">MediCare</div>
            <div className="hidden md:flex space-x-6 items-center">
              <Link to="/" className="text-gray-500 hover:text-blue-950 font-bold">Home</Link>
              <Link to="/services" className="text-gray-500 hover:text-blue-950 font-bold">Services</Link>
              <Link to="/doctors1" className="text-gray-500 hover:text-blue-950 font-bold">Doctors</Link>
              <Link to="/contact" className="text-gray-500 hover:text-blue-950 font-bold">Contact</Link>
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
            <Link to="/" className="block text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/services" className="block text-gray-700 hover:text-blue-600">Services</Link>
            <Link to="/#doctors" className="block text-gray-700 hover:text-blue-600">Doctors</Link>
            <Link to="/contact" className="block text-gray-700 hover:text-blue-600">Contact</Link>
            <Link to='/role'><button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Login</button></Link>
          </div>
        )}
      </nav>

      {/* Services Section */}
      <section className="py-16 px-6 bg-gray-50 flex-grow">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Appointment Booking</h3>
              <p className="text-gray-600">
                Book appointments online with your preferred doctor at your convenient time.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Doctor Information</h3>
              <p className="text-gray-600">
                View detailed profiles of doctors, including specializations, availability, and ratings.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold text-blue-800 mb-2">Online Billing</h3>
              <p className="text-gray-600">
                Manage your medical bills easily through our secure online billing platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Landing Page Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-2">MediCare</h4>
            <p className="text-sm text-gray-300">
              Empowering healthcare through technology. Book appointments, access medical records, and manage billing seamlessly.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/services" className="hover:underline">Services</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/#doctors" className="hover:underline">Doctors</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">Contact</h4>
            <p className="text-sm text-gray-300">
              Email: support@medicare.com<br />
              Phone: +1 234 567 8901<br />
              Address: 123 Health St, Wellness City
            </p>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-400">
          &copy; 2025 MediCare. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
