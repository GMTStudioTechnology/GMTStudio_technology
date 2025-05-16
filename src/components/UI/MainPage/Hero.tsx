import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, useAnimation, } from 'framer-motion';
import pic1 from "../../assets/pic1.png"
import pic2 from "../../assets/pic2.jpeg";
import pic3 from "../../assets/pic3.jpeg";
import pic4 from "../../assets/pic4.jpeg";
import pic5 from "../../assets/pic5.jpeg";

const TextGenerateEffect: React.FC<{ text: string }> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 30);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text]);

    return (
        <motion.div 
            className="font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {displayedText}
        </motion.div>
    );
};

const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <motion.span
            className="relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
            }}
        >
            <span className="relative z-10">
                {children}
            </span>
            <motion.span
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg -z-10"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.6,
                    delay: 0.7,
                    ease: "easeOut"
                }}
            />
        </motion.span>
    );
};

interface CardData {
    category: string;
    title: React.ReactNode;
    src: string;
    link?: string;
}

const data: CardData[] = [
    {
        category: "Artificial Intelligence",
        title: "Developing cutting-edge AI tools for everyone",
        src: pic1,
        link: "/projects"
    },
    {
        category: "Innovation Technology",
        title: "Creating mind-blowing tech to enhance your life",
        src: pic2,
        link: "/projects"
    },
    {
        category: "Product Development",
        title: "Crafting products that simplify your daily routine",
        src: pic3,
        link: "/projects"
    },
    {
        category: "User Experience",
        title: "Designing intuitive interfaces for seamless interaction",
        src: pic4,
        link: "/projects"
    },
    {
        category: "Sustainability",
        title: "Innovating for a greener, more sustainable future",
        src: pic5,
        link: "/aboutus"
    },
];

const Card: React.FC<{ card: CardData; index: number }> = React.memo(({ card, index }) => {
    const controls = useAnimation();
    const [isHovered, setIsHovered] = useState(false);

    const handleHoverStart = useCallback(() => {
        setIsHovered(true);
        controls.start({ scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } });
    }, [controls]);

    const handleHoverEnd = useCallback(() => {
        setIsHovered(false);
        controls.start({ scale: 1, transition: { duration: 0.3, ease: "easeOut" } });
    }, [controls]);

    const handleClick = useCallback(() => {
        if (card.link) {
            window.location.href = card.link;
        }
    }, [card.link]);

    return (
        <motion.div
            className="relative flex-shrink-0 w-[340px] h-[450px] mx-4 rounded-3xl overflow-hidden cursor-pointer group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            whileHover="hover"
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            onClick={handleClick}
        >
            <motion.div
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${card.src})` }}
                animate={controls}
            />
            
            <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: isHovered ? 0.7 : 0.5 }}
                transition={{ duration: 0.3 }}
            />
            
            <motion.div
                className="absolute bottom-0 p-8 text-white transform transition-transform duration-300 group-hover:translate-y-[-8px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <motion.p 
                    className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-blue-500/30 text-blue-300 border border-blue-400/30"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    {card.category}
                </motion.p>
                <h3 className="text-3xl font-bold leading-tight mb-3">{card.title}</h3>
                
                <motion.div 
                    className="flex items-center text-blue-400 text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ x: -20 }}
                    animate={{ x: isHovered ? 0 : -20 }}
                >
                    <span>Learn more</span>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </motion.div>
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
            className="relative w-full overflow-hidden mb-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                handleMouseUp();
            }}
        >
            <div
                ref={scrollRef}
                className="flex overflow-x-scroll scrollbar-hide py-8"
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
                        <Card key={`${index}-${card.category}`} card={card} index={index % data.length} />
                    ))}
                </div>
            </div>

            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent pointer-events-none" />
            
            <div className="flex justify-center mt-6 space-x-2">
                {data.map((_, i) => (
                    <motion.button
                        key={i}
                        className="w-2 h-2 rounded-full bg-gray-600"
                        whileHover={{ scale: 1.5, backgroundColor: "#6366f1" }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    />
                ))}
            </div>
        </div>
    );
};

const GMTStudioCarousel: React.FC = () => {
    return (
        <div className="pt-1 bg-black text-white pb-32 overflow-hidden">
            <main>
                <div className="w-full">
                    <div className="max-w-8xl mx-auto px-4">
                        <motion.div 
                            className="text-7xl font-bold mb-16 text-center flex flex-col items-center gap-3"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="relative">
                                <TextGenerateEffect text="Discover What's Possible in" />
                                <motion.div
                                    className="absolute -z-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                    style={{ top: '-50%', left: '20%' }}
                                />
                            </div>
                            <Highlight>
                                <motion.span
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    GMTStudio
                                </motion.span>
                            </Highlight>
                            
                            <motion.p 
                                className="text-lg text-gray-400 max-w-2xl mt-6 font-normal"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.5 }}
                            >
                                Exploring the frontiers of technology to create meaningful experiences and innovative solutions
                            </motion.p>
                            
                            <motion.div 
                                className="flex space-x-4 mt-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 1.8 }}
                            >
                                <motion.a 
                                    href="/projects" 
                                    className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Explore Projects
                                </motion.a>
                                <motion.a 
                                    href="/aboutus" 
                                    className="px-6 py-3 rounded-full border border-indigo-400/30 text-white text-lg font-medium hover:bg-indigo-500/10 transition-all duration-300"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    About Us
                                </motion.a>
                            </motion.div>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <InfiniteCarousel />
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default GMTStudioCarousel;