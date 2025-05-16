"use client";

import { useRef, FC, ReactNode, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface IntroProps {
  text: string;
  className?: string;
}

const Intro: FC<IntroProps> = ({ text, className = "" }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      handleResize();
      window.addEventListener("resize", handleResize);
      
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMobile ? undefined : targetRef,
  });

  const words = text.split(" ");

  return (
    <div
      ref={!isMobile ? targetRef : null}
      className={`relative z-0 h-[120vh] ${className}`}
    >
      <div className="sticky top-0 mx-auto flex h-screen max-w-6xl items-center justify-center bg-transparent px-4 py-12 md:py-16 lg:py-24">
        <motion.div 
          className="relative w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="absolute -z-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl top-0 -left-32"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <motion.div 
            className="absolute -z-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl bottom-0 -right-32"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2
            }}
          />
          
          <p className="flex flex-wrap justify-center p-5 text-4xl font-bold md:p-8 md:text-5xl lg:p-10 lg:text-6xl xl:text-7xl">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word
                  key={i}
                  progress={scrollYProgress}
                  range={[start, end]}
                >
                  {word}
                </Word>
              );
            })}
          </p>
          
          <motion.div 
            className="text-center mt-12 max-w-2xl mx-auto opacity-0"
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Our mission is to harness technology to create beautiful, functional products that improve people's lives.
            </p>
            
            <motion.div
              className="mt-8 inline-flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a 
                href="/projects" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/20 transition duration-300"
              >
                See What We Build
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transform transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const scale = useTransform(progress, range, [0.8, 1]);
  const y = useTransform(progress, range, [20, 0]);
  
  return (
    <motion.span className="relative mx-2 md:mx-3 inline-block">
      <span className="absolute opacity-10 text-gray-500">{children}</span>
      <motion.span
        style={{ opacity, scale, y }}
        className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
      >
        {children}
      </motion.span>
    </motion.span>
  );
};

export default Intro;
