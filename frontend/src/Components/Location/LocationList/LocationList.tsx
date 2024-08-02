import React, { useEffect, useState } from 'react';
import { getAllLocations } from '../../../Services/LocationService';

const LocationList = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllLocations();
            setLocations(result);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Locations</h2>
            <ul>
                {locations.map((location: any) => (
                    <li key={location.id}>
                        {location.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocationList;
