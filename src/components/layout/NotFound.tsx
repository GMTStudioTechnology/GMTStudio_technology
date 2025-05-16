import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navigation_bar';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-4xl w-full">
          <div className="relative">
            {/* Background animations */}
            <div className="absolute -z-10 w-64 h-64 rounded-full blur-[100px] bg-blue-900/30 -top-10 -left-10"></div>
            <div className="absolute -z-10 w-64 h-64 rounded-full blur-[100px] bg-purple-900/20 bottom-10 -right-10"></div>
            
            <div className="text-center py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-block mb-8"
              >
                <div className="relative">
                  <div className="text-[180px] font-bold leading-none tracking-tighter">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                      404
                    </span>
                  </div>
                  <motion.div 
                    className="absolute -bottom-5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  />
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-4xl font-bold text-white mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Page Not Found
              </motion.h1>
              
              <motion.p 
                className="text-gray-400 text-lg max-w-xl mx-auto mb-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <motion.button
                  onClick={() => navigate('/')}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Return Home
                </motion.button>
                
                <motion.button
                  onClick={() => navigate(-1)}
                  className="px-6 py-3 rounded-full border border-gray-700 text-gray-300 font-medium hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Go Back
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 