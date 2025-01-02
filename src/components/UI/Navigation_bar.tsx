import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import {
  House,
  CircleInfo,
  Server,
  Envelope
} from '@gravity-ui/icons';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const navigation = [
    { name: "Home", href: "#", icon: <House className="w-5 h-5" /> },
    { name: "About", href: "#", icon: <CircleInfo className="w-5 h-5" /> },
    { name: "Services", href: "#", icon: <Server className="w-5 h-5" /> },
    { name: "Contact", href: "#", icon: <Envelope className="w-5 h-5" /> },
  ];

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white backdrop-blur-lg shadow-lg"
          : "bg-white backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Enhanced Logo Section */}
          <motion.div 
            className="flex-shrink-0 flex items-center"
            whileHover={{ scale: 1.00 }}
          >
            <div className="flex items-center space-x-2">
              <img
              src="../public/assets/Gicon.png"
              alt="GMTStudio Logo"
              className="h-12 w-12 rounded-full"
              />
            </div>
          </motion.div>

          {/* Enhanced Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                className="group flex items-center space-x-1 text-black hover:text-indigo-600 transition-all duration-300"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="relative">
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </span>
              </motion.a>
            ))}
          </div>

          {/* Enhanced Search Section */}
          <div className="hidden md:flex md:items-center">
            <motion.div 
              className="relative"
              animate={{ width: searchFocused ? 600 : 300 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder="Search..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full px-4 py-2.5 rounded-full border border-black bg-white text-black transition-all duration-300"
              />
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 }
              }}
            >
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <Transition
        show={isMobileMenuOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="-translate-y-full opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="-translate-y-full opacity-0"
      >
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ x: 6 }}
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-base font-medium transition"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </motion.a>
            ))}
            {/* Mobile Search */}
            <div className="mt-3 px-3">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </Transition>
    </motion.nav>
  );
};

export default Navbar;
