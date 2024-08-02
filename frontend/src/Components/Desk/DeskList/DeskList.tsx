import React, { useEffect, useState } from 'react';
import { getAllDesks } from '../../../Services/DeskService';

const DeskList = () => {
    const [desks, setDesks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllDesks();
            setDesks(result);
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>Desks</h2>
            <ul>
                {desks.map((desk: any) => (
                    <li key={desk.id}>
                        {desk.name} - {desk.isAvailable ? 'Available' : 'Not Available'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeskList;
