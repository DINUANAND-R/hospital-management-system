import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Users, Briefcase } from "lucide-react";  // Icons for User, Admin, and Doctor roles

export default function Role() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Back Button */}
      <div className="bg-white py-4 px-6 shadow-md">
        <Link to="/" className="text-blue-600 text-lg">← Back</Link>
      </div>

      {/* Role Selection Content */}
      <main className="flex-grow px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-blue-900">Select Your Role</h1>
        <p className="mt-4 text-gray-600">Choose your role to proceed with login or registration.</p>

        {/* Role Options */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Role */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <User size={48} className="text-green-600 mb-4 mx-auto" /> {/* Green icon for User */}
            <h3 className="text-xl font-semibold text-blue-800 mb-3">User</h3>
            <p className="text-gray-600">Manage your health and appointments, and access medical records.</p>
            <Link to="/userLogin" className="text-blue-600 hover:underline mt-4 block">Select</Link>
          </div>

          {/* Doctor Role */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <Users size={48} className="text-purple-600 mb-4 mx-auto" /> {/* Purple icon for Doctor */}
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Doctor</h3>
            <p className="text-gray-600">Consult with patients, view their records, and manage appointments.</p>
            <Link to="/doctorLogin" className="text-blue-600 hover:underline mt-4 block">Select</Link>
          </div>

          {/* Admin Role */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <Briefcase size={48} className="text-orange-600 mb-4 mx-auto" /> {/* Orange icon for Admin */}
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Admin</h3>
            <p className="text-gray-600">Manage users, monitor activity, and control the system's functionality.</p>
            <Link to="/adminLogin" className="text-blue-600 hover:underline mt-4 block">Select</Link>
          </div>
        </div>
      </main>

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
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/services" className="hover:underline">Services</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              <li><Link to="/doctors" className="hover:underline">Doctors</Link></li>
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
