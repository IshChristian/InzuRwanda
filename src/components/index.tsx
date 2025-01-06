import { Link } from "react-router-dom";
import { Car, Bath, Bed } from "lucide-react";
// import React from 'react'

const index = () => {
  return (
    <>
      {/* Grid Layout */}
      <div className="flex flex-row gap-6 p-4">
        {/* Left Column: Maps and Filters */}
        <div className="space-y-6 w-2/4">
          {/* Map Section */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-4">Maps</h2>
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              {/* Replace with actual map */}
              <span>Map Placeholder</span>
            </div>
            <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Show Full Map
            </button>
          </div>

          {/* Filter Section */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-4">Filter</h2>
            <div className="space-y-4">
              {/* Price Range */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Price Range</span>
                </label>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="100"
                  className="range"
                />
                <div className="flex justify-between text-xs px-2">
                  <span>$500</span>
                  <span>$5000</span>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Bedrooms</span>
                </label>
                <select className="select select-bordered w-full">
                  <option>Any</option>
                  <option>1 Bedroom</option>
                  <option>2 Bedrooms</option>
                  <option>3 Bedrooms</option>
                  <option>4+ Bedrooms</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Bathrooms</span>
                </label>
                <select className="select select-bordered w-full">
                  <option>Any</option>
                  <option>1 Bathroom</option>
                  <option>2 Bathrooms</option>
                  <option>3+ Bathrooms</option>
                </select>
              </div>

              {/* Amenities */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Amenities</span>
                </label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                    <span>Parking</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                    <span>Gym</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                    <span>Swimming Pool</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                    />
                    <span>Pet Friendly</span>
                  </label>
                </div>
              </div>

              {/* Apply Filters */}
              <div className="mt-4">
                <button className="btn btn-primary w-full">
                  Apply Filters
                </button>
              </div>
            </div>
            <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Right Column: Popular Vehicles */}
        <div className="space-y-6 w-full">
          {/* Popular Vehicles */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-4">Popular Vehicles</h2>
            <div className="grid grid-cols-3 gap-4">
              {/* Vehicle Card */}

              <Link
                to="#"
                className="flex flex-col rounded-lg p-4 shadow-sm shadow-indigo-100"
              >
                <img
                  alt="Property"
                  src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  className="h-56 w-full rounded-md object-cover"
                />

                <div className="mt-2 w-full">
                  <dl>
                    <div>
                      <dt className="sr-only">Price</dt>
                      <dd className="text-sm text-gray-500">$240,000</dd>
                    </div>

                    <div>
                      <dt className="sr-only">Address</dt>
                      <dd className="font-medium">
                        123 Wallaby Avenue, Park Road
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex items-center gap-1 text-xs">
                    {/* Parking */}
                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <Car className="h-5 w-5 text-indigo-700" />{" "}
                      {/* Use the lucide icon for parking */}
                      <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Parking</p>
                        <p className="font-medium">2 spaces</p>
                      </div>
                    </div>

                    {/* Bathroom */}
                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <Bath className="h-5 w-5 text-indigo-700" />{" "}
                      {/* Use the lucide icon for bathroom */}
                      <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Bathroom</p>
                        <p className="font-medium">2 rooms</p>
                      </div>
                    </div>

                    {/* Bedroom */}
                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                      <Bed className="h-5 w-5 text-indigo-700" />
                      {/* Use the lucide icon for bedroom */}
                      <div className="mt-1.5 sm:mt-0">
                        <p className="text-gray-500">Bedroom</p>
                        <p className="font-medium">4 rooms</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Other Vehicles */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-4">Others</h2>
            <div className="space-y-4">
              <Link
                to="#"
                className="flex flex-row items-center w-full justify-between rounded-lg p-4 shadow-sm shadow-indigo-100"
              >
                {/* Right Section: Image, Name, and Details */}
                <div className="flex flex-row items-start justify-between w-full gap-4">
                  {/* Image */}
                  <img
                    alt="Property"
                    src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    className="h-40 w-40 rounded-md object-cover"
                  />

                  {/* Details */}
                  <div className="flex flex-col justify-between flex-1">
                    {/* Address */}
                    <div>
                      <p className="font-medium">
                        123 Wallaby Avenue, Park Road
                      </p>
                    </div>

                    {/* Features */}
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                      {/* Parking */}
                      <div className="flex items-center gap-2">
                        <Car className="h-5 w-5 text-indigo-700" />
                        <div>
                          <p className="text-gray-500">Parking</p>
                          <p className="font-medium">2 spaces</p>
                        </div>
                      </div>

                      {/* Bathroom */}
                      <div className="flex items-center gap-2">
                        <Bath className="h-5 w-5 text-indigo-700" />
                        <div>
                          <p className="text-gray-500">Bathroom</p>
                          <p className="font-medium">2 rooms</p>
                        </div>
                      </div>

                      {/* Bedroom */}
                      <div className="flex items-center gap-2">
                        <Bed className="h-5 w-5 text-indigo-700" />
                        <div>
                          <p className="text-gray-500">Bedroom</p>
                          <p className="font-medium">4 rooms</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Left Section: Price and Button */}
                  <div className="flex flex-col items-start justify-between pr-4">
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="text-lg font-bold text-indigo-700">
                        $240,000
                      </p>
                    </div>
                    <button className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                      Choose this house
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
