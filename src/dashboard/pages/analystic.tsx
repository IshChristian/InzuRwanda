"use client";

import React from "react";
import { Edit, Eye } from "lucide-react";
import { Heart, Users, CheckCircle, UserPlus, DollarSign } from "lucide-react";

// Mock data for properties
const properties = [
  {
    id: 1,
    title: "Beachfront Villa",
    status: "Available",
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 2,
    title: "Mountain Cabin",
    status: "Booked",
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 3,
    title: "City Apartment",
    status: "Available",
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 4,
    title: "Lakeside Cottage",
    status: "Available",
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 4,
    title: "Lakeside Cottage",
    status: "Available",
    image: "/placeholder.svg?height=100&width=150",
  },
];

// Mock data for bookings
const bookings = [
  {
    id: 1,
    customerName: "John Doe",
    propertyName: "Beachfront Villa",
    bookingDate: "2023-07-15",
    status: "Confirmed",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    propertyName: "Mountain Cabin",
    bookingDate: "2023-07-20",
    status: "Pending",
  },
  {
    id: 3,
    customerName: "Mike Johnson",
    propertyName: "City Apartment",
    bookingDate: "2023-07-25",
    status: "Confirmed",
  },
  {
    id: 4,
    customerName: "Emily Brown",
    propertyName: "Lakeside Cottage",
    bookingDate: "2023-07-30",
    status: "Cancelled",
  },
];

const RentalDashboard: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100 w-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Main Content Area */}
        <main className="flex-1 bg-gray-100">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="stats shadow  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              {/* Total Likes */}
              <div className="stat place-items-center">
                <div className="stat-figure text-primary">
                  <Heart className="h-8 w-8" />
                </div>
                <div className="stat-title">Total Likes</div>
                <div className="stat-value">1.2K</div>
                <div className="stat-desc">↗︎ 120 (10%) this month</div>
              </div>

              {/* Total User Requests */}
              <div className="stat place-items-center">
                <div className="stat-figure text-secondary">
                  <Users className="h-8 w-8" />
                </div>
                <div className="stat-title">User Requests</div>
                <div className="stat-value text-secondary">350</div>
                <div className="stat-desc text-secondary">↗︎ 15% growth</div>
              </div>

              {/* Total Booked Requests */}
              <div className="stat place-items-center">
                <div className="stat-figure text-accent">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div className="stat-title">Booked Requests</div>
                <div className="stat-value">150</div>
                <div className="stat-desc">Steady bookings</div>
              </div>

              {/* Total Team */}
              <div className="stat place-items-center">
                <div className="stat-figure text-info">
                  <UserPlus className="h-8 w-8" />
                </div>
                <div className="stat-title">Team Members</div>
                <div className="stat-value">8</div>
                <div className="stat-desc">All active</div>
              </div>

              {/* Total Income Balance */}
              <div className="stat place-items-center">
                <div className="stat-figure text-success">
                  <DollarSign className="h-8 w-8" />
                </div>
                <div className="stat-title">Total Income</div>
                <div className="stat-value">$12,350</div>
                <div className="stat-desc">↗︎ $1,200 last month</div>
              </div>
            </div>

            {/* Properties Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Your Properties
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {properties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                  >
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {property.title}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            property.status === "Available"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {property.status}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                          {property.status === "Available" ? (
                            <Edit size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Bookings Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Booking Requests
              </h2>
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr
                        key={booking.id}
                        className="hover:bg-gray-50 transition-colors duration-300"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.customerName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.propertyName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.bookingDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === "Confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RentalDashboard;
