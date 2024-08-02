import React, { useState, useEffect } from 'react';
import { getDesksByLocation, getDeskAvailability } from '../../../Services/DeskService';
import { getAllLocations } from '../../../Services/LocationService';
import { useAuth } from '../../../Context/useAuth';
import { createReservation } from '../../../Services/ReservationService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

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
            toast.error('Error fetching locations');
            console.error('Error fetching locations', err);
        }
    };

    const fetchDesks = async (locationId: string) => {
        try {
            const result = await getDesksByLocation(locationId);
            setDesks(result);
        } catch (err) {
            toast.error('Error fetching desks');
            console.error('Error fetching desks', err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            toast.error('Please select both start and end dates');
            setError('Please select both start and end dates');
            return;
        }
        if (startDate > endDate) {
            toast.error('Start date cannot be greater than end date');
            setError('Start date cannot be greater than end date');
            return;
        }
        if ((endDate.getTime() - startDate.getTime()) > 7 * 24 * 60 * 60 * 1000) {
            toast.error('Reservation duration cannot exceed one week');
            setError('Reservation duration cannot exceed one week');
            return;
        }

        try {
            const isAvailable = await getDeskAvailability(deskId, startDate, endDate);
            if (isAvailable == false) {
                toast.error('The selected desk is not available for the chosen dates');
                setError('The selected desk is not available for the chosen dates');
                return;
            }
        } catch (err) {
            toast.error('Error checking desk availability');
            setError('Error checking desk availability');
            return;
        }

        if (!user) {
            toast.error('User is not authenticated. Please log in.');
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
                toast.success('Desk reserved successfully'); 
        } catch (err) {
            toast.error('Error creating reservation');
            setError('Error creating reservation');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Reserve a Desk</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="location" className="mb-2 font-medium">Location:</label>
                    <select
                        id="location"
                        value={locationId}
                        onChange={(e) => setLocationId(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select a location</option>
                        {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label htmlFor="desk" className="mb-2 font-medium">Desk:</label>
                    <select
                        id="desk"
                        value={deskId}
                        onChange={(e) => setDeskId(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select a desk</option>
                        {desks.map((desk) => (
                            <option key={desk.id} value={desk.id}>
                                {desk.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-medium">Start Date:</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: Date | null) => setStartDate(date)}
                        selectsStart
                        startDate={startDate || undefined}
                        endDate={endDate || undefined}
                        minDate={new Date()}
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="mb-2 font-medium">End Date:</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date: Date | null) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate || undefined}
                        endDate={endDate || undefined}
                        minDate={startDate || new Date()}
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Reserve Desk
                </button>
            </form>
        </div>
    );
};

export default ReservationForm;
