"use client";
import { useState } from 'react';
import {  Instagram, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [, setIsHovered] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const socialIcons = [

    { icon: <Instagram className="w-5 h-5" />, name: 'Instagram' }
  ];

  const quickLinks = ['AboutUs'];

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <motion.div 
        className="max-w-6xl mx-auto px-4 py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              GMTStudio
            </h3>
            <div className="flex space-x-6">
              {socialIcons.map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className="hover:text-blue-400 transition-all duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-x-12 gap-y-4">
            {quickLinks.map((item) => (
              <motion.a
                key={item}
                href="/aboutus"
                className="text-gray-300 hover:text-white relative group"
                onHoverStart={() => setIsHovered(item)}
                onHoverEnd={() => setIsHovered('')}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Subscribe to newsletter"
                className="flex-1 px-4 py-3 bg-white/5 rounded-xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm backdrop-blur-sm transition-all duration-300"
                whileFocus={{ scale: 1.02 }}
                required
              />
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="pt-6 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <motion.p 
              className="text-sm text-gray-400"
              variants={itemVariants}
            >
              © {new Date().getFullYear()} GMTStudio
            </motion.p>
            <div className="flex gap-6 text-sm text-gray-400">
              {['Privacy', 'Terms'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="hover:text-white relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;