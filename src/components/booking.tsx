import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BookingProps {
  bookings: BookingType[];
}

interface BookingType {
  _id: string;
  property: string; // Property ID to fetch details
  propertyName: string;
  location?: { address: string; city: string; state: string }; // Properly structured location
  price?: number;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
}

interface PropertyType {
  id: string;
  title: string;
  location: {
    address: string;
    city: string;
    state: string;
  };
  price: number;
}

const Booking = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const navigate = useNavigate();

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  const tenantID = getCookie("tenantID");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(`http://localhost:8888/booking/tenant/${tenantID}`);
        const data: BookingType[] = await response.json();
  
        console.log("Fetched booking data:", data); // Debugging log
  
        const enrichedBookings = await Promise.all(
          data.map(async (booking) => {
            if (!booking.id) {
              console.warn("Booking ID is missing in API response:", booking);
            }
            if (!booking.location || booking.price === undefined) {
              try {
                const propertyResponse = await fetch(`http://localhost:8888/property/find/${booking.property}`);
                const propertyData: PropertyType = await propertyResponse.json();
                return {
                  ...booking,
                  location: propertyData.location,
                  price: propertyData.price,
                  propertyName: propertyData.title,
                };
              } catch (error) {
                console.error("Error fetching property details:", error);
              }
            }
            return booking;
          })
        );
  
        setBookings(enrichedBookings.filter(Boolean)); // Remove undefined values
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
  
    if (tenantID) {
      fetchBookings();
    }
  }, [tenantID]);
  


  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <div className="space-y-4">
        {bookings.map((booking, index) => (
          <div
            key={index}
            className="w-full rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => {
              if (!booking._id) {
                console.error("Booking ID is missing:", booking);
                return; // Prevent navigation if ID is missing
              }
              navigate(`/payment/${booking._id}`);
            }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{booking.propertyName}</h3>
                  <p className="flex items-center mt-1 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {booking.location
                      ? `${booking.location.address}, ${booking.location.city}, ${booking.location.state}`
                      : "Location not available"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">
                    ${booking.price !== undefined ? booking.price.toFixed(2) : "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">per night</p>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Check-in</p>
                  <p className="font-medium text-gray-900">
                    {new Date(booking.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Check-out</p>
                  <p className="font-medium text-gray-900">
                    {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Status</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
