import React, { useState, useEffect } from 'react';
import { getDesksByLocation, getDeskAvailability } from '../../../Services/DeskService';
import { getAllLocations } from '../../../Services/LocationService';
import { useAuth } from '../../../Context/useAuth';
import { createReservation } from '../../../Services/ReservationService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReservationForm = () => {
    const { user } = useAuth();
    const [locations, setLocations] = useState<any[]>([]);
    const [locationId, setLocationId] = useState<string>('');
    const [deskId, setDeskId] = useState<string>('');
    const [desks, setDesks] = useState<any[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchLocations();
    }, []);

    useEffect(() => {
        if (locationId) {
            fetchDesks(locationId);
        }
    }, [locationId]);

    const fetchLocations = async () => {
        try {
            const result = await getAllLocations();
            setLocations(result);
        } catch (err) {
            console.error('Error fetching locations', err);
        }
    };

    const fetchDesks = async (locationId: string) => {
        try {
            const result = await getDesksByLocation(locationId);
            setDesks(result);
        } catch (err) {
            console.error('Error fetching desks', err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            setError('Please select both start and end dates');
            return;
        }
        if (startDate > endDate) {
            setError('Start date cannot be greater than end date');
            return;
        }
        if ((endDate.getTime() - startDate.getTime()) > 7 * 24 * 60 * 60 * 1000) {
            setError('Reservation duration cannot exceed one week');
            return;
        }

        try {
            const isAvailable = await getDeskAvailability(deskId, startDate, endDate);
            if (isAvailable) {
                setError('The selected desk is not available for the chosen dates');
                return;
            }
        } catch (err) {
            setError('Error checking desk availability');
            return;
        }

        if (!user) {
            setError('User is not authenticated. Please log in.');
            return;
        }

        const reservation = {
            userId: JSON.parse(localStorage.getItem('user') || '{}').id,
            deskIds: [parseInt(deskId, 10)],
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        };

        try {
            await createReservation(reservation);
            setError('');
            alert('Desk reserved successfully');
        } catch (err) {
            setError('Error creating reservation');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Location:</label>
                <select value={locationId} onChange={(e) => setLocationId(e.target.value)}>
                    <option value="">Select a location</option>
                    {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                            {location.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Desk:</label>
                <select value={deskId} onChange={(e) => setDeskId(e.target.value)}>
                    <option value="">Select a desk</option>
                    {desks.map((desk) => (
                        <option key={desk.id} value={desk.id}>
                            {desk.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Start Date:</label>
                <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    selectsStart
                    startDate={startDate || undefined}
                    endDate={endDate || undefined}
                    minDate={new Date()}
                />
            </div>
            <div>
                <label>End Date:</label>
                <DatePicker
                    selected={endDate}
                    onChange={(date: Date | null) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate || undefined}
                    endDate={endDate || undefined}
                    minDate={startDate || new Date()}
                />
            </div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button type="submit">Reserve Desk</button>
        </form>
    );
};

export default ReservationForm;
