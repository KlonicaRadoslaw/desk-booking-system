import axios from 'axios';

const API_URL = 'https://localhost:7041/api/Location';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const createLocation = async (location: any) => {
    try {
        const response = await axios.post(API_URL, location, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getLocationById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllLocations = async () => {
    try {
        const response = await axios.get(API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteLocation = async (id: number) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error;
    }
};
