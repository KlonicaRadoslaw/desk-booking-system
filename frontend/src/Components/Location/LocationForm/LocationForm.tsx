import React, { useState } from 'react';
import { createLocation } from '../../../Services/LocationService';

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
            alert('Location created successfully');
        } catch (error) {
            alert('Error creating location');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={location.name} onChange={handleChange} placeholder="Location Name" />
            <button type="submit">Create Location</button>
        </form>
    );
};

export default LocationForm;
