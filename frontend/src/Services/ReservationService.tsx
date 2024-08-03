import axios from 'axios';

const API_URL = 'https://localhost:7041/api/Reservation';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const createReservation = async (reservation: any) => {
    try {
        const response = await axios.post(API_URL, reservation, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getReservationById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllReservations = async () => {
    try {
        const response = await axios.get(API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUsersReservations = async (userId: string) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteReservation = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateReservation = async (id: number, reservationUpdate: any) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, reservationUpdate , getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error;
    }
};