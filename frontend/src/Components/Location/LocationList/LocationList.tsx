import React, { useEffect, useState } from 'react';
import { getAllLocations } from '../../../Services/LocationService';
import { getDesksByLocation } from '../../../Services/DeskService';

const LocationList = () => {
    const [locations, setLocations] = useState<any[]>([]);
    const [openLocationId, setOpenLocationId] = useState<number | null>(null);
    const [desks, setDesks] = useState<{ [key: number]: any[] }>({});

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const result = await getAllLocations();
                setLocations(result);
            } catch (error) {
                console.error('Error fetching locations:', error);
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

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Locations</h2>
            <ul className="space-y-4">
                {locations.map((location: any) => (
                    <li key={location.id} className="border-b border-gray-200">
                        <button
                            onClick={() => handleLocationClick(location.id)}
                            className="w-full text-left py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {location.name}
                        </button>
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
