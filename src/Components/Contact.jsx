import { useState } from "react";
import { Menu, X } from "lucide-react";
import {Link} from 'react-router-dom';


export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionStatus("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-blue-600 font-bold text-xl">MediCare</div>
            <div className="hidden md:flex space-x-6 items-center">
              <a href="/" className="text-gray-500 hover:text-blue-950 font-bold">Home</a>
              <a href="/services" className="text-gray-500 hover:text-blue-950 font-bold">Services</a>
              <a href="/doctors1" className="text-gray-500 hover:text-blue-950 font-bold">Doctors</a>
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
            <a href="/contact" className="block text-gray-700 hover:text-blue-600">Contact</a>
            <Link to='/role'><button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Login</button></Link>
          </div>
        )}
      </nav>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-50 py-16 px-4 sm:px-10 flex-grow">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600 mb-8">We’d love to hear from you. Please fill out this form.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-800 transition"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              {submissionStatus && (
                <p className="text-green-600 text-center mt-2">{submissionStatus}</p>
              )}
            </form>
          </div>

          {/* Contact Details */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">Contact Details</h3>
            <p className="text-gray-700 mb-4">Feel free to reach us through the following information:</p>
            <p className="mb-2"><strong>Phone:</strong> +1 234 567 890</p>
            <p className="mb-2"><strong>Email:</strong> support@medicare.com</p>
            <p className="mb-2"><strong>Address:</strong> 123 MediStreet, Health City, 456789</p>
            <p className="text-gray-600 mt-6">We are here to serve you 24/7. Reach out for appointments, feedback, or emergencies.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white text-center py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div>
              <h4 className="text-xl font-bold mb-3">MediCare</h4>
              <p>Quality healthcare for everyone, anytime, anywhere.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-3">Quick Links</h4>
              <ul>
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/services" className="hover:underline">Services</a></li>
                <li><a href="/doctors" className="hover:underline">Doctors</a></li>
                <li><a href="/contact" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-3">Contact Info</h4>
              <p>Email: support@medicare.com</p>
              <p>Phone: +1 234 567 890</p>
              <p>Address: 123 MediStreet, Health City</p>
            </div>
          </div>
          <p className="mt-6">&copy; 2025 MediCare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
