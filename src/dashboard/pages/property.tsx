"use client";

import React, { useState, useEffect } from "react";
import { Plus, X, Home, Upload, Eye } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

interface Property {
  _id: string;
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
  details : {
    area: number;
    bedroom: number;
    bathroom: number;
    parking: number;    // Added to match backend
    yearBuilt: number;
  };
  features: string[];
  images: string[];
  description: string;
  owner: string;
}

// const getImageUrl = (image: File | string): string => {
//   if (image instanceof File) {
//     return URL.createObjectURL(image);
//   }
//   return typeof image === "string"
//     ? image
//     : "/placeholder.svg?height=300&width=400";
// };

const PropertyCard: React.FC<{
  property: Property;
  onView?: (property: Property) => void;
}> = ({ property, onView }) => {
  const navigate = useNavigate();

  // Function to construct the full image URL
  const getImageUrl = (images: string) => {
    // Check if the image path is already a full URL
    if (images) {
      return images;
    }
    // Construct the full URL using the backend server's URL
    return `http://localhost:8888${images}`;
  };

  // Determine the display image: Use the first image or fallback to a placeholder
  const displayImage =
    property.images && property.images.length > 0
      ? getImageUrl(property.images[0])
      : "/placeholder.svg?height=300&width=400";

  // Format the location string
  const locationString = property.location
    ? `${property.location.city}, ${property.location.state}`
    : "Location not specified";

  // Handle the "View Details" button click
  const handleViewDetails = () => {
    if (onView) {
      onView(property); // Optional callback for custom actions
    }
    navigate(`/dashboard/propDetails/${property._id}`); // Navigate to the property details page
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Display the property image */}
      <img
        src={displayImage}
        alt={property.title}
        className="w-full h-48 object-cover"
        onError={(e) => {
          // Fallback to a placeholder if the image fails to load
          (e.target as HTMLImageElement).src = "/placeholder.svg?height=300&width=400";
        }}
      />
      {/* Display the property title and location */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">
          {property.title}, {locationString}
        </h3>
      </div>
      {/* "View Details" button */}
      <div className="p-4 pt-0">
        <button
          onClick={handleViewDetails}
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
  const [newProperty, setNewProperty] = useState<Property>(() => ({
    _id: "",
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
      parking: 0,
      yearBuilt: 0,
    },
    features: [],
    images: [],
    description: "",
    owner: getUserIdFromCookie(), // Lazy initialization
  }));
  

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

  
  const onDrop = async (acceptedFiles: File[]) => {
    try {
      // Convert files to base64 and add them to the state
      const base64Images = await Promise.all(
        acceptedFiles.map(file => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
          });
        })
      );

      setNewProperty(prev => ({
        ...prev,
        images: [...prev.images, ...base64Images],
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      try {
        const uploadedPaths = await Promise.all(
          files.map(async (file) => {
            const formData = new FormData();
            formData.append("image", file);
  
            const response = await fetch("http://localhost:8888/upload", {
              method: "POST",
              body: formData,
            });
  
            if (!response.ok) {
              throw new Error(`Failed to upload ${file.name}`);
            }
  
            const data = await response.json();
            return data.filePath; // Assume server returns the file path
          })
        );
  
        setNewProperty((prev) => ({
          ...prev,
          images: [...prev.images, ...uploadedPaths], // Save file paths in the state
        }));
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    }
  };
  

  const handleRemoveImage = (index: number) => {
    setNewProperty(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

// Update the handleSubmit function
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const userId = getUserIdFromCookie();
  if (!userId) {
    console.error("User ID is missing.");
    return;
  }

  const formattedProperty = {
    ...newProperty,
    price: String(newProperty.price),
    details: {
      ...newProperty.details,
      area: Number(newProperty.details.area) || 0,
      bedroom: Number(newProperty.details.bedroom) || 0,
      bathroom: Number(newProperty.details.bathroom) || 0,
      parking: Number(newProperty.details.parking) || 0,
      yearBuilt: Number(newProperty.details.yearBuilt) || 0,
    },
    images: newProperty.images, // File paths, not base64 strings
    owner: userId,
  };

  onSubmit(formattedProperty);
};


const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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

  <div {...getRootProps()} className="flex flex-wrap gap-4 border-2 border-dashed border-gray-300 p-4 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
    <input {...getInputProps()} id="image-upload" accept="image/*" multiple />

    {newProperty.images.map((image, index) => (
      <div key={index} className="relative group">
        <img
          src={image} // Now using base64 string directly
          alt={`Uploaded ${index + 1}`}
          className="w-24 h-24 object-cover rounded-md"
        />
        <button
          type="button"
          onClick={() => {
            setNewProperty(prev => ({
              ...prev,
              images: prev.images.filter((_, i) => i !== index),
            }));
          }}
          className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    ))}

    <div className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </div>
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
      
      // Validate and sanitize the fetched data
      const sanitizedProperties = data.map((property: any) => ({
        ...property,
        location: property.location || {
          address: "",
          city: "",
          state: "",
          zipCode: ""
        },
        details: property.details || {
          area: 0,
          bedroom: 0,
          bathroom: 0
        },
        features: Array.isArray(property.features) ? property.features : [],
        images: Array.isArray(property.images) ? property.images : []
      }));
      
      setProperties(sanitizedProperties);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch properties");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Image upload handling in handleAddProperty
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

    // Process images before sending to server
    const processedImages = await Promise.all(
      newProperty.images.map(async (imageData, index) => {
        // If the image is already a URL, return it as is
        if (imageData.startsWith('http')) {
          return imageData;
        }
        
        try {
          // Convert base64 to blob
          const base64Response = await fetch(imageData);
          const blob = await base64Response.blob();
          
          // Generate timestamp for unique image name
          const timestamp = new Date().getTime();
          // Create a unique image name with format
          const imageName = `property_${userId}_${timestamp}_${index}.jpg`;
          
          // Create FormData and append the image with the new name
          const formData = new FormData();
          formData.append('image', blob, imageName);

          // Upload the image
          const uploadResponse = await fetch('http://localhost:8888/upload', {
            method: 'POST',
            body: formData
          });

          if (!uploadResponse.ok) {
            throw new Error('Failed to upload image');
          }

          const { imagePath } = await uploadResponse.json();
          // Return just the image name/path
          return imagePath; // This will be something like "property_123_1234567890_0.jpg"
        } catch (error) {
          console.error('Error processing image:', error);
          return null;
        }
      })
    );

    // Filter out any failed uploads
    const validImages = processedImages.filter(path => path !== null);

    const propertyData = {
      ...newProperty,
      owner: userId,
      images: validImages // These will be image paths/names
    };

    // Rest of the property creation code...
  } catch (err) {
    console.error("Error:", err);
    setError(err instanceof Error ? err.message : "Failed to add property");
  }
};

  // Safe property filtering
  const filteredProperties = properties.filter(property => {
    const searchLower = searchTerm.toLowerCase();
    return (
      // Safe property title check
      (property.title || "").toLowerCase().includes(searchLower) ||
      // Safe location checks
      (property.location?.city || "").toLowerCase().includes(searchLower) ||
      (property.location?.state || "").toLowerCase().includes(searchLower) ||
      // Additional search through description
      (property.description || "").toLowerCase().includes(searchLower)
    );
  });

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

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

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
