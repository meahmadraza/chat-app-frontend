import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://real-chat-app-backend-production.up.railway.app/api",
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
    }
});
