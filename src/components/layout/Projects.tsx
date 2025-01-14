import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import MazsAI from "../assets/MazsAI.png";
import ThinkLink from "../assets/ThinkLink.png";
import Navbar from "./Navigation_bar";
import Video from "../assets/A.mov";
import Video2 from "../assets/B.mov"
import Vol from "./VelocityScroll"
interface ProjectSectionProps {
  title: string;
  description: string;
  image: string;
  link: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
  features?: string[];
  category?: string;
  video?: string;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  title,
  description,
  image,
  link,
  subtitle,
  backgroundColor = "white",
  textColor = "black",
  features,
  category,
  video,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center overflow-hidden py-32"
      style={{ 
        backgroundColor,
        padding: "8rem max(22px, env(safe-area-inset-left))",
      }}
    >
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.div
          className="text-center mb-16"
          style={{ color: textColor }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {category && (
            <span
              className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-6"
              style={{
                backgroundColor: textColor === 'black' ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.1)',
                color: textColor,
              }}
            >
              {category}
            </span>
          )}
          {subtitle && (
            <p className="text-xl font-semibold mb-4 tracking-wide opacity-80">
              {subtitle}
            </p>
          )}
          <h2 className="text-7xl font-bold mb-6 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-2xl mx-auto leading-relaxed max-w-3xl opacity-90">
            {description}
          </p>
          
          {features && (
            <div className="flex justify-center gap-8 mt-8 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-lg font-medium opacity-80">{feature}</span>
                </motion.div>
              ))}
            </div>
          )}

          <motion.a
            href={link}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="inline-flex items-center mt-8 text-xl font-semibold 
                     transition-all duration-300 group"
            style={{
              color: "#2997FF",
            }}
          >
            Learn more
            <motion.span
              className="ml-2 group-hover:ml-3 transition-all duration-300"
              animate={{ x: isHovered ? 5 : 0 }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>

        <motion.div
          className="relative px-8 md:px-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div 
            className="aspect-w-16 aspect-h-9 rounded-3xl overflow-hidden 
                      shadow-2xl transition-all duration-500"
            style={{
              transform: isHovered ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {video ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  src={video}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                  style={{ 
                    maxHeight: '65vh',
                    filter: backgroundColor === "#000000" ? "brightness(1.1)" : "none"
                  }}
                />
                <button
                  onClick={handleVideoToggle}
                  className="absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-full"
                >
                  {isPlaying ? "Pause" : "Play"}
                </button>
              </div>
            ) : (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                style={{ 
                  maxHeight: '65vh',
                  filter: backgroundColor === "#000000" ? "brightness(1.1)" : "none"
                }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "MazsAI",
      subtitle: "Intelligent • Powerful • Revolutionary",
      description: "Experience the next generation of artificial intelligence with groundbreaking features.",
      image: MazsAI,
      link: "https://example.com/mazsai",
      backgroundColor: "#000000",
      textColor: "white",
      category: "Artificial Intelligence",
      features: ["Neural Processing", "Advanced ML", "Real-time Analysis"],
      video: Video,
    },
    {
      title: "ThinkLink",
      subtitle: "Connect • Collaborate • Create",
      description: "A revolutionary platform for seamless team collaboration and project management.",
      image: ThinkLink,
      link: "https://example.com/thinklink",
      backgroundColor: "#f5f5f7",
      textColor: "black",
      category: "Productivity",
      features: ["Real-time Sync", "Smart Workflows", "Team Analytics"],
      video:Video2
    }
  ];

  return (
    <div className="relative">
      <Navbar />
      {projects.map((project, index) => (
        <ProjectSection key={index} {...project} />
      ))}
    <Vol className="bg-black pb-8">
      GMTStudio • Mazs AI • ThinkLink
    </Vol>
    </div>
  );
};

export default Projects;