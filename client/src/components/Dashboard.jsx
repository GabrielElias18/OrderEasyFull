// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { getDashboard } from '../services/apiService';

const Dashboard = ({ token }) => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await getDashboard(token);
                setMessage(data.message);
            } catch (error) {
                setMessage('Error al obtener el dashboard');
            }
        };
        fetchDashboard();
    }, [token]);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>{message}</p>
        </div>
    );
};

export default Dashboard;
