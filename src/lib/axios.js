import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://real-chat-app-backend-production.up.railway.app/api",
    withCredentials: true,
    includeCredentials: true,
});
