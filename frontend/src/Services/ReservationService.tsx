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
        const response = await axios.post(API_URL, reservation);
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
