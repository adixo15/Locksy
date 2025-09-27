import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#89dfb4] text-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-2xl sm:text-3xl font-extrabold tracking-widest font-mono text-gray-800">
          LOCK<span className="text-gray-800">SY</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-medium">
          <a
            href="#home"
            className="transition-all duration-300 hover:font-bold hover:scale-105"
          >
            Home
          </a>
          <a
            href="#about"
            className="transition-all duration-300 hover:font-bold hover:scale-105"
          >
            About
          </a>
          <a
            href="#contact"
            className="transition-all duration-300 hover:font-bold hover:scale-110"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#89dfb4] px-4 py-2 space-y-2">
          <a
            href="#home"
            className="block transition-all duration-300 hover:font-bold hover:scale-105"
          >
            Home
          </a>
          <a
            href="#about"
            className="block transition-all duration-300 hover:font-bold hover:scale-105"
          >
            About
          </a>
          <a
            href="#contact"
            className="block transition-all duration-300 hover:font-bold hover:scale-110"
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
