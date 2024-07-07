import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://b-commerce-server.onrender.com' : 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
