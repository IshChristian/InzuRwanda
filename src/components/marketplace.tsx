import { useState } from "react";
import { BeakerIcon } from "@heroicons/react/24/solid";

const marketplace = () => {
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

        {/* {describe isoko} */}
        <div className="carousel w-full mt-16">
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
              className="w-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide4" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
              className="w-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide3" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide3" className="carousel-item relative w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
              className="w-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide4" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide4" className="carousel-item relative w-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
              className="w-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Title Section */}
          <div className="title mb-4">
            <h2 className="text-2xl font-black text-primary ml-3">
              BERWA PLAZA
            </h2>
            <h3 className="text-gray-600 font-sans flex items-center ml-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <i>Kigali, Kicukiro - Gatega</i>
            </h3>
          </div>

          {/* Stats Section */}
          <div className="stats shadow-lg w-full grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="stat place-items-center text-center">
              <div className="stat-title">PRICE</div>
              <div className="stat-value">31K</div>
            </div>

            <div className="stat place-items-center text-center">
              <div className="stat-title">BEDROOMS</div>
              <div className="stat-value text-secondary">4</div>
            </div>

            <div className="stat place-items-center text-center">
              <div className="stat-title">BATHROOMS</div>
              <div className="stat-value">4</div>
            </div>

            <div className="stat place-items-center text-center">
              <div className="stat-title">INTERIOR</div>
              <div className="stat-value">1,200</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full flex justify-between mb-6">
            <div className="flex space-x-5">
              <div className="share flex items-center space-x-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
                <p>Share</p>
              </div>
              <div className="save flex items-center space-x-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <p>Save</p>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="property-details flex flex-col md:flex-row gap-6 mb-6">
              <div className="flex-1 p-4">
                <div className="block">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis inventore rerum veniam. Nulla, molestiae dignissimos
                aut saepe facere libero voluptatum.
                </div>
                <div className="flex justify-center items-center m-5">
                  <div className="btn btn-primary btn-block">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
 Request
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4 shadow-lg">
                <div className="stats stats-vertical shadow w-full">
                  <div className="stat">
                    <div className="stat-title">PROPERTY TYPE</div>
                    <div className="stat-value">Single Family Homes</div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">STATUS</div>
                    <div className="stat-value">Available</div>
                  </div>

                  <div className="stat">
                    <div className="stat-title">YEAR BUILT</div>
                    <div className="stat-value">2023</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="map-container w-full h-96 md:h-[500px] bg-gray-200">
    {/* <!-- Embed your map here, such as Google Maps or Leaflet.js --> */}
    <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345096197!2d144.9559283155042!3d-37.8172099797517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577fd4f2261759!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1620353711869!5m2!1sen!2sau"
        width="100"
        height="100"
        allowFullScreen
        aria-hidden="false"
        tabIndex={0}
        className="rounded-lg shadow-lg border-0"
    >
    </iframe>
</div>

        </div>
      </div>
    // </div>
  );
};

export default marketplace;
