import { useState } from "react";
import isoko from "../include/isoko";
import { Link } from "react-router-dom";
const Home = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [sortOption, setSortOption] = useState("newest");

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="flex">
      {/* Vertical Navbar for large screens */}
      <div className="hidden lg:flex flex-col w-64 h-screen bg-base-100 p-4 shadow-lg fixed z-10">
        <h2 className="text-xl font-bold mb-6">My Dashboard</h2>
        <ul className="space-y-4">
          <ul className="menu bg-base-200 lg:menu-horizontal rounded-box">
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Inbox
                <span className="badge badge-sm">99+</span>
              </a>
            </li>
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Updates
                <span className="badge badge-sm badge-warning">NEW</span>
              </a>
            </li>
            <li>
              <a>
                Stats
                <span className="badge badge-xs badge-info"></span>
              </a>
            </li>
          </ul>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 z-0">
        {/* Fixed Horizontal Navbar for smaller screens */}
        <div className="navbar bg-base-100 shadow-md fixed top-0 left-0 right-0 z-20">
          <div className="navbar-start">
            <div className="dropdown lg:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu bg-base-200 dropdown-content z-[1] mt-3 w-52 p-2 shadow lg:hidden"
              >
                <li>
                  <a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    Inbox
                    <span className="badge badge-sm">99+</span>
                  </a>
                </li>
                <li>
                  <a>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Updates
                    <span className="badge badge-sm badge-warning">NEW</span>
                  </a>
                </li>
                <li>
                  <a>
                    Stats
                    <span className="badge badge-xs badge-info"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-start">
            <h3 className="font-black text-primary font-serif">
              isoko<span className="text-info">iwacu</span>
            </h3>
          </div>
          <div className="navbar-end flex items-center space-x-4">
            {/* Search Bar - toggle visibility */}
            <div className="flex items-center">
              {searchVisible && (
                <input
                  type="text"
                  placeholder="Search..."
                  className="input input-bordered w-64"
                />
              )}
              <button
                onClick={toggleSearch}
                className="btn btn-ghost btn-circle ml-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Notification Button */}
            <div className="relative">
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="p-4 bg-gray-300 rounded-full m-5 flex justify-between items-center mt-16">
          <h2 className="text-lg font-bold">Filter</h2>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="select select-bordered"
          >
            <option value="newest">all: category</option>
            <option value="oldest">Rent</option>
            <option value="oldest">Sell</option>
            <option value="oldest">Sale</option>
          </select>
        </div>

        {/* Cards Section */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isoko.map((iseta) => (
            <div key={iseta.id} className="card bg-base-100 w-50 shadow-xl">
              <figure>
                <div className="carousel carousel-end rounded-box">
                  <div className="carousel-item">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
                      alt="Drink"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
                      alt="Drink"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                      alt="Drink"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                      alt="Drink"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
                      alt="Drink"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                      alt="Drink"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                      alt="Drink"
                    />
                  </div>
                </div>
              </figure>
              <div className="card-body">
                <div className="card-title">
                  <h3 className="font-semibold">{iseta.title}</h3>
                  <h2 className="font-semibold top-10 items-end text-right">
                    ${iseta.cost}/per month
                  </h2>
                </div>
                <div className="card-ha flex gap-2">
                  <div className="badge bg-primary p-2 rounded-lg">
                    <p className="text-white">Rent</p>
                  </div>
                  <div className="badge bg-success p-2 rounded-lg">
                    <p className="text-white">House</p>
                  </div>
                </div>
                <div className="card-location flex flex-row space-x-1">
                  <p className="font-bold">
                    {iseta.bathrooms} <span>Bth</span>
                  </p>
                  <span>|</span>
                  <p className="font-bold">
                    {iseta.bedroom} <span>Bd</span>
                  </p>
                  <span>|</span>
                  <p className="font-bold">
                    {iseta.floors} <span>flr</span>
                  </p>
                </div>
                <p className="font-bold">{iseta.location}</p>
                <div className="card-actions justify-end">
                  <Link to="/marketplace" className="btn btn-primary">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
