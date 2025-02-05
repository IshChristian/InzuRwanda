import { MapPin } from "lucide-react";

interface BookingProps {
  bookings: BookingType[];
}

interface BookingType {
  id: string;
  propertyName: string;
  location: string;
  price: number;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
}

const mockBookings: BookingType[] = [
  {
    id: "1",
    propertyName: "Luxury Villa",
    location: "Kigali, Rwanda",
    price: 150,
    startDate: "2024-04-15",
    endDate: "2024-04-20",
    status: "pending"
  },
  {
    id: "2",
    propertyName: "Modern Apartment",
    location: "Musanze, Rwanda",
    price: 100,
    startDate: "2024-04-22",
    endDate: "2024-04-25",
    status: "pending"
  }
];

const Booking = () => {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
      <div className="space-y-4">
        {mockBookings.map((booking) => (
          <div 
            key={booking.id} 
            className="w-full rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{booking.propertyName}</h3>
                  <p className="flex items-center mt-1 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {booking.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900">${booking.price}</p>
                  <p className="text-sm text-gray-500">per night</p>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6">
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Check-in</p>
                  <p className="font-medium text-gray-900">{new Date(booking.startDate).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Check-out</p>
                  <p className="font-medium text-gray-900">{new Date(booking.endDate).toLocaleDateString()}</p>
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