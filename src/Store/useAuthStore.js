import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check');
            set({ authUser: res.data })
            get().connectSocket()

        } catch (error) {
            console.error('Error checking auth:', error);
            set({ authUser: null })

        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (userData) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post('/auth/signup', userData);
            set({ authUser: res.data })
            console.log('User signed up:', res.data);
            toast.success('Account created successfully');
            get().connectSocket()

        } catch (error) {
            console.error('Error signing up:', error);

        } finally {
            set({ isSigningUp: false })
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({ authUser: null })
            toast.success('Logged out successfully');
            get().disconnectSocket()

        } catch (error) {
            toast.error(error.response.data.message);

        }
    },

    login: async (userData) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post('/auth/login', userData);
            set({ authUser: res.data })
            console.log('User logged in:', res.data);
            toast.success('Logged in successfully');
            get.connectSocket()

        } catch (error) {
            console.error('Error logging in:', error);
            toast.error(error.response.data.message);

        } finally {
            set({ isLoggingIn: false })
        }
    },

    updateProfilePic: async (data) => {
        set({ isUpdatingProfile: true })
        try {
            console.log('Updating profile picture:', data);
            const res = await axiosInstance.put('/auth/update-profile-pic', data);
            set({ authUser: res.data })
            toast.success('Profile picture updated successfully');

        } catch (error) {
            toast.error(error.response.data.message);

        } finally {
            set({ isUpdatingProfile: false })
        }
    },
    connectSocket: () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) return;
        const socket = io("http://localhost:5001")
        socket.connect();

        set({ socket: socket })
    },
    disconnectSocket: () => {
        if (get().socket.connected) get().socket.disconnect()
    }
}))