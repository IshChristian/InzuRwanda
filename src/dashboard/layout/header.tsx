// Import necessary libraries
// import React from 'react';
import { Bell, ChevronDown } from "lucide-react";

const Header = () => {
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
    </div>
  );
};

export default Header;
