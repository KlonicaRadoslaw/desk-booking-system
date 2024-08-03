import React, { useState } from 'react'
import logo from "./logo.png";
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

interface Props { }

const Navbar = (props: Props) => {
  const { isLoggedIn, user, logout } = useAuth();

  const reservationOptions = [
    { value: '/create-reservation', label: 'New Reservation' }
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

// Handle change event
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

export default Navbar