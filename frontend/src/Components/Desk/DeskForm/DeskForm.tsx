import React, { useEffect, useState } from 'react';
import { createDesk } from '../../../Services/DeskService';
import { getAllLocations } from '../../../Services/LocationService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeskForm = () => {
    const [desk, setDesk] = useState({
        locationId: '',
        name: '',
        isAvailable: true
    });
    const [locations, setLocations] = useState<any[]>([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const result = await getAllLocations();
                setLocations(result);
            } catch (error) {
                toast.error('Error fetching locations');
            }
        };
        fetchLocations();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setDesk({
            ...desk,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createDesk(desk);
            toast.success('Desk created successfully');
            setDesk({ locationId: '', name: '', isAvailable: true });
        } catch (error) {
            toast.error('Error creating desk');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create Desk</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="locationId" className="mb-2 font-medium text-gray-700">Location</label>
                    <select
                        name="locationId"
                        id="locationId"
                        value={desk.locationId}
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="" disabled>Select a location</option>
                        {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-2 font-medium text-gray-700">Desk Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={desk.name}
                        onChange={handleChange}
                        placeholder="Enter Desk Name"
                        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="isAvailable"
                        id="isAvailable"
                        checked={desk.isAvailable}
                        onChange={e => setDesk({ ...desk, isAvailable: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isAvailable" className="font-medium text-gray-700">Is Available</label>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Create Desk
                </button>
            </form>
        </div>
    );
};

export default DeskForm;
