import React, { useState } from "react"
import { useLocation, Link } from "react-router-dom"
import { MapPin, Map, Building2, Home, Hotel, Building } from "lucide-react"
import LanguageSelector from "./language"
import ProfileMenu from "./profiledropdown"

const Navbar: React.FC = () => {
  const { pathname } = useLocation()
  const [location, setLocation] = useState("")
  const [city, setCity] = useState("")

  return (
    <nav className="top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          {/* Top Section */}
          <div className="flex items-center justify-between h-16">
            <div className="flex-1 flex items-center">
              <Link
                to="/"
                className="text-2xl font-medium text-blue-800 hover:text-zinc-600 transition-colors duration-200"
              >
                LiveAtRwanda
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <LanguageSelector />
              <ProfileMenu />
            </div>
          </div>

          {/* Bottom Section - Only show on homepage */}
          {pathname === "/" && (
            <div className="flex justify-between items-center py-2 border-t">
              {/* Left side - Map icons */}
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer">
                  <MapPin className="h-5 w-5" />
                  <input
              type="text"
              placeholder="address"
              className="input input-bordered w-full max-w-xs"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
                </button>
                <button className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer">
                  <Map className="h-5 w-5" />
                  <input
              type="text"
              placeholder="city"
              className="input input-bordered w-full max-w-xs"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
                </button>
              </div>

              {/* Right side - Accommodation types */}
              <div className="flex items-center gap-6">
                <button className="flex flex-col items-center gap-1 text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer">
                  <Home className="h-5 w-5" />
                  <span className="text-xs">House</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer">
                  <Building2 className="h-5 w-5" />
                  <span className="text-xs">Apartment</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer">
                  <Building className="h-5 w-5" />
                  <span className="text-xs">Guest House</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer">
                  <Hotel className="h-5 w-5" />
                  <span className="text-xs">Hotel</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar