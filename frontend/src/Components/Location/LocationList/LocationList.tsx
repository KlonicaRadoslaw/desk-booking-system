import React, { useEffect, useState } from 'react';
import { getAllLocations } from '../../../Services/LocationService';
import { getDesksByLocation } from '../../../Services/DeskService';
import { deleteLocation } from '../../../Services/LocationService';
import { toast } from 'react-toastify';
import Spinner from '../../Spinner/Spinner';

const LocationList = () => {
    const [locations, setLocations] = useState<any[]>([]);
    const [openLocationId, setOpenLocationId] = useState<number | null>(null);
    const [desks, setDesks] = useState<{ [key: number]: any[] }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setLoading(true);
                const result = await getAllLocations();
                setLocations(result);
                setError(null);
            } catch (error) {
                setError('Error fetching locations');
                console.error('Error fetching locations:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLocations();
    }, []);

    const handleLocationClick = async (locationId: number) => {
        if (openLocationId === locationId) {
            setOpenLocationId(null);
        } else {
            setOpenLocationId(locationId);
            if (!desks[locationId]) {
                try {
                    const result = await getDesksByLocation(locationId.toString());
                    setDesks(prevDesks => ({ ...prevDesks, [locationId]: result }));
                } catch (error) {
                    console.error('Error fetching desks:', error);
                }
            }
        }
    };

    const handleDeleteLocation = async (locationId: number) => {
        if (window.confirm('Are you sure you want to delete this location?')) {
            try {
                await deleteLocation(locationId);
                setLocations(prevLocations => prevLocations.filter(location => location.id !== locationId));
                setDesks(prevDesks => {
                    const newDesks = { ...prevDesks };
                    delete newDesks[locationId];
                    return newDesks;
                });
                toast.success('Location deleted successfully');
            } catch (error: any) {
                if (error.response && error.response.status === 409) {
                    toast.error('Location with desks cannot be deleted');
                } else {
                    toast.error('Error creating desk');
                }
                setError('Error deleting location');
                console.error('Error deleting location:', error);
            }
        }
    };

    if (loading) return <p><Spinner/></p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Locations</h2>
            <ul className="space-y-4">
                {locations.map((location: any) => (
                    <li key={location.id} className="border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => handleLocationClick(location.id)}
                                className="w-full text-left py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {location.name}
                            </button>
                            <button
                                onClick={() => handleDeleteLocation(location.id)}
                                className="ml-4 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                Delete
                            </button>
                        </div>
                        {openLocationId === location.id && desks[location.id] && (
                            <ul className="mt-2 pl-4 space-y-2">
                                {desks[location.id].length > 0 ? (
                                    desks[location.id].map((desk: any) => (
                                        <li key={desk.id} className="p-2 bg-gray-50 rounded-md border border-gray-200 text-gray-700">
                                            {desk.name} - {desk.isAvailable ? 'Available' : 'Not Available'}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-gray-500">No desks available</li>
                                )}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocationList;
