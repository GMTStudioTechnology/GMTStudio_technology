import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    
    if (autoplay) {
      interval = window.setInterval(handleNext, 15000);
    }
    
    return () => {
      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [autoplay, handleNext]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <section className="w-full relative z-0 pb-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center text-white mb-16 relative z-10">Products</h1>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="relative h-[500px] w-full" style={{ zIndex: 1 }}>
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.src}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      rotate: randomRotateY(),
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      rotate: isActive(index) ? 0 : randomRotateY(),
                      zIndex: isActive(index) ? 2 : 1,
                      y: isActive(index) ? [0, -80, 0] : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      rotate: randomRotateY(),
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0"
                    style={{
                      transform: `perspective(1000px)`,
                    }}
                  >
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      draggable={false}
                      className="h-full w-full rounded-3xl object-cover object-center"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex flex-col justify-between h-full py-6 relative z-10">
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
                <h3 className="text-3xl font-bold text-white">
                  {testimonials[active].name}
                </h3>
                <p className="text-base text-neutral-500">
                  {testimonials[active].designation}
                </p>
                <motion.p className="text-xl text-neutral-300 mt-10">
                  {testimonials[active].quote.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{
                        filter: "blur(10px)",
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
              </motion.div>

              <div className="flex gap-6 mt-8">
                <button
                  onClick={handlePrev}
                  className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center group/button hover:bg-neutral-700 transition-colors"
                >
                  <ArrowLeft className="h-6 w-6 text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
                </button>
                <button
                  onClick={handleNext}
                  className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center group/button hover:bg-neutral-700 transition-colors"
                >
                  <ArrowRight className="h-6 w-6 text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
                </button>
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
      quote: "The Natural language processing based Artificial intelligence, which is capable of understanding and generating human language. The model ( Mazs AI - anatra v1.0 ) is still in trainning phase. ",
      name: "Mazs AI",
      designation: "Artificial intelligence",
      src: MazsAI,
    },
    {
      quote: "The multimodel AI-powered platform contains personal assistants. This software is designed to help user to make their life easier. For instance, the AI inside ( Mazs AI - ThinkLink v1 ) will help you create a to do task when you input a natural language sentence, it will summarize the words and create title, date, and description for you.",
      name: "ThinkLink",
      designation: "Software",
      src: ThinkLink,
    },
    {
      quote: "The next generation of operating system. I don't know what to say about this, it is now in development.",
      name: "GMTOS",
      designation: "Operating system",
      src: pic3,
    },
    {
      quote: "This project is still a empty shell, we are trying our best to squeeze the maxium of our brain to figure it out what to put here...",
      name: "(´;ω;`) under construction",
      designation: "Still under construction",
      src: pic4,
    },
    {
      quote: "This project is still a empty shell, we are trying our best to squeeze the maxium of our brain to figure it out what to put here...",
      name: "ヾ(･∀･`) under construction",
      designation: "Still under construction",
      src: pic5,
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} autoplay={true} />;
};

export default Products;