import React, { useState } from "react";
import { Outlet, NavLink, Navigate, useLocation, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Force login/signup if not logged in and trying to access a protected route
  if (!isLoggedIn && !["/login", "/signup"].includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col font-inter bg-brand-bg text-brand-text">
      {/* Navbar */}
      <header className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-color-brand-primary">
            JobSpy
          </h1>

          {/* Nav links */}
          <nav className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm md:text-base font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition hover:text-emerald-700 ${isActive ? "text-emerald-700 font-semibold" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/upload"
              className={({ isActive }) =>
                `transition hover:text-emerald-700 ${isActive ? "text-emerald-700 font-semibold" : ""}`
              }
            >
              Upload Resume
            </NavLink>
            <NavLink
              to="/jds"
              className={({ isActive }) =>
                `transition hover:text-emerald-700 ${isActive ? "text-emerald-700 font-semibold" : ""}`
              }
            >
              Job Descriptions
            </NavLink>
            <NavLink
              to="/analytics"
              className={({ isActive }) =>
                `transition hover:text-emerald-700 ${isActive ? "text-emerald-700 font-semibold" : ""}`
              }
            >
              Analytics
            </NavLink>

            {/* Account Icon Dropdown */}
            {/* Account Icon Dropdown */}
<div className="relative">
  <button
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    className="flex items-center focus:outline-none hover:text-emerald-700"
  >
    <FaUserCircle size={24} />
  </button>

  {isMenuOpen && (
    <div className="absolute right-0 mt-2 w-36 bg-white text-black rounded-md shadow-lg">
      {!isLoggedIn ? (
        <>
          <Link
            to="/login"
            className="block px-4 py-2 hover:bg-gray-100 hover:text-emerald-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block px-4 py-2 hover:bg-gray-100 hover:text-emerald-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Signup
          </Link>
        </>
      ) : (
        <button
          className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-emerald-700"
          onClick={() => {
            setIsLoggedIn(false);
            setIsMenuOpen(false);
          }}
        >
          Logout
        </button>
      )}
    </div>
  )}
</div>

          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-6">
        <Outlet context={{ setIsLoggedIn }} />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 py-4 text-center text-sm text-brand-muted">
        © {new Date().getFullYear()} JobSpy
      </footer>
    </div>
  );
}

export default App;
