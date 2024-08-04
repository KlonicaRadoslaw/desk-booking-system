import React from 'react';
import logo from "./logo.png";
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
    role: string;
}

const Navbar = () => {
    const { isLoggedIn, user, logout } = useAuth();

    let role = "";
    const token = localStorage.getItem("token");

    if (token) {
        try {
            const decodedToken: DecodedToken = jwtDecode(token);
            role = decodedToken.role;
        } catch (error) {
            console.error("Invalid token specified", error);
        }
    }

    const reservationOptions = [
        { value: '/create-reservation', label: 'New Reservation' },
        { value: '/reservations', label: 'Reservation List' },
        { value: '/user-reservations', label: 'My Reservations' }
    ];

    const deskOptions = [
        { value: '/desks', label: 'Desks' },
        { value: '/create-desk', label: 'Create Desk' },
        { value: '/update-desk', label: 'Update Desk' }
    ];

    const locationOptions = [
        { value: '/create-location', label: 'Create Location' },
        { value: '/locations', label: 'Locations' }
    ];

    const reservationUserOptions = [
        { value: '/create-reservation', label: 'New Reservation' },
        { value: '/user-reservations', label: 'My Reservations' }
    ];

    const deskUserOptions = [
        { value: '/desks', label: 'Desks' },
    ];

    const locationUserOptions = [
        { value: '/locations', label: 'Locations' }
    ];

    const handleSelect = (option: any) => {
        window.location.href = option.value;
    };

    return (
        <nav className="relative container mx-auto p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-20">
                    <Link to="/">
                        <img className='object-cover h-12 w-24' src={logo} alt="" />
                    </Link>
                    {role === 'Admin' ? (
                        <div className="hidden font-bold lg:flex">
                            <Dropdown
                                options={reservationOptions}
                                onChange={handleSelect}
                                placeholder="Reservation"
                                className="w-32"
                                arrowClosed={<span className="text-gray-600">▼</span>}
                                arrowOpen={<span className="text-gray-600">▲</span>}
                                controlClassName="bg-white border border-gray-300 rounded-md shadow-md px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                menuClassName="bg-white border border-gray-300 rounded-md shadow-lg mt-1"
                                arrowClassName="text-gray-600"
                            />
                            <Dropdown
                                options={deskOptions}
                                onChange={handleSelect}
                                placeholder="Desk"
                                className="w-32"
                                arrowClosed={<span className="text-gray-600">▼</span>}
                                arrowOpen={<span className="text-gray-600">▲</span>}
                                controlClassName="bg-white border border-gray-300 rounded-md shadow-md px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                menuClassName="bg-white border border-gray-300 rounded-md shadow-lg mt-1"
                                arrowClassName="text-gray-600"
                            />
                            <Dropdown
                                options={locationOptions}
                                onChange={handleSelect}
                                placeholder="Location"
                                className="w-32"
                                arrowClosed={<span className="text-gray-600">▼</span>}
                                arrowOpen={<span className="text-gray-600">▲</span>}
                                controlClassName="bg-white border border-gray-300 rounded-md shadow-md px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                menuClassName="bg-white border border-gray-300 rounded-md shadow-lg mt-1"
                                arrowClassName="text-gray-600"
                            />
                        </div>
                    ) : (
                        <div className="hidden font-bold lg:flex">
                            <Dropdown
                                options={reservationUserOptions}
                                onChange={handleSelect}
                                placeholder="Reservation"
                                className="w-32"
                                arrowClosed={<span className="text-gray-600">▼</span>}
                                arrowOpen={<span className="text-gray-600">▲</span>}
                                controlClassName="bg-white border border-gray-300 rounded-md shadow-md px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                menuClassName="bg-white border border-gray-300 rounded-md shadow-lg mt-1"
                                arrowClassName="text-gray-600"
                            />
                            <Dropdown
                                options={deskUserOptions}
                                onChange={handleSelect}
                                placeholder="Desk"
                                className="w-32"
                                arrowClosed={<span className="text-gray-600">▼</span>}
                                arrowOpen={<span className="text-gray-600">▲</span>}
                                controlClassName="bg-white border border-gray-300 rounded-md shadow-md px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                menuClassName="bg-white border border-gray-300 rounded-md shadow-lg mt-1"
                                arrowClassName="text-gray-600"
                            />
                            <Dropdown
                                options={locationUserOptions}
                                onChange={handleSelect}
                                placeholder="Location"
                                className="w-32"
                                arrowClosed={<span className="text-gray-600">▼</span>}
                                arrowOpen={<span className="text-gray-600">▲</span>}
                                controlClassName="bg-white border border-gray-300 rounded-md shadow-md px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                menuClassName="bg-white border border-gray-300 rounded-md shadow-lg mt-1"
                                arrowClassName="text-gray-600"
                            />
                        </div>
                    )}
                </div>
                {isLoggedIn() ? (
                    <div className="hidden lg:flex items-center space-x-6 text-back">
                        <div className="hover:text-darkBlue">Welcome, {user?.userName}</div>
                        <a
                            onClick={logout}
                            className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
                        >
                            Logout
                        </a>
                    </div>
                ) : (
                    <div className="hidden lg:flex items-center space-x-6 text-back">
                        <Link to="/login" className="hover:text-darkBlue">Login</Link>
                        <Link
                            to="/register"
                            className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
                        >
                            Signup
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar;
