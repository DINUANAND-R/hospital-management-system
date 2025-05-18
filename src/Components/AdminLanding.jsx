import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    User, // For Patients
    UserPlus, // For Doctors
    Calendar, // For Appointments
    BarChart, // For Charts
} from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#A8328E'];

const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
};

const AdminLandingPage = () => {
    const navigate = useNavigate();
    const [appointmentData, setAppointmentData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:9000/appointments');
                setAppointmentData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    useEffect(() => {
        if (appointmentData.length > 0) {
            const statusCounts = {};
            appointmentData.forEach(appt => {
                statusCounts[(appt.status || 'Unknown')] = (statusCounts[(appt.status || 'Unknown')] || 0) + 1;
            });

            const chart = Object.entries(statusCounts).map(([status, count]) => ({
                name: status,
                value: count,
            }));
            setChartData(chart);
        }
    }, [appointmentData]);

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error.message}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-8 text-center text-blue-700"
            >
                Admin Dashboard
            </motion.h1>

            {/* Top Row: Doctors and Patients */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-6">
                {/* Doctors */}
                <motion.div
                    variants={cardVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="bg-white p-6 rounded-xl shadow-lg cursor-pointer transition flex flex-col items-center justify-center"
                    onClick={() => navigate('/doctors')}
                >
                    <div className="mb-4">
                        <UserPlus className="h-12 w-12 text-blue-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-blue-700 mb-2 text-center">Doctors</h2>
                    <p className="text-gray-600 text-center">View and manage doctor records.</p>
                </motion.div>

                {/* Patients */}
                <motion.div
                    variants={cardVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="bg-white p-6 rounded-xl shadow-lg cursor-pointer transition flex flex-col items-center justify-center"
                    onClick={() => navigate('/patients')}
                >
                    <div className="mb-4">
                        <User className="h-12 w-12 text-green-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-green-700 mb-2 text-center">Patients</h2>
                    <p className="text-gray-600 text-center">View and manage patient information.</p>
                </motion.div>
            </div>

            {/* Bottom Row: Appointments and Pie Chart */}
            <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
                {/* Appointments */}
                <motion.div
                    variants={cardVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    className="bg-white p-6 rounded-xl shadow-lg cursor-pointer transition flex flex-col items-center justify-center md:w-1/2"
                    onClick={() => navigate('/appointments')}
                >
                    <div className="mb-4">
                        <Calendar className="h-12 w-12 text-purple-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-purple-700 mb-2 text-center">Appointments</h2>
                    <p className="text-gray-600 text-center">Track all booked appointments.</p>
                </motion.div>

                {/* Pie Chart */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="bg-white p-6 rounded-xl shadow-lg md:w-1/2 flex flex-col items-center justify-center"
                >
                    <div className="mb-4">
                        <BarChart className="h-12 w-12 text-indigo-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">Appointment Status</h2>
                    <div className="w-full">
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ percent, name }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[(index % COLORS.length)]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ fontSize: '14px' }} />
                                    <Legend wrapperStyle={{ fontSize: '14px', fontFamily: 'Arial' }} layout="vertical" align="right" verticalAlign="middle" />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="text-gray-500 text-center">No appointment data available for chart.</div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLandingPage;
