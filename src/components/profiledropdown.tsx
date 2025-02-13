import React, { useState } from "react"
import { Link } from "react-router-dom"
import { User, Settings, LogOut, Key, Mail, FileText, Shield, XCircle } from "lucide-react"

const ProfileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-8 w-8 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors duration-200"
      >
        <User className="h-4 w-4 text-zinc-500" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-zinc-900">John Doe</p>
            <p className="text-xs text-zinc-500">john@example.com</p>
          </div>
          <div className="border-t border-zinc-200">
            <Link to="/profile" className="flex w-full items-center px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
            <Link to="/booking" className="flex w-full items-center px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100">
              <FileText className="mr-2 h-4 w-4" />
              Rent/Booking
            </Link>
        <Link to="/message" className="flex w-full items-center px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100">
              <Mail className="mr-2 h-4 w-4" />
              Messages
            </Link><hr className="m-3" />
            <Link to="/change-password" className="flex w-full items-center px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100">
              <Key className="mr-2 h-4 w-4" />
              Change Password
            </Link><hr className="m-3" />
            <Link to="/legal-policy" className="flex w-full items-center px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100">
              <Shield className="mr-2 h-4 w-4" />
              Legal & Policy
            </Link>
            <Link to="/terms-conditions" className="flex w-full items-center px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100">
              <FileText className="mr-2 h-4 w-4" />
              Terms & Conditions
            </Link><hr className="m-3" />
            <Link to="/account-deactivated" className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-zinc-100">
              <XCircle className="mr-2 h-4 w-4" />
              Account Deactivated
            </Link>
            <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-zinc-100">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileMenu
