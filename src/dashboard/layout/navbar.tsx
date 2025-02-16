'use client'

import React, { useState } from 'react';
import { Home, Inbox, BarChart2, Settings, LogOut } from 'lucide-react';
import { Link } from "react-router-dom";
const RentalDashboard: React.FC = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('Properties')

  const menuItems = [
    { icon: Home, label: 'Properties', path: "#" },
    { icon: Inbox, label: 'Bookings', path: "/dashboard/booking" },
    { icon: Inbox, label: 'Property', path: "/dashboard/property" },
    { icon: BarChart2, label: 'Analytics', path: "/dashboard/analystic" },
    { icon: Settings, label: 'Settings', path: "#" },
    { icon: LogOut, label: 'Logout', path: "#" },
  ]

  return (
    <>
      {/* Right Sidebar */}
      <nav className="bg-white card rounded-lg p-3 w-64 flex-shrink-0">
        <div className="h-16 flex items-center justify-center">
          <h2 className="text-xl font-semibold">Rental Dashboard</h2>
        </div>
        <div className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center px-6 py-3 hover:bg-gray-700 hover:text-white transition-colors duration-300 ${
                activeMenuItem === item.label ? 'bg-gray-900 text-white' : ''
              }`}
              onClick={() => setActiveMenuItem(item.label)}
            >
              <item.icon className="h-6 w-6 mr-3" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  )
}

export default RentalDashboard

