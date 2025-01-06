// Import necessary libraries
import { useState } from 'react';
import { Bell, MapPin, ChevronDown } from "lucide-react";



const Navbar = () => {

  return (
    <div className="w-full bg-white">
      {/* Navbar */}
      <div className="navbar px-4 lg:px-10 flex justify-between items-center">
        {/* Left: Project Name */}
        <div className="text-2xl font-bold text-gray-800 antialiased">LiveAtRwanda</div>

        {/* Center: Menu */}
        <div className="flex space-x-4">
          <a className="text-gray-600 hover:text-gray-800" href="#">
            Home
          </a>
          <a className="text-gray-600 hover:text-gray-800" href="#">
            About
          </a>
          {/* Dropdown Menu */}
          <div className="dropdown dropdown-hover">
            <label
              tabIndex={0}
              className="text-gray-600 hover:text-gray-800 cursor-pointer flex items-center"
            >
              Services <ChevronDown className="ml-1" size={16} />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-white rounded-box w-52"
            >
              <li>
                <a href="#">Service 1</a>
              </li>
              <li>
                <a href="#">Service 2</a>
              </li>
              <li>
                <a href="#">Service 3</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Notification and Login */}
        <div className="flex items-center space-x-4">
          <button className="relative">
            <Bell className="text-gray-600 hover:text-gray-800" size={24} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          <button className="btn btn-primary">Login</button>
        </div>
      </div>

      

      {/* Location Filter */}
      <div className="p-4">
        <div className="bg-white rounded-lg p-2 flex flex-row space-y-4">
          <div className="flex items-center space-x-4">
            <MapPin className="text-gray-600" size={24} />
            <label
              htmlFor="Username"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                type="text"
                id="Username"
                className="peer input input-bordered w-full max-w-md border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="Username"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Username
              </span>
            </label>
            <div className="flex justify-end">
              <button className="btn btn-primary">search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
