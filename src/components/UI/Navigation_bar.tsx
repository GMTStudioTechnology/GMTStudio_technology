import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import {
  House,
  CircleInfo,
  Server,
  Envelope,
  Picture,
  Magnifier
} from '@gravity-ui/icons';
import GMTLogo from "../assets/Gicon.png"

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = [
    { name: "Home", href: "/preview", icon: <House className="w-5 h-5" /> },
    { name: "About Us", href: "/aboutus", icon: <Server className="w-5 h-5" /> },
    { name: "Projects", href: "/projects", icon: <CircleInfo className="w-5 h-5" /> },
    { name: "Online Tools", href: "/onlinetools", icon: <Envelope className="w-5 h-5" /> },
    { name: "News", href: "/news", icon: <Picture className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setSearchFocused(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50  ${
        isScrolled
          ? "bg-white backdrop-blur-lg shadow-lg"
          : "bg-white backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <motion.div 
            className="flex-shrink-0 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="/preview" className="flex items-center space-x-2">
              <img
                src={GMTLogo}
                alt="GMTStudio Logo"
                className="h-12 w-12 rounded-full transition-transform duration-300"
              />
              <span className="font-bold text-xl text-black hidden sm:block">
                GMTStudio
              </span>
            </a>
          </motion.div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center space-x-2 text-black hover:text-indigo-600 transition-all duration-300"
              >
                <span className="text-lg group-hover:text-indigo-600 transition-colors">
                  {item.icon}
                </span>
                <span className="relative font-medium">
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </span>
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex md:items-center">
            <motion.form 
              onSubmit={handleSearch}
              className="relative"
              animate={{ width: searchFocused ? '400px' : '300px' }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="w-full px-4 py-2 rounded-full border-2   bg-white text-black placeholder-black outline-none transition-all duration-300"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-indigo-600 transition-colors"
              >
                <Magnifier className="w-5 h-5" />
              </motion.button>
            </motion.form>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-black hover:bg-white focus:outline-none"
            aria-label="Toggle mobile menu"
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
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.div>
          </motion.button>
        </div>
      </div>

      <Transition
        show={isMobileMenuOpen}
        enter="transition ease-out duration-200 transform"
        enterFrom="-translate-y-full opacity-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition ease-in duration-150 transform"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="-translate-y-full opacity-0"
      >
        <div className="md:hidden bg-white/95 backdrop-blur-lg shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-indigo-500 bg-white/90 text-gray-800 placeholder-gray-500 outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                >
                  <Magnifier className="w-5 h-5" />
                </button>
              </div>
            </form>
            
            {navigation.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-all duration-200"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </Transition>
    </motion.nav>
  );
};

export default Navbar;