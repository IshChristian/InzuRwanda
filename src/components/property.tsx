"use client";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Home, Bed, Bath, Car, Calendar, MapPin, Copy, CheckCircle } from "lucide-react";

interface Property {
  _id: string; // Added _id for linking to property pages
  title: string;
  price: number;
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
    parking: number;
  };
  features: string[];
  images: string[];
  description: string;
}

const PropertyDetailsPage = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const [property, setProperty] = useState<Property | null>(null);
  const [otherProperties, setOtherProperties] = useState<Property[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);  // For modal visibility
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    tenant: "",  // Add other fields like tenant ID, startDate, endDate, rentAmount
    startDate: "",
    endDate: "",
    rentAmount: property?.price || 0,
  });
  // Check if tenant ID is in cookies (vanilla JavaScript)
  const getCookie = (name: string) => {
   const value = `; ${document.cookie}`;
   const parts = value.split(`; ${name}=`);
   if (parts.length === 2) return parts.pop()?.split(";").shift();
  };
  
  const tenantID = getCookie("tenantID");


  // Fetch property details and other properties
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8888/property/find/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch property details.");
        }
        const data: Property = await response.json();
        setProperty(data);

        // Fetch other properties from the same location
        const location = data.location?.address;
        if (location) {
          const otherPropsResponse = await fetch(
            `http://localhost:8888/property/find/location/${location}`
          );
          if (!otherPropsResponse.ok) {
            throw new Error("Failed to fetch other properties.");
          }
          const otherPropsData: Property[] = await otherPropsResponse.json();
          setOtherProperties(otherPropsData.filter((p) => p._id !== id));
        }
      } catch (err) {
        const error = err as Error;
        setError(error.message);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  // Copy address to clipboard
  const copyAddress = () => {
    if (property?.location?.address) {
      navigator.clipboard.writeText(property.location.address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

   // Handle form input changes
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to create booking
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8888/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...bookingData,
          property: property?._id,
        }),
      });

      if (!response.ok) {
        throw new Error("Booking failed.");
      }
      alert("Booking successful!");
      setIsModalOpen(false);  // Close modal after booking is successful
    } catch (err) {
      alert("Error creating booking");
    }
  };

 

  // Open the appropriate modal based on tenant status
  const handleBookNowClick = () => {
    if (tenantID) {
        setIsModalOpen(true);  // Show booking modal if tenant is logged in
    } else {
      setIsLoginModalOpen(true);  // Show login modal if tenant is not logged in
    }
  };

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  if (!property) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  const images = property.images.length > 0 ? property.images : ["/placeholder.svg?height=600&width=800"];

  return (
    <div className="container mx-auto px-4 py-8 font-sans">
      {/* Collage Image Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-8/12">
            <img
              src={images[0]}
              alt="Main Property Image"
              className="rounded-lg object-cover w-full h-[400px] hover:opacity-90 transition-opacity duration-300"
            />
          </div>
          <div className="w-full md:w-4/12 flex flex-row md:flex-col gap-4">
            {images.slice(1, 3).map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`Property Image ${index + 2}`}
                className="rounded-lg object-cover w-full h-[192px] hover:opacity-90 transition-opacity duration-300"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side (Property Information) */}
        <div className="w-full lg:w-2/3 space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <p className="text-2xl text-indigo-600 font-semibold mb-2">
              ${property.price} / {property.period}
            </p>
            <p className="text-gray-600 mb-4">
              {property.location?.address || "Address not available"}, {property.location?.city || "City not available"}
              , {property.location?.state || "State not available"}, Zipcode: {property.location?.zipCode || "N/A"}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center">
                <Home className="mr-2 text-indigo-600" />
                <span>{property.details?.area || "N/A"} sqft</span>
              </div>
              <div className="flex items-center">
                <Bed className="mr-2 text-indigo-600" />
                <span>{property.details?.bedroom || 0} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <Bath className="mr-2 text-indigo-600" />
                <span>{property.details?.bathroom || 0} Bathrooms</span>
              </div>
              <div className="flex items-center">
                <Car className="mr-2 text-indigo-600" />
                <span>{property.details?.parking || 0} Parking</span>
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-2">Features</h2>
            <div className="flex flex-wrap gap-2">
              {property.features?.length > 0 ? (
                property.features.map((feature: string, index: number) => (
                  <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                    {feature}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No features listed.</span>
              )}
            </div>
            <h2 className="text-xl font-semibold mt-6 mb-2">Description</h2>
            <p className="text-gray-600">{property.description || "No description available."}</p>
          </div>

          {/* Other Properties */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="font-semibold text-lg mb-4">Other Properties</h2>
            <div className="space-y-4">
              {otherProperties.length > 0 ? (
                otherProperties.map((other: Property) => (
                  <Link
                    key={other._id}
                    to={`/property/${other._id}`}
                    className="flex items-center p-4 rounded-lg shadow-sm shadow-indigo-100"
                  >
                    <img
                      src={other.images[0] || "https://via.placeholder.com/300"}
                      alt={other.title}
                      className="h-24 w-24 rounded-lg object-cover"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{other.title}</h3>
                      <p className="text-gray-500">{other.location?.address}</p>
                      <p className="text-indigo-600 font-bold mt-1">${other.price}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500">No other properties found in this location.</p>
              )}
            </div>
          </div>
        </div>

        {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Book Now</h2>
            <form onSubmit={handleBookingSubmit}>
              <div className="mb-4">
                <label htmlFor="tenant" className="block text-sm font-medium text-gray-700">Tenant ID</label>
                <input
                  type="text"
                  id="tenant"
                  name="tenant"
                  value={bookingData.tenant}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={bookingData.startDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={bookingData.endDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="rentAmount" className="block text-sm font-medium text-gray-700">Rent Amount</label>
                <input
                  type="number"
                  id="rentAmount"
                  name="rentAmount"
                  value={bookingData.rentAmount}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                  readOnly
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                Confirm Booking
              </button>
            </form>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      {/* Login Modal (Prompt for Login/Register) */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Please Log In or Create an Account</h2>
            <p className="mb-4">You must be logged in to make a booking. Would you like to log in or create a new account?</p>
            <div className="flex gap-4">
              <Link to="/login" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Log In</Link>
              <Link to="/register" className="bg-green-500 text-white py-2 px-4 rounded-lg">Create account</Link>
            </div>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsLoginModalOpen(false)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

        {/* Right Side (Booking Panel) */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg mb-4 hover:bg-indigo-700">
              <Calendar className="mr-2 inline-block" />
              Request a Tour
            </button>
            <button
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
              onClick={handleBookNowClick}  // Open modal when Book Now is clicked
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
