import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import SearchComponent from "./searchcomponenet";
import DictionaryApp from "./DictionaryApp";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Hamburger and Close Icons
import DarkModeToggle from "./DarkModeToggle"; // Import the DarkModeToggle component

type HeaderProps = {
  showGetStarted?: boolean; // Optional prop to control button rendering
};

// Modal component
const Modal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-3xl text-[#d42755] font-medium text-center mb-4">
          Law Dictionary
        </h2>
        <DictionaryApp />
      </div>
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ showGetStarted = true }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-4 shadow-md bg-stone-100">
      <div className="container mx-auto flex justify-between items-center px-4 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} className="h-12 w-auto" alt="Logo" />
            <span className="text-3xl text-gray-900 font-bold tracking-tight">KYR</span>
          </Link>
        </div>

        {/* Hamburger icon for mobile */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-gray-900">
            {isMenuOpen ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
          </button>
        </div>

        {/* Navigation links for larger screens */}
        <div className="hidden lg:flex items-center space-x-6">
          <SearchComponent />
          <button
            onClick={handleOpenModal}
            className="px-6 py-3 bg-[#d42755] text-xl text-white font-semibold rounded-lg shadow-md hover:bg-[#b51d48] transition duration-300 flex items-center"
          >
            Dictionary
          </button>
          
          {showGetStarted ? (
            <Link
              to="/get-started"
              className="px-6 py-3 bg-[#d42755] text-xl text-white font-semibold rounded-lg shadow-md hover:bg-[#b51d48] transition duration-300"
            >
              Get Started
            </Link>
          ) : (
            <Link
              to="/"
              className="px-6 py-3 bg-[#d42755] text-xl text-white font-semibold rounded-lg shadow-md hover:bg-[#b51d48] transition duration-300"
            >
              Home
            </Link>
          )}
          <DarkModeToggle />
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-md z-50 p-4 rounded-lg">
            <div className="flex justify-center mb-4">
              <SearchComponent />
            </div>
            <button
              onClick={handleOpenModal}
              className="block w-full mb-4 px-6 py-3 bg-[#d42755] text-xl text-white font-semibold rounded-lg shadow-md hover:bg-[#b51d48] transition duration-300 text-center"
            >
              Dictionary
            </button>
            {showGetStarted ? (
              <Link
                to="/get-started"
                className="block w-full mb-4 px-6 py-3 bg-[#d42755] text-xl text-white font-semibold rounded-lg shadow-md hover:bg-[#b51d48] transition duration-300 text-center"
              >
                Get Started
              </Link>
            ) : (
              <Link
                to="/"
                className="block w-full mb-4 px-6 py-3 bg-[#d42755] text-xl text-white font-semibold rounded-lg shadow-md hover:bg-[#b51d48] transition duration-300 text-center"
              >
                Home
              </Link>
            )}
            <DarkModeToggle />
          </div>
        )}
      </div>

      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </header>
  );
};

export default Header;
