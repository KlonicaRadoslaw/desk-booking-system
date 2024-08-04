import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { getAllDesks, updateDesk, deleteDesk } from '../../../Services/DeskService';
import { getAllLocations } from '../../../Services/LocationService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Desk {
    id: number;
    name: string;
    locationId: number;
    location: Location;
    isAvailable: boolean;
}

interface Location {
    id: number;
    name: string;
}

const UpdateDesk: React.FC = () => {
    const [desks, setDesks] = useState<Desk[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [editDesk, setEditDesk] = useState<Desk | null>(null);

    useEffect(() => {
        fetchDesks();
        fetchLocations();
    }, []);

    const fetchDesks = async () => {
        try {
            const result = await getAllDesks();
            setDesks(result);
        } catch (err) {
            toast.error('Error fetching desks');
            console.error(err);
        }
    };

    const fetchLocations = async () => {
        try {
            const result = await getAllLocations();
            setLocations(result);
        } catch (err) {
            toast.error('Error fetching locations');
            console.error(err);
        }
    };

    const handleEdit = (desk: Desk) => {
        setEditDesk(desk);
    };

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if (editDesk) {
            try {
                await updateDesk(editDesk.id, editDesk);
                toast.success('Desk updated successfully');
                fetchDesks();
                setEditDesk(null);
            } catch (error: any) {
                if (error.response && error.response.status === 409) {
                    toast.error('A desk with the same name already exists in the specified location');
                } else {
                    toast.error('Error updating desk');
                }
            }
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteDesk(id);
            toast.success('Desk deleted successfully');
            fetchDesks();
        } catch (error: any) {
            toast.error('Desk is available or reserved');
            console.error(error);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, type, value } = e.target;
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        if (editDesk) {
            setEditDesk({
                ...editDesk,
                [name]: newValue,
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Desk List</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Location</th>
                        <th className="py-2 px-4 border-b">Availability</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {desks.map((desk) => (
                        <tr key={desk.id}>
                            <td className="py-2 px-4 border-b">{desk.name}</td>
                            <td className="py-2 px-4 border-b">{desk.location.name}</td>
                            <td className="py-2 px-4 border-b">{desk.isAvailable ? 'Available' : 'Unavailable'}</td>
                            <td className="py-2 px-4 border-b flex space-x-2">
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    onClick={() => handleEdit(desk)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    onClick={() => handleDelete(desk.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editDesk && (
                <form onSubmit={handleUpdate} className="mt-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Edit Desk</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={editDesk.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Location</label>
                        <select
                            name="locationId"
                            value={editDesk.locationId}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Location</option>
                            {locations.map((location) => (
                                <option key={location.id} value={location.id}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Availability</label>
                        <select
                            name="isAvailable"
                            value={editDesk.isAvailable.toString()}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="true">Available</option>
                            <option value="false">Unavailable</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setEditDesk(null)}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Update Desk
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UpdateDesk;
