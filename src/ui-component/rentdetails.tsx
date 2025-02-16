import React from "react";
import { Home, MapPin, DollarSign, Calendar, CreditCard, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample data
const booking = {
  id: 1,
  title: "Modern Apartment in Kigali",
  location: "Kigali, Rwanda",
  price: "$500/month",
  date: "2025-02-15",
  image: "https://source.unsplash.com/400x300/?apartment",
};

// Google Maps Embed Link (Replace this with your actual shared link)
const googleMapEmbedUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63818.91500313824!2d30.061885998367174!3d-1.9578750000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6e5a06779b3%3A0x9dbeb8b81fcb65b1!2sKigali!5e0!3m2!1sen!2srw!4v1700000000000";

const ViewBookingDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6 max-w-screen-lg">
      <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
      <div className="flex flex-col md:flex-row gap-6 h-full">
        {/* Left Column - House Profile */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex-1">
          <img
            src={booking.image}
            alt={booking.title}
            className="w-full h-64 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Home className="h-5 w-5 text-blue-500" />
            {booking.title}
          </h3>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-red-500" /> {booking.location}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-500" /> {booking.price}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-yellow-500" /> Move-in Date: {booking.date}
          </p>
          <div className="mt-4 flex gap-2">
            <button 
              className="w-full bg-blue-600 text-white flex items-center gap-2 px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => navigate("/payment")}
            >
              <CreditCard className="h-5 w-5" /> Pay for Rent
            </button>
            <button 
              className="w-full bg-red-600 text-white flex items-center gap-2 px-4 py-2 rounded-md hover:bg-red-700"
            >
              <XCircle className="h-5 w-5" /> Deactivate Booking
            </button>
          </div>
        </div>

        {/* Right Column - Embedded Google Map */}
        <div className="bg-white shadow-lg rounded-2xl p-6 flex-1 h-full">
          <h3 className="text-lg font-semibold mb-4">Location on Map</h3>
          <iframe
            src={googleMapEmbedUrl}
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: "8px" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ViewBookingDetails;
