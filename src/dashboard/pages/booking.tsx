import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Bell,
  Eye
} from "lucide-react";

// Define interfaces for your data structures
interface Tenant {
  name: string;
  phone: string;
  email: string;
}


interface Booking {
  _id: string;
  tenant: Tenant;
  startDate: string;
  endDate: string;
  status: "pending" | "confirmed" | "cancelled";
  rentAmount: number;
  Property: {
  title: string;
  address: string;
}
}

interface Property {
  _id: string;
  title: string;
  type: string;
  purpose: string;
  status: string;
  price: number;
  period: string;
  features: string[];
  images: string[];
  owner: string;
  location: Location;
  createdAt: string;
  __v: number;
}


interface BookingOverviewProps {
  bookings: Booking[];
  properties: Property[];
}

const BookingOverview: React.FC<BookingOverviewProps> = ({ bookings }) => {
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled").length;
  const totalRevenue = bookings.reduce((sum, b) => sum + b.rentAmount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      <OverviewCard title="Total Bookings" value={totalBookings} icon={<Calendar className="h-6 w-6" />} />
      <OverviewCard title="Pending" value={pendingBookings} icon={<Clock className="h-6 w-6" />} />
      <OverviewCard title="Confirmed" value={confirmedBookings} icon={<CheckCircle className="h-6 w-6" />} />
      <OverviewCard title="Cancelled" value={cancelledBookings} icon={<X className="h-6 w-6" />} />
      <OverviewCard title="Total Revenue" value={`$${totalRevenue}`} icon={<DollarSign className="h-6 w-6" />} />
    </div>
  );
};

interface OverviewCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
    <div className="text-blue-500">{icon}</div>
  </div>
);

interface StatusBadgeProps {
  status: "pending" | "confirmed" | "cancelled";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "confirmed":
        return "bg-green-200 text-green-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>{status}</span>;
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center items-center space-x-2 mt-4">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="p-2 border rounded-md disabled:opacity-50"
    >
      <ChevronLeft className="h-5 w-5" />
    </button>
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="p-2 border rounded-md disabled:opacity-50"
    >
      <ChevronRight className="h-5 w-5" />
    </button>
  </div>
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="px-6 py-4">
          {children}
        </div>
        <div className="px-6 py-3 border-t flex justify-end space-x-3">
          {footer}
        </div>
      </div>
    </div>
  );
};

type ModalAction = 'approve' | 'cancel' | 'reminder';

const BookingDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<ModalAction | ''>('');
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const bookingsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const getEmailFromCookies = () => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "userID") {
        return decodeURIComponent(value); // Decode in case it's encoded
      }
    }
    return null; // Return null if email is not found
  };
  
  const fetchBookings = async () => {
  setIsLoading(true);
  try {
    const id = getEmailFromCookies();
    if (!id) {
      throw new Error("userID not found in cookies.");
    }

    const response = await fetch(`http://localhost:8888/booking/id/${id}`);
    const data = await response.json();
    console.log("API Response:", data);

    // Ensure the data has the expected structure
    if (data && Array.isArray(data.bookings)) {
      setBookings(data.bookings); // Extract only bookings
    } else {
      setBookings([]); // Fallback if structure is unexpected
      console.error("Unexpected data format:", data);
    }
    
    setIsLoading(false);
  } catch (err) {
    setError("Failed to fetch bookings. Please try again later.");
    setIsLoading(false);
    console.error("Error fetching bookings:", err);
    setBookings([]);
  }
};


  

  const openModal = (action: ModalAction, id: string) => {
    setModalAction(action);
    setSelectedBookingId(id);
    setModalOpen(true);
  };

  const handleConfirmAction = async () => {
    try {
      if (modalAction === 'approve') {
        await fetch(`http://localhost:8888/booking/${selectedBookingId}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'confirmed' }),
        });
      } else if (modalAction === 'cancel') {
        await fetch(`http://localhost:8888/booking/${selectedBookingId}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'cancelled' }),
        });
      } else if (modalAction === 'reminder') {
        await fetch(`http://localhost:8888/booking/${selectedBookingId}/send-reminder`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      setModalOpen(false);
      fetchBookings(); // Refresh bookings after action
    } catch (err) {
      console.error(`Error performing ${modalAction} action:`, err);
      setError(`Failed to ${modalAction} booking. Please try again.`);
    }
  };

  const handleViewDetails = (bookingId: string) => {
    // Find the booking by ID
    const booking = bookings.find((b) => b._id === bookingId);
    if (booking && booking.tenant) {
      navigate(`/dashboard/booking-detail/${booking.tenant}`); // Use tenant ID for navigation
    } else {
      console.error("Booking or tenant not found.");
    }
  };

  // Ensure bookings is an array before slicing
  const safeBookings = Array.isArray(bookings) ? bookings : [];
  console.log("Current Bookings:", safeBookings);
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = safeBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.max(1, Math.ceil(safeBookings.length / bookingsPerPage));

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) return <div className="text-center py-10">Loading bookings...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Booking Management</h1>
      <BookingOverview bookings={safeBookings} properties={[]} />

      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Booking ID</th>
              <th className="px-4 py-2 text-left">Check-in</th>
              <th className="px-4 py-2 text-left">Check-out</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
          {currentBookings.map((booking) => {
  return (
    <tr key={booking._id} className="border-b">
      <td className="px-4 py-2">{booking._id.substring(0, 8)}...</td>
      <td className="px-4 py-2">{formatDate(booking.startDate)}</td>
      <td className="px-4 py-2">{formatDate(booking.endDate)}</td>
      <td className="px-4 py-2">
        <StatusBadge status={booking.status} />
      </td>
      <td className="px-4 py-2">${booking.rentAmount}</td>
      <td className="px-4 py-2">
        <div className="flex space-x-2">
          <button 
            onClick={() => handleViewDetails(booking._id)} 
            className="p-1 bg-blue-500 text-white rounded-md"
            title="View details"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
})}

          </tbody>
        </table>
      </div>
      
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      
      {/* Action Confirmation Modal */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title={
          modalAction === 'approve' ? 'Confirm Booking' :
          modalAction === 'cancel' ? 'Cancel Booking' :
          'Send Reminder'
        }
        children={
          <p className="text-gray-700">
            {modalAction === 'approve' && 'Are you sure you want to approve this booking?'}
            {modalAction === 'cancel' && 'Are you sure you want to cancel this booking?'}
            {modalAction === 'reminder' && 'Are you sure you want to send a reminder to the guest?'}
          </p>
        }
        footer={
          <>
            <button 
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleConfirmAction}
              className={`px-4 py-2 rounded-md text-white ${
                modalAction === 'approve' ? 'bg-green-500 hover:bg-green-600' : 
                modalAction === 'cancel' ? 'bg-red-500 hover:bg-red-600' : 
                'bg-yellow-500 hover:bg-yellow-600'
              }`}
            >
              Confirm
            </button>
          </>
        }
      />
    </div>
  );
};

export default BookingDashboard;