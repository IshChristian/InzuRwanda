"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageSquare, Calendar, Star, TrendingUp, Eye } from "lucide-react";

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/property/${id}`); // Use relative URL
        if (!response.ok) {
          throw new Error(`Failed to fetch property details: ${response.statusText}`);
        }
        const data = await response.json();
        setProperty(data);
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 bg-red-50 p-4 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-gray-500">Property not found</div>
      </div>
    );
  }

  const renderStars = (rating, size = 5) => (
    Array.from({ length: size }, (_, i) => (
      <Star
        key={i}
        className={`${i < rating ? "text-yellow-400" : "text-gray-300"} h-${size} w-${size}`}
      />
    ))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="lg:w-2/3 space-y-8">
          {/* Property Details Card */}
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">{property.title}</h1>
            <p className="text-gray-600 mb-4">{property.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                { label: "Type", value: property.type },
                { label: "Purpose", value: property.purpose },
                { label: "Status", value: property.status },
                { label: "Price", value: `$${property.price} / ${property.period}` },
                { label: "Area", value: `${property.details?.area ?? 'N/A'} sqft` },
                { label: "Bedrooms", value: property.details?.bedroom ?? 'N/A' },
                { label: "Bathrooms", value: property.details?.bathroom ?? 'N/A' },
                { label: "Parking", value: property.details?.parking ?? 'N/A' },
                { label: "Year Built", value: property.details?.yearBuilt ?? 'N/A' }
              ].map(({ label, value }) => (
                <div key={label}>
                  <span className="font-semibold">{label}:</span> {value}
                </div>
              ))}
            </div>

            {/* Location Details */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Location</h2>
              <p className="text-gray-600">
                {[
                  property.location?.address,
                  property.location?.city,
                  property.location?.state,
                  property.location?.zipCode && `ZIP: ${property.location.zipCode}`
                ].filter(Boolean).join(", ")}
              </p>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Image Gallery</h2>
            {property.images?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {property.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Property view ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                    loading="lazy"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No images available</p>
            )}
          </div>

          {/* Inquiries Section */}
          {property.inquiries?.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Inquiries</h2>
              <div className="space-y-4">
                {property.inquiries.map((inquiry, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-semibold">{inquiry.initials}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{inquiry.name}</h3>
                      <p className="text-sm text-gray-500">{inquiry.email}</p>
                      <p className="mt-1">{inquiry.message}</p>
                    </div>
                    <button 
                      className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 transition-colors"
                      onClick={() => window.location.href = `mailto:${inquiry.email}`}
                    >
                      Reply
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          {property.reviews?.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Tenant Reviews</h2>
              <div className="flex items-center mb-4">
                {renderStars(property.averageRating)}
                <span className="ml-2 text-gray-600">
                  ({property.averageRating.toFixed(1)} average based on {property.reviews.length} reviews)
                </span>
              </div>
              <div className="space-y-4">
                {property.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <h3 className="font-semibold">{review.title}</h3>
                    <div className="flex items-center mt-1">
                      {renderStars(review.rating, 4)}
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
          <div className="bg-white shadow rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Performance Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {property.activeListings ?? 0}
                </div>
                <div className="text-sm text-gray-500">Active Listings</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {property.totalViews?.toLocaleString() ?? 0}
                </div>
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