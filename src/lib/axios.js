import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.DEV
        ? "http://localhost:5001/api"
        : "https://real-chat-app-backend-production.up.railway.app/api",
    withCredentials: true,
});
