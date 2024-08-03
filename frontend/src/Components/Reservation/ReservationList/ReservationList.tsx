// src/Components/Reservations/ReservationsList.tsx

import React, { useEffect, useState } from 'react';
import { getAllReservations } from '../../../Services/ReservationService';

const ReservationsList = () => {
    const [reservations, setReservations] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const result = await getAllReservations();
                setReservations(result);
            } catch (err) {
                setError('Error fetching reservations');
                console.error('Error fetching reservations:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Reservations</h2>
            {reservations.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-gray-600">ID</th>
                            <th className="px-6 py-3 text-left text-gray-600">User</th>
                            <th className="px-6 py-3 text-left text-gray-600">Start Date</th>
                            <th className="px-6 py-3 text-left text-gray-600">End Date</th>
                            <th className="px-6 py-3 text-left text-gray-600">Desk Names</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(reservation => (
                            <tr key={reservation.id} className="border-b border-gray-200">
                                <td className="px-6 py-4 text-gray-700">{reservation.id}</td>
                                <td className="px-6 py-4 text-gray-700">{reservation.userName}</td>
                                <td className="px-6 py-4 text-gray-700">
                                    {new Date(reservation.startDate).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-gray-700">
                                    {new Date(reservation.endDate).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 text-gray-700">
                                    {reservation.deskNames.join(', ')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-500">No reservations found</p>
            )}
        </div>
    );
};

export default ReservationsList;
