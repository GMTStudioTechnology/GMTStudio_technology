import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from '@gravity-ui/icons';
import MazsAI from "../../assets/MazsAI.png";
import ThinkLink from "../../assets/ThinkLink.png"
import pic3 from "../../assets/pic3.jpeg";
import pic4 from "../../assets/pic4.jpeg";
import pic5 from "../../assets/pic5.jpeg";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  link?: string;
  features?: string[];
};

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
}

export const AnimatedTestimonials: React.FC<AnimatedTestimonialsProps> = ({
  testimonials,
  autoplay = false,
}) => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    let interval: number | undefined;
    
    if (autoplay && isInView) {
      interval = window.setInterval(handleNext, 8000);
    }
    
    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [autoplay, handleNext, isInView]);

  const handleDotClick = (index: number) => {
    setActive(index);
  };

  return (
    <section ref={sectionRef} className="w-full relative z-0 pb-20 pt-16 overflow-hidden">
      <motion.div 
        className="absolute -z-10 w-96 h-96 rounded-full blur-[120px] opacity-20 bg-blue-600"
        style={{ top: '20%', left: '-10%' }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
        }}
      />
      
      <motion.div 
        className="absolute -z-10 w-96 h-96 rounded-full blur-[120px] opacity-20 bg-purple-600"
        style={{ bottom: '10%', right: '-10%' }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut",
          delay: 5,
        }}
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="inline-block text-sm font-medium tracking-wider px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full mb-4">
            FEATURED PRODUCTS
          </h2>
          <h1 className="text-5xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Innovative Solutions
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
            Explore our cutting-edge technologies designed to transform the way you interact with the digital world
          </p>
        </motion.div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="relative h-[450px] w-full md:col-span-6 lg:col-span-5" style={{ zIndex: 1 }}>
              <AnimatePresence mode="wait">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      y: 30,
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0,
                      scale: isActive(index) ? 1 : 0.95,
                      y: isActive(index) ? 0 : 30,
                      zIndex: isActive(index) ? 2 : 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      y: -30,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                    }}
                    className={`absolute inset-0 ${isActive(index) ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  >
                    <div className="relative w-full h-full rounded-3xl overflow-hidden group">
                      <img
                        src={testimonial.src}
                        alt={testimonial.name}
                        draggable={false}
                        className="h-full w-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                      
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 p-6 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-300 mt-1">{testimonial.designation}</p>
                        
                        {testimonial.link && (
                          <motion.a
                            href={testimonial.link}
                            className="inline-flex items-center mt-4 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                            whileHover={{ x: 4 }}
                          >
                            Learn more
                            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </motion.a>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex flex-col justify-between md:col-span-6 lg:col-span-7 relative z-10">
              <motion.div
                key={active}
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: -20,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.75,
                  ease: "easeInOut",
                }}
                className="flex-grow"
              >
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {testimonials[active].name}
                </h3>
                <p className="text-base text-blue-300 bg-blue-500/10 inline-block px-3 py-1 rounded-full mt-2">
                  {testimonials[active].designation}
                </p>
                <motion.p className="text-xl text-gray-300 mt-8 leading-relaxed">
                  {testimonials[active].quote.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{
                        filter: "blur(5px)",
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "easeInOut",
                        delay: 0.02 * index,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
                
                {testimonials[active].features && (
                  <motion.div 
                    className="mt-8 space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h4 className="text-lg font-semibold text-white">Key Features:</h4>
                    <ul className="space-y-2">
                      {testimonials[active].features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + (idx * 0.1) }}
                        >
                          <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>

              <div className="flex flex-col space-y-4 mt-10">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDotClick(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          idx === active ? "bg-blue-400 w-8" : "bg-gray-600 hover:bg-gray-500"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <motion.button
                      onClick={handlePrev}
                      className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowLeft className="h-5 w-5 text-blue-400" />
                    </motion.button>
                    <motion.button
                      onClick={handleNext}
                      className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowRight className="h-5 w-5 text-blue-400" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Products: React.FC = () => {
  const testimonials = [
    {
      quote: "An advanced natural language processing AI capable of understanding and generating human-like text. Mazs AI combines cutting-edge machine learning with sophisticated language models to deliver intelligent responses across various domains.",
      name: "Mazs AI",
      designation: "Natural Language Processing",
      src: MazsAI,
      link: "/projects",
      features: [
        "Advanced semantic understanding and generation",
        "Multi-language support with context awareness",
        "Continuous learning and improvement capabilities",
        "Seamless integration with existing applications"
      ]
    },
    {
      quote: "ThinkLink is an AI-powered productivity assistant designed to streamline your workflow. It automatically organizes your tasks, creates structured to-do lists from natural language input, and helps you stay on top of your priorities.",
      name: "ThinkLink",
      designation: "Productivity Assistant",
      src: ThinkLink,
      link: "/projects",
      features: [
        "Natural language task processing",
        "Intelligent categorization and prioritization",
        "Calendar integration and smart reminders",
        "Collaborative project management features"
      ]
    },
    {
      quote: "GMTOS represents the next generation of operating systems, built from the ground up with user experience, security, and performance in mind. Our innovative approach combines powerful functionality with intuitive design.",
      name: "GMTOS",
      designation: "Operating System",
      src: pic3,
      link: "/projects",
      features: [
        "Revolutionary user interface design",
        "Advanced security architecture",
        "Resource-efficient performance optimization",
        "Seamless cross-device synchronization"
      ]
    },
    {
      quote: "Our paper trading simulator provides a risk-free environment to practice investment strategies using real-time market data. Perfect for both beginners learning the basics and experienced traders testing advanced strategies.",
      name: "Trading Simulator",
      designation: "Financial Technology",
      src: pic4,
      link: "https://paper-trading-simulator.vercel.app/",
      features: [
        "Real-time market data simulation",
        "Comprehensive portfolio analytics",
        "Strategy backtesting capabilities",
        "Educational resources for investors"
      ]
    },
    {
      quote: "Our research lab is constantly exploring new technologies and innovative solutions across various domains. This upcoming project aims to push the boundaries of what's possible in the digital space.",
      name: "Coming Soon",
      designation: "Research & Development",
      src: pic5,
      features: [
        "Cutting-edge technology exploration",
        "User-centered design approach",
        "Cross-platform compatibility",
        "Continuous iteration based on feedback"
      ]
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
};

export default Products;