"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageSquare, Calendar, Star, TrendingUp, Eye } from "lucide-react";

const PropertyDetailsPage = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);

  // Fetch property details
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8888/property/find/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch property details.");
        }
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError(err.message);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  if (!property) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="lg:w-2/3 space-y-8">
          {/* Property Details Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
            <p className="text-gray-600 mb-4">{property.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold">Type:</span> {property.type}
              </div>
              <div>
                <span className="font-semibold">Purpose:</span> {property.purpose}
              </div>
              <div>
                <span className="font-semibold">Status:</span> {property.status}
              </div>
              <div>
                <span className="font-semibold">Price:</span> ${property.price} / {property.period}
              </div>
              <div>
                <span className="font-semibold">Area:</span> {property.details?.area} sqft
              </div>
              <div>
                <span className="font-semibold">Bedrooms:</span> {property.details?.bedroom}
              </div>
              <div>
                <span className="font-semibold">Bathrooms:</span> {property.details?.bathroom}
              </div>
              <div>
                <span className="font-semibold">Parking:</span> {property.details?.parking}
              </div>
              <div>
                <span className="font-semibold">Year Built:</span> {property.details?.yearBuilt}
              </div>
            </div>

            {/* Location Details */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Location</h3>
              <p className="text-gray-600">
                {property.location?.address && <>{property.location.address}, </>}
                {property.location?.city && <>{property.location.city}, </>}
                {property.location?.state && <>{property.location.state}, </>}
                {property.location?.zipCode && <>ZIP: {property.location.zipCode}</>}
              </p>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Image Gallery</h2>
            <div className="grid grid-cols-3 gap-4">
              {property.images?.length > 0 ? (
                property.images.map((image, index) => (
                  <img
                    key={index}
                    src={image} // Base64 image
                    alt={`Property Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                ))
              ) : (
                <p className="text-gray-500">No images available.</p>
              )}
            </div>
          </div>

          {/* Inquiries & Communication */}
          {property.inquiries?.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Inquiries</h2>
              <div className="space-y-4">
                {property.inquiries.map((inquiry, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-semibold">{inquiry.initials}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{inquiry.name}</h4>
                      <p className="text-sm text-gray-500">{inquiry.email}</p>
                      <p className="mt-1">{inquiry.message}</p>
                    </div>
                    <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100">
                      Reply
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feedback & Reviews */}
          {property.reviews?.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Tenant Reviews</h2>
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={
                      i < property.averageRating ? "text-yellow-400 h-5 w-5" : "text-gray-300 h-5 w-5"
                    }
                  />
                ))}
                <span className="ml-2 text-gray-600">
                  ({property.averageRating} average based on {property.reviews.length} reviews)
                </span>
              </div>
              <div className="space-y-4">
                {property.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <h4 className="font-semibold">{review.title}</h4>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={i < review.rating ? "text-yellow-400 h-4 w-4" : "text-gray-300 h-4 w-4"}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-gray-600">{review.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:w-1/3 space-y-8">
          {/* Performance Statistics Section */}
          <div className="bg-white shadow rounded-lg p-6">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
