"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Phone, CreditCard, Clock } from "lucide-react"

interface Booking {
  _id: string;
  property: string;
  tenant: string;
  rentAmount: number;
}

interface Property {
  _id: string;
  owner: string;
}

interface Transaction {
  _id: string;
  amount: number;
  createdAt: string;
  status: string;
}

const PaymentComponent = () => {
  const { id } = useParams() // Changed from next/navigation to react-router-dom
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [booking, setBooking] = useState<Booking | null>(null)
  const [property, setProperty] = useState<Property | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  const tenantID = getCookie("tenantID");
  
  // Fetch booking and property data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch booking data - corrected endpoint
        const bookingResponse = await fetch(`http://localhost:8888/booking/bookingid/${id}`)
        if (!bookingResponse.ok) throw new Error('Failed to fetch booking data')
        const bookingData = await bookingResponse.json()
        setBooking(bookingData)

        // Fetch property data
        const propertyResponse = await fetch(`http://localhost:8888/property/find/${bookingData.property}`)
        if (!propertyResponse.ok) throw new Error('Failed to fetch property data')
        const propertyData = await propertyResponse.json()
        setProperty(propertyData)

        console.log(tenantID)

        // Fetch transaction history - corrected endpoint
        const transactionsResponse = await fetch(`http://localhost:8888/payment/tenant/${tenantID}`)
        if (transactionsResponse.ok) {
          const transactionData = await transactionsResponse.json()
          setTransactions(transactionData.data || [])
        }

      } catch (err: any) { // Added type annotation
        setError(err.message)
        console.error('Error fetching data:', err)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id]) // Changed dependency from params.id to id

  const handlePayment = async () => {
    if (!booking || !property || !phoneNumber) {
      setError("Missing required information")
      return
    }

    try {
      const paymentData = {
        bookingId: booking._id,
        tenantId: booking.tenant, // Fix: Was "tenant"
        ownerId: property.owner,
        amount: booking.rentAmount,
        status: "pending",
        phone: phoneNumber, // Fix: Changed from "phoneNumber" to "phone"
      };
      

      const response = await fetch('http://localhost:8888/payment/create', { // Added /create endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Payment failed')
      }

      const result = await response.json()

      console.log(tenantID)

      
      // Refresh transaction history
      const updatedTransactionsResponse = await fetch(`http://localhost:8888/payment/tenant/${tenantID}`)
      if (updatedTransactionsResponse.ok) {
        const updatedTransactionData = await updatedTransactionsResponse.json()
        setTransactions(updatedTransactionData.data || [])
      }

      // Clear phone number after successful payment
      setPhoneNumber("")
      alert("Payment initiated successfully!")

    } catch (err: any) { // Added type annotation
      setError(err.message)
      console.error('Payment error:', err)
    }
  }

  if (isLoading) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>
  }

  if (error) {
    return <div className="container mx-auto p-4 text-center text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Payment Input Column */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Payment</h2>
            <p className="text-3xl font-semibold text-green-600 mt-2">
              {booking ? `${booking.rentAmount}rf` : '0rf'}
            </p>
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                id="phone"
                className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handlePayment}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!phoneNumber || !booking}
          >
            <CreditCard className="mr-2" size={20} />
            Pay Now
          </button>
        </div>

        {/* Transaction History Column */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Transaction History</h2>
          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <div key={transaction._id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center">
                    <Clock className="text-gray-400 mr-2" size={20} />
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-600">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`text-xs ${
                        transaction.status === 'completed' ? 'text-green-600' :
                        transaction.status === 'failed' ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-800">{transaction.amount}rf</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No transaction history available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentComponent