import React, { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import pic1 from "../assets/pic1.png";
import pic2 from "../assets/pic2.jpeg";
import pic3 from "../assets/pic3.jpeg";
import pic4 from "../assets/pic4.jpeg";
import pic5 from "../assets/pic5.jpeg";
import {
  Paperclip,
  File,
  PencilToLine,
  ChevronRight,
  ArrowShapeTurnUpRight,
  Heart,
  Trolley
} from "@gravity-ui/icons";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
  selectedFilter: string;
}

interface BentoGridItemProps {
  title: string;
  description: string;
  header: ReactNode;
  icon: ReactNode;
  className?: string;
  tags?: string[];
  link?: string;
}

const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '', selectedFilter }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const itemTags = child.props.tags || [];
          const isVisible = selectedFilter === 'all' || itemTags.includes(selectedFilter);
          
          return (
            <motion.div
              initial={false}
              animate={{
                scale: isVisible ? 1 : 0.8,
                opacity: isVisible ? 1 : 0,
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut"
              }}
              style={{
                display: isVisible ? "block" : "none",
              }}
            >
              {child}
            </motion.div>
          );
        }
        return null;
      })}
    </div>
  );
};

const BentoGridItem: React.FC<BentoGridItemProps> = ({
  title,
  description,
  header,
  icon,
  className = '',
  tags = [],
  link
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));

  return (
    <div
      className={`
        group relative overflow-hidden
        p-6 rounded-2xl
        bg-black
        border border-white/50
        hover:border-white
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-xl bg-gray-800 border border-gray-700 group-hover:border-gray-600 transition-colors">
          <div className="text-white">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white tracking-tight">
          {title}
        </h3>
      </div>

      <p className="text-gray-400 text-base leading-relaxed mb-6">
        {description}
      </p>

      <div className="relative mb-4">
        {header}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setIsLiked(!isLiked);
              setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
            }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <Heart
              className={`h-5 w-5 ${isLiked ? 'text-red-500 fill-red-500' : ''}`}
            />
            <span>{likeCount}</span>
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <ArrowShapeTurnUpRight className="h-5 w-5" />
          </button>
        </div>

        {link && (
          <a
            href={link}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            Learn More
            <ChevronRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const filters = ['all', 'AI', 'software', 'platform', 'under constructuction'];

  const items = [
    {
      title: "Mazs AI",
      description: "The Natural language processing based Artificial intelligence",
      header: <img src={pic1} alt="Mazs AI" className="w-full h-48 object-cover rounded-xl" />,
      icon: <Paperclip className="h-6 w-6" />,
      tags: ['AI'],
      link: "#AI"
    },
    {
      title: "ThinkLink",
      description: "The multimodel AI-powered platform contains personal assistants, which can set the timer, create to do list, and so on.",
      header: <img src={pic2} alt="ThinkLink" className="w-full h-48 object-cover rounded-xl" />,
      icon: <File className="h-6 w-6" />,
      tags: ["Software"],
      link: "#Software"
    },
    {
      title: "GMT OS",
      description: "The next generation of operating system.",
      header: <img src={pic3} alt="GMTOS - alpha" className="w-full h-48 object-cover rounded-xl" />,
      icon: <PencilToLine className="h-6 w-6" />,
      tags: ["platform"],
      link: "#platform"
    },
    {
      title: "(´;ω;`) under construction",
      description: "⚠️ under construction ⚠️ under construction ⚠️ under construction ⚠️",
      header: <img src={pic4} alt="The Power of Communication" className="w-full h-48 object-cover rounded-xl" />,
      icon: <Trolley className="h-6 w-6" />,
      tags: ["under construction"],
      link: "#under-construction"
    },
    {
      title: "ヾ(･∀･`) under construction",
      description: "⚠️ under construction ⚠️ under construction ⚠️",
      header: <img src={pic5} alt="The Pursuit of Knowledge" className="w-full h-48 object-cover rounded-xl" />,
      icon: <Trolley className="h-6 w-6" />,
      tags: ["under construction"],
      link: "#under-construction"
    }
  ];

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="space-y-8 max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-3 justify-center">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium
                transition-colors duration-200
                ${selectedFilter === filter
                  ? 'bg-white text-black'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white'
                }
              `}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        <BentoGrid selectedFilter={selectedFilter}>
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              {...item}
              className={i === 3 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

export default Projects;