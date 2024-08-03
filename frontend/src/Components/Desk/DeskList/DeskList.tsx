import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getAvailableDesks } from '../../../Services/DeskService';

const DeskList = () => {
    const [desks, setDesks] = useState<any[]>([]);
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

    useEffect(() => {
        if (hoveredDate) {
            const fetchAvailableDesks = async () => {
                try {
                    const availableDesks = await getAvailableDesks(hoveredDate);
                    setDesks(availableDesks);
                } catch (error) {
                    console.error('Error fetching available desks:', error);
                }
            };

            fetchAvailableDesks();
        } else {
            setDesks([]);
        }
    }, [hoveredDate]);

    const handleDateChange = (value: any) => {
        if (value instanceof Date) {
            setHoveredDate(value);
        } else {
            setHoveredDate(null);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md flex space-x-6">
            <div className="flex-shrink-0">
                <Calendar
                    onChange={handleDateChange}
                    className="bg-white rounded-lg shadow-md"
                />
            </div>
            <div className="flex-grow">
                {hoveredDate && (
                    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Available Desks for {hoveredDate.toLocaleDateString()}
                        </h3>
                        {desks.length > 0 ? (
                            <ul className="space-y-2">
                                {desks.map(desk => (
                                    <li
                                        key={desk.id}
                                        className="p-2 border rounded-md bg-green-100 border-green-300 text-green-800"
                                    >
                                        {desk.name}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No desks available</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeskList;
