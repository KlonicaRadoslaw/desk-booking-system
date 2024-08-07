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
    const response = await axios.get(`${API_URL}/location/${locationId}`, getAuthHeaders());
    return response.data;
};


export const getDeskAvailability = async (deskId: string, startDate: Date, endDate: Date) => {
    const response = await axios.get(`https://localhost:7041/api/Reservation/availability?deskId=${deskId}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
    , getAuthHeaders());
    return response.data.isAvailable;
};


export const updateDesk = async (id: number, deskData: any) => {
    const response = await axios.put(`${API_URL}/${id}`, deskData);
    return response.data;
};

export const getAvailableDesks = async (date: Date) => {
    const formattedDate = date.toISOString().split('.')[0];

    const response = await axios.get(`${API_URL}/available/${formattedDate}`);
    return response.data;
};

export const deleteDesk = async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};