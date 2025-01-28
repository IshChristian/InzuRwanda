import React, { useState, useEffect } from "react"
import {
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Search,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Bell,
} from "lucide-react"

// Mock data for demonstration
const mockBookings = [
  {
    id: "B001",
    guestName: "John Doe",
    guestContact: "+250 781234567",
    guestEmail: "john@example.com",
    propertyName: "Kigali Villa",
    location: "Kigali",
    checkIn: "2023-07-01",
    checkOut: "2023-07-05",
    status: "Confirmed",
    amount: 500,
  },
  {
    id: "B002",
    guestName: "Jane Smith",
    guestContact: "+250 789876543",
    guestEmail: "jane@example.com",
    propertyName: "Gisenyi Beach House",
    location: "Gisenyi",
    checkIn: "2023-07-10",
    checkOut: "2023-07-15",
    status: "Pending",
    amount: 750,
  },
  // Add more mock data as needed
]

const BookingOverview = ({ bookings }) => {
  const totalBookings = bookings.length
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length
  const confirmedBookings = bookings.filter((b) => b.status === "Confirmed").length
  const completedBookings = bookings.filter((b) => b.status === "Completed").length
  const totalRevenue = bookings.reduce((sum, b) => sum + b.amount, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      <OverviewCard title="Total Bookings" value={totalBookings} icon={<Calendar className="h-6 w-6" />} />
      <OverviewCard title="Pending" value={pendingBookings} icon={<Clock className="h-6 w-6" />} />
      <OverviewCard title="Confirmed" value={confirmedBookings} icon={<CheckCircle className="h-6 w-6" />} />
      <OverviewCard title="Completed" value={completedBookings} icon={<Check className="h-6 w-6" />} />
      <OverviewCard title="Total Revenue" value={`$${totalRevenue}`} icon={<DollarSign className="h-6 w-6" />} />
    </div>
  )
}

const OverviewCard = ({ title, value, icon }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
    <div className="text-blue-500">{icon}</div>
  </div>
)

const SearchBar = ({ onSearch }) => (
  <div className="mb-4 relative">
    <input
      type="text"
      placeholder="Search by Booking ID, Guest Name, or Status"
      className="w-full p-2 pl-10 border border-gray-300 rounded-md"
      onChange={(e) => onSearch(e.target.value)}
    />
    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
  </div>
)

const BookingTable = ({ bookings, onApprove, onCancel, onReminder }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">Booking ID</th>
          <th className="px-4 py-2 text-left">Guest Name</th>
          <th className="px-4 py-2 text-left">Contact Details</th>
          <th className="px-4 py-2 text-left">Property</th>
          <th className="px-4 py-2 text-left">Check-in</th>
          <th className="px-4 py-2 text-left">Check-out</th>
          <th className="px-4 py-2 text-left">Status</th>
          <th className="px-4 py-2 text-left">Amount</th>
          <th className="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.id} className="border-b">
            <td className="px-4 py-2">{booking.id}</td>
            <td className="px-4 py-2">{booking.guestName}</td>
            <td className="px-4 py-2">
              <div>{booking.guestContact}</div>
              <div>{booking.guestEmail}</div>
            </td>
            <td className="px-4 py-2">
              <div>{booking.propertyName}</div>
              <div className="text-sm text-gray-500">{booking.location}</div>
            </td>
            <td className="px-4 py-2">{booking.checkIn}</td>
            <td className="px-4 py-2">{booking.checkOut}</td>
            <td className="px-4 py-2">
              <StatusBadge status={booking.status} />
            </td>
            <td className="px-4 py-2">${booking.amount}</td>
            <td className="px-4 py-2">
              <div className="flex space-x-2">
                {booking.status === "Pending" && (
                  <button onClick={() => onApprove(booking.id)} className="p-1 bg-green-500 text-white rounded-md">
                    <Check className="h-4 w-4" />
                  </button>
                )}
                <button onClick={() => onCancel(booking.id)} className="p-1 bg-red-500 text-white rounded-md">
                  <X className="h-4 w-4" />
                </button>
                <button onClick={() => onReminder(booking.id)} className="p-1 bg-yellow-500 text-white rounded-md">
                  <Bell className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800"
      case "Confirmed":
        return "bg-green-200 text-green-800"
      case "Canceled":
        return "bg-red-200 text-red-800"
      case "Completed":
        return "bg-blue-200 text-blue-800"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  return <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>{status}</span>
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
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
)

const BookingDashboard = () => {
  const [bookings, setBookings] = useState(mockBookings)
  const [filteredBookings, setFilteredBookings] = useState(mockBookings)
  const [currentPage, setCurrentPage] = useState(1)
  const bookingsPerPage = 10

  const handleSearch = (searchTerm) => {
    const filtered = mockBookings.filter(
      (booking) =>
        booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.status.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredBookings(filtered)
    setCurrentPage(1)
  }

  const handleApprove = (id) => {
    // Implement approve logic
    console.log(`Approving booking ${id}`)
  }

  const handleCancel = (id) => {
    // Implement cancel logic
    console.log(`Canceling booking ${id}`)
  }

  const handleReminder = (id) => {
    // Implement reminder logic
    console.log(`Sending reminder for booking ${id}`)
  }

  const indexOfLastBooking = currentPage * bookingsPerPage
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking)
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Booking</h1>
      <BookingOverview bookings={bookings} />
      <SearchBar onSearch={handleSearch} />
      <BookingTable
        bookings={currentBookings}
        onApprove={handleApprove}
        onCancel={handleCancel}
        onReminder={handleReminder}
      />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  )
}

export default BookingDashboard

