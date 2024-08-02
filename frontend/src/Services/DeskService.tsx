import axios from 'axios';

const API_URL = 'https://localhost:7041/api/Desk';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const createDesk = async (desk: any) => {
    try {
        const response = await axios.post(API_URL, desk, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getDeskById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllDesks = async () => {
    try {
        const response = await axios.get(API_URL, getAuthHeaders());
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getDesksByLocation = async (locationId: string) => {
    const response = await axios.get(`${API_URL}/location/${locationId}`);
    return response.data;
};


export const getDeskAvailability = async (deskId: string, startDate: Date, endDate: Date) => {
    const response = await axios.get(`https://localhost:7041/api/Reservation/availability`, {
        params: {
            deskId: deskId,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        },
    });
    return response.data.isAvailable;
};
