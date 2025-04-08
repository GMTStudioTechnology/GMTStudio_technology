import { useState } from "react";
import Gate from "../assets/Gate_E-13.png";
import Navbar from "../../components/layout/Navigation_bar";

const GateE13 = () => {
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Header with glow effect */}
      <div className="bg-black border-b border-gray-800 py-4 sticky top-0 z-50 shadow-lg">
        <Navbar />
        <div className="container mx-auto px-4 pt-16">
          <div className="flex justify-between items-center">
            <div className="md:hidden">
              <button 
                className="text-xl p-2" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-b border-gray-800 py-4 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="hover:text-green-400 transition-colors duration-300">Store</a>
              <a href="#" className="hover:text-green-400 transition-colors duration-300">Community</a>
              <a href="#" className="hover:text-green-400 transition-colors duration-300">About</a>
              <a href="#" className="hover:text-green-400 transition-colors duration-300">Support</a>
            </div>
          </div>
        </div>
      )}

      {/* Game Title and Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Column - Game Media */}
          <div className="md:w-2/3">
            <h1 className="text-5xl font-bold mb-2 text-green-400">GATE E-13</h1>
            <p className="text-xl mb-6 text-gray-400 tracking-wider">A PSYCHOLOGICAL HORROR WALKING SIMULATOR</p>
            
            {/* Main Game Image with hover effect */}
            <div className="relative mb-6 bg-black overflow-hidden rounded-lg shadow-2xl border border-gray-800 group">
              <img 
                src={Gate}
                alt="GATE E-13 gameplay" 
                className="w-full h-auto object-cover transition-transform duration-700 ease-in-out transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                <div className="p-6 w-full">
                  <div className="flex justify-between items-center">
                    <button className="bg-green-600 hover:bg-green-500 text-white py-3 px-8 rounded-sm font-medium transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg flex items-center space-x-2">
                      <span>Play Now</span>
                      <span className="ml-2">▶</span>
                    </button>
                    <div className="bg-black/70 py-1 px-4 rounded-sm border border-gray-700">
                      <span className="text-white">Release: April 7, 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* About Game */}
            <div className="bg-gray-900 p-8 rounded-lg mb-10 border border-gray-800 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-green-400 mr-2">►</span> About This Game
              </h2>
              <div className={`space-y-5 ${showMoreDescription ? '' : 'max-h-48 overflow-hidden relative'}`}>
                <p className="leading-relaxed">
                  GATE E-13 is a psychological horror walking simulator that challenges your perception and tests your observation skills. Navigate through an eerily empty airport terminal where something isn't quite right.
                </p>
                <p className="leading-relaxed">
                  The rules are simple, yet the execution is unnerving:
                </p>
                <ul className="space-y-3 ml-6">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span><strong>Walk</strong> - Move forward through the looping terminal.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span><strong>Observe</strong> - Look for environmental inconsistencies (anomalies).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span><strong>Decide</strong> - If an anomaly is detected, turn back. Otherwise, proceed.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span><strong>Progress</strong> - Correct choices advance you 1 gate. Make 8 correct choices to reach Gate E-13.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span><strong>Fail</strong> - Wrong choice resets you to Gate E-0.</span>
                  </li>
                </ul>
                <p className="leading-relaxed">
                  As you progress through each gate, the environment becomes increasingly unsettling. What starts as subtle environmental changes grows into something much more sinister. Can you reach Gate E-13, or will you be trapped in this liminal space forever?
                </p>
                <p className="leading-relaxed">
                  Featuring atmospheric sound design, minimalist visuals, and a tension-building pace, GATE E-13 creates an experience that will have you questioning your own perception and second-guessing every decision.
                </p>
                {!showMoreDescription && (
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-900 to-transparent"></div>
                )}
              </div>
              <button 
                onClick={() => setShowMoreDescription(!showMoreDescription)}
                className="mt-4 text-green-400 hover:text-green-300 transition-colors duration-300 flex items-center"
              >
                {showMoreDescription ? "Show Less" : "Read More"}
                <span className="ml-1">{showMoreDescription ? "▲" : "▼"}</span>
              </button>
            </div>
            
            {/* System Requirements */}
            <div className="bg-gray-900 p-8 rounded-lg mb-10 border border-gray-800 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-green-400 mr-2">►</span> System Requirements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-semibold mb-4 text-green-400">Minimum:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-gray-400 w-24">OS:</span>
                      <span>Windows 10</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 w-24">Processor:</span>
                      <span>Intel Core i3 / AMD Ryzen 3</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 w-24">Memory:</span>
                      <span>4 GB RAM</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 w-24">Graphics:</span>
                      <span>NVIDIA GTX 650 / AMD Radeon HD 7750</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 w-24">Storage:</span>
                      <span>2 GB available space</span>
                    </li>
                  </ul>
                </div>
                <div className="border-l-2 border-gray-700 pl-6">
                  <h3 className="text-xl font-semibold mb-4 text-green-400">Recommended:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-gray-400 w-24">OS:</span>
                      <span>Windows 10/11</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 w-24">Processor:</span>
                      <span>Intel Core i5 / AMD Ryzen 5</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 w-24">Memory:</span>
                      <span>8 GB RAM</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 w-24">Graphics:</span>
                      <span>NVIDIA GTX 1060 / AMD RX 580</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-gray-400 w-24">Storage:</span>
                      <span>2 GB available space (SSD recommended)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Game Info */}
          <div className="md:w-1/3">
            <div className="bg-gray-900 p-6 rounded-lg mb-8 border border-gray-800 shadow-xl sticky top-24">
              <div className="mb-6 overflow-hidden rounded-md border border-gray-800">
                <img 
                  src={Gate}
                  alt="GATE E-13" 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="mb-6 p-4 bg-black border border-gray-800 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">$19.99</span>
                  <span className="line-through text-gray-500">$24.99</span>
                </div>
                <div className="text-green-500 text-sm mb-4">20% OFF - Pre-Release Discount</div>
                <button className="w-full bg-green-600 hover:bg-green-500 text-white py-3 px-6 rounded-sm font-medium mb-3 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg">
                  Add to Cart
                </button>
                <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-sm font-medium mb-6 transition-colors duration-300 border border-gray-700">
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    Add to Wishlist
                  </span>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Developer:</span>
                  <a href="#" className="text-green-400 hover:text-green-300 transition-colors">GMTSTUDIO</a>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Publisher:</span>
                  <a href="#" className="text-green-400 hover:text-green-300 transition-colors">GMTSTUDIO</a>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-800">
                  <span className="text-gray-400">Release Date:</span>
                  <span>2026(?</span>
                </div>
                <div className="pt-4">
                  <span className="text-gray-400 block mb-3">Tags:</span>
                  <div className="flex flex-wrap gap-2">
                    <a href="#" className="bg-black hover:bg-gray-800 text-sm py-1 px-3 rounded-sm border border-gray-800 hover:border-green-500 transition-colors">Psychological Horror</a>
                    <a href="#" className="bg-black hover:bg-gray-800 text-sm py-1 px-3 rounded-sm border border-gray-800 hover:border-green-500 transition-colors">Walking Simulator</a>
                    <a href="#" className="bg-black hover:bg-gray-800 text-sm py-1 px-3 rounded-sm border border-gray-800 hover:border-green-500 transition-colors">Atmospheric</a>
                    <a href="#" className="bg-black hover:bg-gray-800 text-sm py-1 px-3 rounded-sm border border-gray-800 hover:border-green-500 transition-colors">First-Person</a>
                    <a href="#" className="bg-black hover:bg-gray-800 text-sm py-1 px-3 rounded-sm border border-gray-800 hover:border-green-500 transition-colors">Horror</a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Features */}
            <div className="bg-gray-900 p-6 rounded-lg mb-8 border border-gray-800 shadow-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-green-400 mr-2">►</span> Features
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start rounded-sm p-2 hover:bg-black/50 transition-colors">
                  <div className="text-green-400 mr-3 text-lg">✓</div>
                  <div>Atmospheric horror experience</div>
                </li>
                <li className="flex items-start rounded-sm p-2 hover:bg-black/50 transition-colors">
                  <div className="text-green-400 mr-3 text-lg">✓</div>
                  <div>Minimalist gameplay focused on perception</div>
                </li>
                <li className="flex items-start rounded-sm p-2 hover:bg-black/50 transition-colors">
                  <div className="text-green-400 mr-3 text-lg">✓</div>
                  <div>Immersive sound design</div>
                </li>
                <li className="flex items-start rounded-sm p-2 hover:bg-black/50 transition-colors">
                  <div className="text-green-400 mr-3 text-lg">✓</div>
                  <div>Multiple endings based on your choices</div>
                </li>
                <li className="flex items-start rounded-sm p-2 hover:bg-black/50 transition-colors">
                  <div className="text-green-400 mr-3 text-lg">✓</div>
                  <div>Approximately 2-3 hours of gameplay</div>
                </li>
              </ul>
            </div>
            
            {/* Reviews */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 shadow-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-green-400 mr-2">►</span> Reviews
              </h3>
              <div className="flex items-center mb-4 p-3 bg-black/50 rounded-md">
                <div className="text-2xl font-bold text-green-400 mr-3">Very Positive</div>
                <div className="text-gray-400 text-sm">(94% of 523 reviews)</div>
              </div>
              <div className="space-y-4">
                <div className="border-l-2 border-gray-700 pl-4 py-2">
                  <div className="flex justify-between mb-2">
                    <div className="font-semibold">Terrifyingly Simple</div>
                    <div className="text-green-400">👍</div>
                  </div>
                  <p className="text-sm text-white italic">
                    "A masterclass in minimalist horror. The tension builds with each step forward, and the sound design had me on edge the entire time."
                  </p>
                </div>
                <div className="border-l-2 border-gray-700 pl-4 py-2">
                  <div className="flex justify-between mb-2">
                    <div className="font-semibold">Perception Test</div>
                    <div className="text-green-400">👍</div>
                  </div>
                  <p className="text-sm text-white italic">
                    "This game challenges your observation skills like no other. What seems like a simple concept becomes increasingly complex as you progress."
                  </p>
                </div>
              </div>
              <a href="#" className="block text-center text-green-400 hover:text-green-300 transition-colors mt-5 p-2 border border-gray-800 rounded-sm hover:bg-black/50">
                Read all reviews
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default GateE13;