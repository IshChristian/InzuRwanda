"use client"

import { useState } from "react"
import { Phone, CreditCard, Clock } from "lucide-react"

const PaymentComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const defaultAmount = 100 // Default amount in dollars

  // Mock transaction history data
  const transactions = [
    { id: 1, amount: 50, date: "2023-04-01" },
    { id: 2, amount: 75, date: "2023-03-28" },
    { id: 3, amount: 120, date: "2023-03-25" },
  ]

  const handlePayment = () => {
    // Implement payment logic here
    console.log(`Processing payment of $${defaultAmount} for ${phoneNumber}`)
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Payment Input Column */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Payment</h2>
            <p className="text-3xl font-semibold text-green-600 mt-2">${defaultAmount}</p>
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
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          >
            <CreditCard className="mr-2" size={20} />
            Pay Now
          </button>
        </div>

        {/* Transaction History Column */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Transaction History</h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center">
                  <Clock className="text-gray-400 mr-2" size={20} />
                  <span className="text-sm text-gray-600">{transaction.date}</span>
                </div>
                <span className="font-semibold text-gray-800">{transaction.amount}rf</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentComponent

