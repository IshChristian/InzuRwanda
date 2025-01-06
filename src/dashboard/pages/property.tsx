"use client";

import React, { useState, useEffect } from "react";
import { Plus, X, MapPin, DollarSign, Home, Bed, Bath, Square, Upload, Eye } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";


interface Property {
  title: string;
  type: string;
  purpose: string;
  status: string;
  price: string;
  period: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  details: {
    area: number;
    bedroom: number;
    bathroom: number;
  };
  features: string[];
  images: (File | string)[];
  description: string;
  owner: string;
}

const getImageUrl = (image: File | string): string => {
  if (image instanceof File) {
    return URL.createObjectURL(image);
  }
  return typeof image === "string"
    ? image
    : "/placeholder.svg?height=300&width=400";
};


const PropertyCard: React.FC<{
  property: Property;
  onView: (property: Property) => void;
}> = ({ property, onView }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={getImageUrl(property.images[0])} 
        alt={property.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
        {property.location && (
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin size={16} className="mr-1" />
            <span>{`${property.location.city}, ${property.location.state}`}</span>
          </div>
        )}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center text-green-600 font-semibold">
            <DollarSign size={16} className="mr-1" />
            <span>{property.price}</span>
            <span className="text-gray-500 font-normal ml-1">/ {property.period}</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            property.status === 'available' 
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {property.status}
          </span>
        </div>
        {property.details && (
          <div className="flex justify-between text-sm text-gray-500">
            <span className="flex items-center">
              <Bed size={16} className="mr-1" />
              {property.details.bedroom}
            </span>
            <span className="flex items-center">
              <Bath size={16} className="mr-1" />
              {property.details.bathroom}
            </span>
            <span className="flex items-center">
              <Square size={16} className="mr-1" />
              {property.details.area} sqft
            </span>
          </div>
        )}
      </div>
      <div className="p-4 pt-0">
        <button 
          onClick={() => onView(property)} 
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center"
        >
          <Eye size={16} className="mr-2" />
          View Details
        </button>
      </div>
    </div>
  );
};






const AddPropertyForm: React.FC<{
  onClose: () => void;
  onSubmit: (property: Property) => void;
}> = ({ onClose, onSubmit }) => {
  const getUserIdFromCookie = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("userID="))
      ?.split("=")[1] || "";
  };
  const [newProperty, setNewProperty] = useState<Property>({
    title: "",
    type: "commercial",
    purpose: "rent",
    status: "available",
    price: "",
    period: "monthly",
    location: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
    details: {
      area: 0,
      bedroom: 0,
      bathroom: 0,
    },
    features: [],
    images: [],
    description: "",
    owner: getUserIdFromCookie(),
  });

  const features = ["elevator", "security", "parking", "wifi", "generator"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProperty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProperty((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProperty((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        [name]: Number(value),
      },
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setNewProperty((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewProperty((prev) => ({
        ...prev,
        images: [...prev.images, ...filesArray],
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setNewProperty((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userId = getUserIdFromCookie();
    if (!userId) return;
  
    // Simply pass the form data with owner
    onSubmit({
      ...newProperty,
      owner: userId
    });
  };
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Add New Property</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out"
          >
            <X size={24} />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newProperty.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Type
            </label>
            <select
              id="type"
              name="type"
              value={newProperty.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="purpose"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Purpose
            </label>
            <select
              id="purpose"
              name="purpose"
              value={newProperty.purpose}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="rent">Rent</option>
              <option value="sale">Sale</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={newProperty.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="available">Available</option>
              <option value="sold">Sold</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={newProperty.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="period"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Period
            </label>
            <select
              id="period"
              name="period"
              value={newProperty.period}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={newProperty.location.address}
              onChange={handleLocationChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={newProperty.location.city}
              onChange={handleLocationChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={newProperty.location.state}
              onChange={handleLocationChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="zipCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={newProperty.location.zipCode}
              onChange={handleLocationChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Area (sqft)
            </label>
            <input
              type="number"
              id="area"
              name="area"
              value={newProperty.details.area}
              onChange={handleDetailsChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="bedroom"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bedrooms
            </label>
            <input
              type="number"
              id="bedroom"
              name="bedroom"
              value={newProperty.details.bedroom}
              onChange={handleDetailsChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="bathroom"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bathrooms
            </label>
            <input
              type="number"
              id="bathroom"
              name="bathroom"
              value={newProperty.details.bathroom}
              onChange={handleDetailsChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="md:col-span-2">
    <label
      htmlFor="features"
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      Features
    </label>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {features.map((feature) => (
        <button
          key={feature}
          type="button"
          onClick={() => handleFeatureToggle(feature)}
          className={`py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out ${
            newProperty.features.includes(feature)
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {feature}
        </button>
      ))}
    </div>
  </div>
          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newProperty.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Images
            </label>
            <div className="flex flex-wrap gap-4">
              {newProperty.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={getImageUrl(image)}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-20 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition duration-200 ease-in-out"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <label
                htmlFor="image-upload"
                className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors duration-300"
              >
                <input
                  type="file"
                  id="image-upload"
                  onChange={handleImageUpload}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
                <Upload size={24} className="text-gray-400" />
              </label>
            </div>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Add Property
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const PropertyPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [viewedProperty, setViewedProperty] = useState<Property | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const userId = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userID="))
        ?.split("=")[1];

      if (!userId) {
        throw new Error("User ID not found");
      }

      setLoading(true);
      const response = await fetch(`http://localhost:8888/property/find/property/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      const data = await response.json();
      console.log("Fetched properties:", data);
      setProperties(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch properties");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = async (newProperty: Property) => {
    try {
      const userId = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userID="))
        ?.split("=")[1];

      if (!userId) {
        setError("User authentication required");
        return;
      }

      const propertyData = {
        ...newProperty,
        owner: userId
      };

      console.log("Sending property data:", propertyData);

      const response = await fetch("http://localhost:8888/property/new", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData)
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error || "Failed to add property");
      }

      setProperties((prev) => [...prev, responseData]);
      setIsAdding(false);
    } catch (err) {
      console.error("Error:", err);
      setError(err instanceof Error ? err.message : "Failed to add property");
    }
  };

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.state.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Properties</h1>
        <div className="flex w-full md:w-auto gap-4">
          <input
            type="text"
            placeholder="Search properties..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out flex items-center whitespace-nowrap"
          >
            <Plus size={20} className="mr-2" />
            Add Property
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : properties.length === 0 ? (
        <motion.div
          className="flex justify-center items-center p-8 bg-white rounded-lg border-2 border-dashed border-gray-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <Home className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-2 text-xl font-semibold text-gray-900">
              No Properties Available
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new property.
            </p>
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setIsAdding(true)}
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Add Property
              </button>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property, index) => (
            <PropertyCard
              key={index + 1}
              property={property}
              onView={setViewedProperty}
            />
          ))}
        </div>
      )}
      {viewedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{viewedProperty.title}</h2>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
              {JSON.stringify(viewedProperty, null, 2)}
            </pre>
            <button 
              onClick={() => setViewedProperty(null)} 
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <AnimatePresence>
        {isAdding && (
          <AddPropertyForm
            onClose={() => setIsAdding(false)}
            onSubmit={handleAddProperty}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyPage;
