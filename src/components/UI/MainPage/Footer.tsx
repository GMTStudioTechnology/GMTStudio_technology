"use client";
import { useState, useRef } from 'react';
import { Instagram, Github, Twitter, Linkedin, ExternalLink, Code } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.3 });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const socialIcons = [
    { icon: <Github className="w-5 h-5" />, name: 'GitHub', href: 'https://github.com' },
    { icon: <Twitter className="w-5 h-5" />, name: 'Twitter', href: 'https://twitter.com' },
    { icon: <Instagram className="w-5 h-5" />, name: 'Instagram', href: 'https://instagram.com' },
    { icon: <Linkedin className="w-5 h-5" />, name: 'LinkedIn', href: 'https://linkedin.com' }
  ];

  const quickLinks = [
    { name: 'About Us', href: '/aboutus' },
    { name: 'Projects', href: '/projects' },
    { name: 'Online Tools', href: '/onlinetools' },
    { name: 'Blog', href: 'https://gmt-studio-blog.vercel.app/' },
  ];

  const resourceLinks = [
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Paper Trading', href: 'https://paper-trading-simulator.vercel.app/' },
    { name: 'Community', href: '#' },
  ];

  return (
    <footer ref={footerRef} className="bg-black text-white relative overflow-hidden">
      <div className="absolute w-full h-px top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
      
      {/* Background blur effects */}
      <div className="absolute -z-10 w-96 h-96 rounded-full blur-[150px] bg-blue-900/20 top-0 -left-48"></div>
      <div className="absolute -z-10 w-96 h-96 rounded-full blur-[150px] bg-purple-900/20 bottom-0 -right-48"></div>
      
      <motion.div 
        className="max-w-7xl mx-auto px-4 py-16 relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-6 lg:col-span-4">
            <div className="flex items-center space-x-2">
              <Code className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                GMTStudio
              </h3>
            </div>
            <p className="text-gray-400 max-w-md">
              Building innovative technology solutions that bridge the gap between imagination and reality.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6 lg:col-span-2">
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-white inline-flex items-center space-x-1 group"
                    whileHover={{ x: 3 }}
                  >
                    <span>{link.name}</span>
                    <span className="inline-block w-0 h-0 group-hover:w-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants} className="space-y-6 lg:col-span-2">
            <h4 className="text-lg font-semibold">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-gray-400 hover:text-white inline-flex items-center space-x-1 group"
                    whileHover={{ x: 3 }}
                  >
                    <span>{link.name}</span>
                    <span className="inline-block w-0 h-0 group-hover:w-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-6 lg:col-span-4">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-gray-400">
              Subscribe to our newsletter to receive updates about new products, features, and technology news.
            </p>
            <form onSubmit={handleSubmit} className="relative">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div 
                    key="input" 
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2"
                  >
                    <motion.input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="flex-1 px-4 py-3 bg-white/5 rounded-full border border-white/10 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm backdrop-blur-sm transition-all duration-300"
                      whileFocus={{ scale: 1.01 }}
                      required
                    />
                    <motion.button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 rounded-full transition-all duration-300 whitespace-nowrap"
                      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Subscribe
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-green-500/20 border border-green-500/30 rounded-full p-3 text-center text-green-400"
                  >
                    <p className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Thank you for subscribing!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          variants={itemVariants}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p 
              className="text-sm text-gray-400"
              variants={itemVariants}
            >
              © {new Date().getFullYear()} GMTStudio Technology. All rights reserved.
            </motion.p>
            <div className="flex gap-6 text-sm text-gray-400">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="hover:text-white relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-blue-500 group-hover:w-full transition-all duration-300" />
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