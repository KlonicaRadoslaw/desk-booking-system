import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { getUsersReservations, deleteReservation, updateReservation } from '../../../Services/ReservationService';
import { getDesksByLocation, getDeskAvailability } from '../../../Services/DeskService';
import { getAllLocations } from '../../../Services/LocationService';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Reservation {
    id: number;
    deskIds: number[];
    userId: string;
    startDate: string;
    endDate: string;
    deskNames: string; // Changed to string for easier display
}

interface Desk {
    id: number;
    name: string;
    isAvailable: boolean;
}

const ReservationUser: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [locations, setLocations] = useState<any[]>([]);
    const [desks, setDesks] = useState<Desk[]>([]);
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
    const [locationId, setLocationId] = useState<string>('');
    const [deskId, setDeskId] = useState<string>('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchReservations();
    }, []);

    useEffect(() => {
        if (locationId) {
            fetchDesks(locationId);
        }
    }, [locationId, startDate, endDate]);

    const fetchReservations = async () => {
        const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
        try {
            const result = await getUsersReservations(userId);
            setReservations(result);
        } catch (err) {
            toast.error('Error fetching reservations');
            console.error('Error fetching reservations', err);
        }
    };

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
        if (!startDate || !endDate) return;
    
        try {
            const allDesks = await getDesksByLocation(locationId);
            console.log('All desks:', allDesks);
    
            const availableDesksPromises = allDesks.map(async (desk: Desk) => {
                if (desk.isAvailable !== undefined) {
                    return desk;
                }
    
                let isAvailable;
                try {
                    isAvailable = await getDeskAvailability(desk.id.toString(), startDate, endDate);
                } catch (err) {
                    console.error(`Error checking availability for desk ${desk.id}:`, err);
                    isAvailable = undefined;
                }
                return { ...desk, isAvailable };
            });
    
            const desksWithAvailability = await Promise.all(availableDesksPromises);
            console.log('Desks with availability:', desksWithAvailability);
    
            const filteredDesks = desksWithAvailability.filter(desk => desk.isAvailable);
            console.log('Filtered desks:', filteredDesks);
    
            setDesks(filteredDesks);
        } catch (err) {
            console.error('Error fetching desks:', err);
            toast.error('Error fetching desks');
        }
    };

    const handleEdit = (reservation: Reservation) => {
        setSelectedReservation(reservation);
        setLocationId('');
        setDeskId('');
        setStartDate(new Date(reservation.startDate));
        setEndDate(new Date(reservation.endDate));
        fetchLocations();
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteReservation(id);
            toast.success('Reservation deleted successfully');
            fetchReservations();
        } catch (err) {
            toast.error('Error deleting reservation');
            console.error('Error deleting reservation', err);
        }
    };

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            toast.error('Please select start and end dates');
            setError('Please select start and end dates');
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

        if (!selectedReservation) return;

        const reservationUpdate = {
            ...selectedReservation,
            deskIds: [parseInt(deskId, 10)],
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        };

        try {
            await updateReservation(selectedReservation.id, reservationUpdate);
            toast.success('Reservation updated successfully');
            fetchReservations();
            setSelectedReservation(null);
        } catch (err) {
            toast.error('Error updating reservation');
            console.error('Error updating reservation', err);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'location') {
            setLocationId(value);
        } else if (name === 'desk') {
            setDeskId(value);
        }
    };

    const isEditDisabled = (startDate: string) => {
        const reservationDate = new Date(startDate);
        const now = new Date();
        const differenceInHours = Math.abs(reservationDate.getTime() - now.getTime()) / (1000 * 60 * 60);
        return differenceInHours < 24;
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">My Reservations</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Start Date</th>
                        <th className="py-2 px-4 border-b">End Date</th>
                        <th className="py-2 px-4 border-b">Desk Names</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <tr key={reservation.id}>
                            <td className="py-2 px-4 border-b">{new Date(reservation.startDate).toLocaleString()}</td>
                            <td className="py-2 px-4 border-b">{new Date(reservation.endDate).toLocaleString()}</td>
                            <td className="py-2 px-4 border-b">{reservation.deskNames}</td>
                            <td className="py-2 px-4 border-b flex space-x-2">
                                {!isEditDisabled(reservation.startDate) && (
                                    <>
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                            onClick={() => handleEdit(reservation)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(reservation.id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedReservation && (
                <form onSubmit={handleUpdate} className="mt-6 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
                    <h3 className="text-xl font-bold mb-4">Edit Reservation</h3>
                    
                    <div className="flex flex-col">
                        <label htmlFor="location" className="mb-2 font-medium">Location:</label>
                        <select
                            id="location"
                            name="location"
                            value={locationId}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Location</option>
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
                            name="desk"
                            value={deskId}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded"
                        >
                            <option value="">Select Desk</option>
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
                            onChange={(date: Date | null) => {
                                setStartDate(date);
                                if (endDate && date && date > endDate) {
                                    setEndDate(null);
                                }
                            }}
                            selectsStart
                            startDate={startDate || undefined}
                            endDate={endDate || undefined}
                            minDate={new Date()}
                            disabled
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
                            disabled
                            className="p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Update Reservation
                    </button>
                </form>
            )}
        </div>
    );
};

export default ReservationUser;
