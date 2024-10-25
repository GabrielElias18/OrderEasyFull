// src/services/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Cambia esto si tu API tiene una dirección diferente

const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
};

const register = async (username, password) => {
    const response = await axios.post(`${API_URL}/register`, { username, password });
    return response.data;
};

const getDashboard = async (token) => {
    const response = await axios.get(`${API_URL}/dashboard`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export { login, register, getDashboard };
