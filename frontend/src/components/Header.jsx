import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    closeMobileMenu();
    navigate('/');
  };

  const handleProtectedLinkClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      if (window.confirm('Please login to access this page. Go to login page?')) {
        navigate('/login');
      }
    }
    closeMobileMenu();
  };

  return (
    <header className="navbar bg-white shadow-sm px-4 sm:px-6 lg:px-8">
      {/* Mobile menu button and logo */}
      <div className="navbar-start">
        <div className="dropdown">
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
            className="btn btn-ghost lg:hidden"
            onClick={toggleMobileMenu}
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 border border-gray-100 ${mobileMenuOpen ? 'block' : 'hidden'}`}
          >
            <li>
              <Link
                to="/"
                className="text-gray-700 hover:bg-[#FFEDED]"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="text-gray-700 hover:bg-[#FFEDED]"
                onClick={closeMobileMenu}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-700 hover:bg-[#FFEDED]"
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="text-gray-700 hover:bg-[#FFEDED]"
                onClick={handleProtectedLinkClick}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/tasks"
                className="text-gray-700 hover:bg-[#FFEDED]"
                onClick={handleProtectedLinkClick}
              >
                My Tasks
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-gray-700 hover:bg-[#FFEDED]"
                onClick={handleProtectedLinkClick}
              >
                Profile
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:bg-[#FFEDED] text-left w-full"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:bg-[#FFEDED]"
                    onClick={closeMobileMenu}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-gray-700 hover:bg-[#FFEDED]"
                    onClick={closeMobileMenu}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className="text-2xl font-bold ml-2">
          <span className="text-black">Task</span>
          <span className="text-[#AC2898]">Trail</span>
        </Link>
      </div>

      {/* Desktop navigation - Always visible */}
      <div className=" lg:flex flex justify-center">
        <ul className="flex space-x-10">
          <li>
            <Link
              to="/"
              className="text-gray-700 hover:bg-[#FFEDED] rounded-lg px-3 py-2"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/features"
              className="text-gray-700 hover:bg-[#FFEDED] rounded-lg px-3 py-2"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              to="/AboutUs"
              className="text-gray-700 hover:bg-[#FFEDED] rounded-lg px-3 py-2"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="text-gray-700 hover:bg-[#FFEDED] rounded-lg px-3 py-2"
              onClick={handleProtectedLinkClick}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/taskspage"
              className="text-gray-700 hover:bg-[#FFEDED] rounded-lg px-3 py-2"
              onClick={handleProtectedLinkClick}
            >
              Tasks
            </Link>
          </li>
          <li>
            <Link
              to="/UserProfile"
              className="text-black hover:bg-[#FFEDED] rounded-lg px-3 py-2"
              onClick={handleProtectedLinkClick}
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* Auth buttons */}
      <div className="navbar-end gap-2">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="btn bg-[#FFEDED] text-[#AC2898] hover:bg-[#f5e0e0] border-none"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="btn bg-[#AC2898] text-white hover:bg-[#921f7a] border-none"
            >
              Login
            </Link>
            <Link
              to="/login"
              className="btn btn-outline text-[#AC2898] hover:bg-[#FFEDED] border-[#AC2898]"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;