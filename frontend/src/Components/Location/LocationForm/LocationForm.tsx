import React, { useState } from 'react';
import { createLocation } from '../../../Services/LocationService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LocationForm = () => {
    const [location, setLocation] = useState({
        name: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation({
            ...location,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createLocation(location);
            toast.success('Location created successfully');
            setLocation({ name: '' });
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                toast.error('A location with the same name already exists');
            } else {
                toast.error('Error creating location');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Create Location</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Location Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={location.name}
                        onChange={handleChange}
                        placeholder="Enter location name"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Create Location
                </button>
            </form>
        </div>
    );
};

export default LocationForm;