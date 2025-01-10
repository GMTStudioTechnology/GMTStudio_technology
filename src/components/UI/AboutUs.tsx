import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Import images
import launch2025 from "../../components/assets/pic1.png";
import WebsiteDEV from "../../components/assets/MazsAI.png";
import Found from "../../components/assets/ThinkLink.png";
import Navbar from "./Navigation_bar";
interface TimelineEntry {
  title: string;
  date?: string;
  category?: string;
  content: React.ReactNode;
}

const data: TimelineEntry[] = [
  {
    title: "2024 Q1",
    date: "January 2024",
    category: "Founded in 2024",
    content: (
      <div className="space-y-6">
        <img 
          src={Found}
          alt="Founding Phase" 
          className="rounded-lg w-full object-cover"
        />
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg">
            <h4 className="font-bold mb-4">what we have done</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <span className="text-blue-500">▪</span>
                <span>Design the ThinkLink platform</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500">▪</span>
                <span>train an artificial intelligence model </span>
              </li>
            </ul>
          </div>
          
          <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg">
            <h4 className="font-bold mb-4">founder of GMTStudio</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Founder one</span>
                <span className="font-bold">Alston Chang</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Founder Two</span>
                <span className="font-bold">Lucas Yeh</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Founder Three</span>
                <span className="font-bold">Willy Lin</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2024 Q3",
    date: "September 2024",
    category: "Official website version one launched ",
    content: (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <img 
              src={WebsiteDEV}
              alt="Official website launched" 
              className="rounded-lg w-full object-cover"
            />
          </div>
          <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg">
            <h4 className="font-bold mb-4">Team Expansion</h4>
            <ul className="space-y-3 text-sm">
              <li>find few more team members </li>

              <li></li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-lg">
          <h4 className="font-bold mb-4">Technical Milestones</h4>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Mazs AI v1.5 design",
                metrics: "Training a better AI model",
                icon: "💻"
              },
              {
                title: "ThinkLink UI update",
                metrics: "React JS with Tailwind",
                icon: "🖱️"
              },
              {
                title: "Few little game design",
                metrics: "Design some game for fun",
                icon: "🎮"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-neutral-800 p-4 rounded-lg">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-bold mb-1">{item.title}</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">{item.metrics}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },

  {
    title: "2025 Q1",
    date: "January 2024",
    category: "official website design v2",
    content: (
      <div className="space-y-6">
        <img 
          src={launch2025}
          alt="2024 Launch" 
          className="rounded-lg w-full object-cover"
        />
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2">Redesign the official website</h4>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm leading-relaxed">
            We are trying to redesign our official website due to the fact that the old one is not fully user-friendly, and the UI is not that good, so we decided to remake it.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "expect release date", value: "2025 July 1st" },
            { label: "deploy on ", value: "Vercel" },
          ].map((stat, index) => (
            <div key={index} className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-sm">
              <div className="font-bold text-xl mb-1">{stat.value}</div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg">
          <h4 className="font-bold mb-4">Q1 2025 </h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Remake all service website</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>keep updating AI model</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Develop more tools for better user experience </span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },  
];

export const Timeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div>
    <Navbar/>
    <div className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10 mt-12" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          <div className="max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-black dark:text-white">
            About US
          </h2>
          <p className="text-white text-xl leading-relaxed">
            We are a bunch of student who want to enhance the user experience quality to perfect, and we also want to make some games and software to improve the whole industry.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <div className="hidden md:block md:pl-20">
                <h3 className="text-4xl font-bold text-neutral-500 dark:text-neutral-500">
                  {item.title}
                </h3>
                {item.date && (
                  <p className="text-sm text-neutral-400 mt-1">{item.date}</p>
                )}
                {item.category && (
                  <span className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm mt-2">
                    {item.category}
                  </span>
                )}
              </div>
            </div>
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <div className="md:hidden mb-6">
                <h3 className="text-2xl font-bold text-neutral-500 dark:text-neutral-500">
                  {item.title}
                </h3>
                {item.date && (
                  <p className="text-sm text-neutral-400 mt-1">{item.date}</p>
                )}
                {item.category && (
                  <span className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-sm mt-2">
                    {item.category}
                  </span>
                  
                )}
              </div>
                
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Timeline;