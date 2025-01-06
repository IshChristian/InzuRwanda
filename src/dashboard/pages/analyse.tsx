"use client"

import React from "react"
import { MessageSquare, Calendar, Star, TrendingUp, Eye } from "lucide-react"

const PropertyDetailsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="lg:w-2/3">
          {/* Inquiries & Communication */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Recent Inquiries</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((inquiry) => (
                <div key={inquiry} className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-600 font-semibold">JD</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-sm text-gray-500">john.doe@example.com</p>
                    <p className="mt-1">I'm interested in viewing this property. Is it available next weekend?</p>
                  </div>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">Reply</button>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews & Feedback */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Tenant Reviews</h2>
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4].map((star) => (
                <Star key={star} className="text-yellow-400 h-5 w-5" />
              ))}
              <Star className="text-gray-300 h-5 w-5" />
              <span className="ml-2 text-gray-600">(4.0 average based on 12 reviews)</span>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border-b pb-4 last:border-b-0">
                  <h4 className="font-semibold">Great location and amenities</h4>
                  <div className="flex items-center mt-1">
                    {[1, 2, 3, 4].map((star) => (
                      <Star key={star} className="text-yellow-400 h-4 w-4" />
                    ))}
                    <Star className="text-gray-300 h-4 w-4" />
                  </div>
                  <p className="mt-2 text-gray-600">
                    This property exceeded our expectations. The location is perfect, and the amenities are top-notch.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/3">
          {/* Performance Statistics Section */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Performance Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-gray-500">Active Listings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">1,234</div>
                <div className="text-sm text-gray-500">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">56</div>
                <div className="text-sm text-gray-500">Inquiries Received</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$2,500</div>
                <div className="text-sm text-gray-500">Monthly Rent</div>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Views & Inquiries Over Time</h4>
              <div className="h-40 flex items-end">
                {[20, 40, 30, 50, 60, 45, 70].map((value, index) => (
                  <div key={index} className="w-1/7 bg-blue-500 mr-1" style={{ height: `${value}%` }}></div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          {/* Calendar & Appointments */}
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Upcoming Viewings</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((appointment) => (
                <div key={appointment} className="flex items-center space-x-4">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="font-semibold">Property Viewing</div>
                    <div className="text-sm text-gray-500">July 15, 2023 - 2:00 PM</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center">
              <Calendar className="mr-2 h-4 w-4" /> Add Appointment
            </button>
          </div>

          {/* Call to Action (CTA) */}
          <div className="space-y-4">
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center">
              <TrendingUp className="mr-2 h-4 w-4" /> Boost Listing
            </button>
            <button className="w-full px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 flex items-center justify-center">
              <Eye className="mr-2 h-4 w-4" /> View on Platform
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetailsPage

