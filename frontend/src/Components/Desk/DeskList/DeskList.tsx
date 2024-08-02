import React, { useEffect, useState } from 'react';
import { getAllDesks } from '../../../Services/DeskService';

const DeskList = () => {
    const [desks, setDesks] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllDesks();
                setDesks(result);
            } catch (error) {
                console.error('Error fetching desks', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Desks</h2>
            <ul className="space-y-4">
                {desks.length > 0 ? (
                    desks.map((desk: any) => (
                        <li
                            key={desk.id}
                            className={`p-4 border rounded-md flex justify-between items-center ${
                                desk.isAvailable ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'
                            }`}
                        >
                            <span className="text-lg font-medium">{desk.name}</span>
                            <span
                                className={`text-sm font-semibold ${
                                    desk.isAvailable ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {desk.isAvailable ? 'Available' : 'Not Available'}
                            </span>
                        </li>
                    ))
                ) : (
                    <li className="text-center text-gray-500">No desks available</li>
                )}
            </ul>
        </div>
    );
};

export default DeskList;
