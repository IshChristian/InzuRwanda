import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, User, Mail, Phone, Check, X, Clock, Calendar, CreditCard } from 'lucide-react';

// Define types for the data
interface Location {
  address: string;
  city: string;
}

interface Tenant {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface Property {
  _id: string;
  title: string;
  location: Location;
  owner: string;
}

interface Booking {
  _id: string;
  tenant: Tenant;
  property: string;
  status: string;
  startDate: string;
  endDate: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
}

interface ApiResponse {
  tenantIds?: Tenant[];
  bookings?: Booking[];
}

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<'confirm' | 'cancel' | 'pending' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8888/booking/bookingid/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      console.log('API Response:', data);

      // Validate the API response
      if (!data.bookings || data.bookings.length === 0) {
        throw new Error('No bookings found');
      }

      // Use the first booking in the response
      const firstBooking = data.bookings[0];

      // Fetch property details using the property ID from the booking
      const propertyResponse = await fetch(`http://localhost:8888/property/find/${firstBooking.property}`);
      if (!propertyResponse.ok) {
        throw new Error(`HTTP error! Status: ${propertyResponse.status}`);
      }

      const propertyData: Property = await propertyResponse.json();
      console.log('Property Response:', propertyData);

      setProperty(propertyData);
      setBooking(firstBooking);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
      setProperty(null);
      setBooking(null);
    }
  };

  // Fetch data from the API based on the `id`
  useEffect(() => {
    fetchData();
  }, [id]); // Re-fetch data when `id` changes

  // Handle Accept button click
  const handleAccept = () => {
    setModalAction('confirm');
    setShowModal(true);
  };

  // Handle Cancel button click
  const handleCancel = () => {
    setModalAction('cancel');
    setShowModal(true);
  };

  // Handle Pending button click
  const handlePending = () => {
    setModalAction('pending');
    setShowModal(true);
  };

  // Handle modal confirmation
  const handleConfirm = async () => {
    setShowModal(false);
    if (!booking || !modalAction) return;

    try {
      let status: string;
      switch (modalAction) {
        case 'confirm':
          status = 'confirmed';
          break;
        case 'cancel':
          status = 'cancelled';
          break;
        case 'pending':
          status = 'pending';
          break;
        default:
          throw new Error('Invalid action');
      }

      const response = await fetch(`http://localhost:8888/booking/${booking._id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert(`Booking status updated to ${status} successfully!`);
      // Refetch the data to update the UI
      fetchData();
    } catch (error) {
      console.error(`Error updating booking status:`, error);
      setError(`Failed to update booking status. Please try again.`);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setModalAction(null);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get payment status badge color
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!property || !booking) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Property Details */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{property.title}</h1>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{property.location.address}, {property.location.city}</span>
          </div>

          {/* Tenant Information */}
          <div className="border-t pt-4">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Tenant Information</h2>
            <div className="flex items-center text-gray-600 mb-2">
              <User className="w-5 h-5 mr-2" />
              <span>Name: {booking.tenant.name}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <Mail className="w-5 h-5 mr-2" />
              <span>Email: {booking.tenant.email}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <Phone className="w-5 h-5 mr-2" />
              <span>Phone: {booking.tenant.phone}</span>
            </div>

            {/* Check-in and Check-out */}
            <div className="flex items-center text-gray-600 mb-2">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Check-in: {booking.startDate ? formatDate(booking.startDate) : 'Not specified'}</span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Check-out: {booking.endDate ? formatDate(booking.endDate) : 'Not specified'}</span>
            </div>

            {/* Payment Status */}
            <div className="flex items-center text-gray-600 mb-4">
              <CreditCard className="w-5 h-5 mr-2" />
              <span>Payment Status: </span>
              <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                {booking.paymentStatus}
              </span>
            </div>

            {/* Booking Status */}
            <div className="flex items-center text-gray-600 mb-4">
              <span className="font-semibold">Current Status:</span>
              <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {booking.status}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {booking.status !== 'confirmed' && (
                <button
                  onClick={handleAccept}
                  className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Confirm
                </button>
              )}
              {booking.status !== 'cancelled' && (
                <button
                  onClick={handleCancel}
                  className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  <X className="w-5 h-5 mr-2" />
                  Cancel
                </button>
              )}
              {booking.status !== 'pending' && (
                <button
                  onClick={handlePending}
                  className="flex items-center justify-center bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  <Clock className="w-5 h-5 mr-2" />
                  Pending
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-800 mb-4">
              Are you sure you want to {modalAction === 'confirm' ? 'confirm' : modalAction === 'cancel' ? 'cancel' : 'set as pending'} this booking?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleConfirm}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Confirm
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;