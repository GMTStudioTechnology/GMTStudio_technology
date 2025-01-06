import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import pic1 from '../assets/pic1.png';
import pic2 from '../assets/pic2.jpeg';
import pic3 from '../assets/pic3.jpeg';
import pic4 from "../assets/pic4.jpeg";
import pic5 from "../assets/pic5.jpeg";

interface CardData {
  category: string;
  title: string;
  src: string;
}

const data: CardData[] = [
  {
    category: "Artificial Intelligence",
    title: "Developing cutting-edge AI tools for everyone",
    src: pic1,
  },
  {
    category: "Innovation Technology",
    title: "Creating mind-blowing tech to enhance your life",
    src: pic2,
  },
  {
    category: "Product Development",
    title: "Crafting products that simplify your daily routine",
    src: pic3,
  },
  {
    category: "User Experience",
    title: "Designing intuitive interfaces for seamless interaction",
    src: pic4,
  },
  {
    category: "Sustainability",
    title: "Innovating for a greener, more sustainable future",
    src: pic5,
  },
];



const Card: React.FC<{ card: CardData; index: number }> = React.memo(({ card, index }) => {
  const controls = useAnimation();

  const handleHoverStart = useCallback(() => {
    controls.start({ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } });
  }, [controls]);

  const handleHoverEnd = useCallback(() => {
    controls.start({ scale: 1, transition: { duration: 0.3, ease: "easeOut" } });
  }, [controls]);

  return (
    <motion.div
      className="relative flex-shrink-0 w-80 h-96 mx-3 rounded-2xl overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover="hover"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      <motion.div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${card.src})` }}
        animate={controls}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-0 p-6 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <p className="text-sm font-medium mb-2 text-gray-200">{card.category}</p>
        <h3 className="text-2xl font-bold leading-tight">{card.title}</h3>
      </motion.div>
    </motion.div>
  );
});

const InfiniteCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const scrollSpeed = 0.5;

  const extendedData = useMemo(() => [...data, ...data, ...data], []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
    setAutoScrollEnabled(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setTimeout(() => setAutoScrollEnabled(true), 1000);
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    
    const element = scrollRef.current;
    const scrollWidth = element.scrollWidth / 3;
    
    if (element.scrollLeft >= scrollWidth * 2) {
      element.scrollLeft = scrollWidth;
    } else if (element.scrollLeft <= 0) {
      element.scrollLeft = scrollWidth;
    }
  }, []);

  useEffect(() => {
    if (!scrollRef.current || !autoScrollEnabled || isHovered || isDragging) return;

    let animationFrameId: number;
    
    const animate = () => {
      if (scrollRef.current) {
        const element = scrollRef.current;
        const maxScroll = element.scrollWidth / 3;
        
        element.scrollLeft += scrollSpeed;
        
        if (element.scrollLeft >= maxScroll * 2) {
          element.scrollLeft = maxScroll;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [autoScrollEnabled, isHovered, isDragging, scrollSpeed]);

  return (
    <div 
      className="relative w-full overflow-hidden mb-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseUp();
      }}
    >
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll scrollbar-hide py-8 "
        style={{ 
          scrollBehavior: isDragging ? 'auto' : 'smooth',
          cursor: isDragging ? 'grabbing' : 'grab',
          WebkitOverflowScrolling: 'touch',
        }}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="flex space-x-4 pl-4">
          {extendedData.map((card, index) => (
            <Card key={`${index}-${card.title}`} card={card} index={index} />
          ))}
        </div>
      </div>
      
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none" />
    </div>
  );
};

const GMTStudioCarousel: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <main>
        <div className="w-full py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl font-bold mb-12 text-center"
            >
              Discover What's Possible at GMTStudio
            </motion.h2>
            <InfiniteCarousel />

          </div>
        </div>
      </main>
    </div>
  );
};

export default GMTStudioCarousel;