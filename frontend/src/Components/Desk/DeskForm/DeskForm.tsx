import React, { useState } from 'react';
import { createDesk } from '../../../Services/DeskService';

const DeskForm = () => {
    const [desk, setDesk] = useState({
        locationId: '',
        name: '',
        isAvailable: true
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDesk({
            ...desk,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createDesk(desk);
            alert('Desk created successfully');
        } catch (error) {
            alert('Error creating desk');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="locationId" value={desk.locationId} onChange={handleChange} placeholder="Location ID" />
            <input type="text" name="name" value={desk.name} onChange={handleChange} placeholder="Desk Name" />
            <label>
                <input type="checkbox" name="isAvailable" checked={desk.isAvailable} onChange={e => setDesk({ ...desk, isAvailable: e.target.checked })} />
                Is Available
            </label>
            <button type="submit">Create Desk</button>
        </form>
    );
};

export default DeskForm;
