import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Car, Bath, Bed } from "lucide-react";


  // Fetch data on component mount
  // Define the Property interface
  interface Property {
    _id: string;
    title: string;
    images?: string;
    price: number;
    location: { address: string };
    details?: {
      parking?: number;
      bathroom?: number;
      bedroom?: number;
    };
    status?: string;
  }
  

const Index = () => {
  const [popularProperties, setPopularProperties] = useState<Property[]>([]);
  const [otherProperties, setOtherProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8888/property/property");
        if (!response.ok) throw new Error("Failed to fetch data.");
        const data: Property[] = await response.json();

        const popular = data.filter((property) => property.status === "most-viewed");
        const others = data.filter((property) => property.status !== "most-viewed");

        setPopularProperties(popular);
        setOtherProperties(others);
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    fetchData();
  }, []);


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

        {/* Right Column: Popular Properties */}
        <div className="space-y-6 w-full">
          {/* Popular Properties */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-4">Popular Properties</h2>
            <div className="grid grid-cols-3 gap-4">
            {popularProperties.map((property, index) => (
              <Link to="#" key={index} className="flex flex-col rounded-lg p-4 shadow-sm shadow-indigo-100">
                <img
                  alt={property.title || "Property"}
                  src={property.images || "https://via.placeholder.com/300"}
                  className="h-56 w-full rounded-md object-cover"
                />
                <div className="mt-2 w-full">
                  <p className="text-sm text-gray-500">${property.title || "N/A"}</p>
                  <p className="font-medium">{property.location?.address || "Address not available"}</p>
                  <div className="mt-6 flex items-center gap-1 text-xs">
                    <Car className="h-5 w-5 text-indigo-700" />
                    <p>{property.details?.parking || "N/A"} spaces</p>
                  </div>
                </div>
              </Link>
            ))}

            </div>
          </div>

          {/* Other Properties */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-semibold text-lg mb-4">Other Properties</h2>
            <div className="space-y-4">
              {otherProperties.map((property, index) => (
                <Link
                  to="#"
                  key={index}
                  className="flex flex-row items-center w-full justify-between rounded-lg p-4 shadow-sm shadow-indigo-100"
                >
                  <div className="flex flex-row items-start justify-between w-full gap-4">
                    <img
                      alt={property.title}
                      src={property.images || "https://via.placeholder.com/300"}
                      className="h-40 w-40 rounded-md object-cover"
                    />
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <p className="font-medium">{property.title}, {property.location?.address || "Address not available"}</p>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Car className="h-5 w-5 text-indigo-700" />
                          <div>
                            <p className="text-gray-500">Parking</p>
                            <p className="font-medium">{property.details?.parking || "N/A"} spaces</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bath className="h-5 w-5 text-indigo-700" />
                          <div>
                            <p className="text-gray-500">Bathroom</p>
                            <p className="font-medium">{property.details?.bathroom || "N/A"} rooms</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Bed className="h-5 w-5 text-indigo-700" />
                          <div>
                            <p className="text-gray-500">Bedroom</p>
                            <p className="font-medium">{property.details?.bedroom || "N/A"} rooms</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-between pr-4">
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="text-lg font-bold text-indigo-700">
                          ${property.price}
                        </p>
                      </div>
                      <Link
                        to={`/property/${property._id}`} // Button directs to property page
                        className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                      >
                        Choose this house
                      </Link>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
