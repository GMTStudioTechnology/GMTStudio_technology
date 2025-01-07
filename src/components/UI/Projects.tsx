// Projects.tsx
import React, { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// Types
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
  isMobile?: boolean;
}

interface ImageProps {
  className?: string;
  alt?: string;
  src: string;
}

// BentoGrid Component
const BentoGrid: React.FC<BentoGridProps> = ({ children, className = '', selectedFilter }) => {
  return (
    <div className={`
      hidden lg:grid lg:grid-cols-3 gap-6 ${className} relative
      md:block
    `}>
      <AnimatePresence mode="sync">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            const itemTags = child.props.tags || [];
            if (selectedFilter === 'all' || itemTags.includes(selectedFilter)) {
              return (
                <motion.div
                  key={index}
                  layout
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className={child.props.className}
                >
                  {child}
                </motion.div>
              );
            }
          }
          return null;
        })}
      </AnimatePresence>
    </div>
  );
};

// Mobile List View Component
const MobileListView: React.FC<BentoGridProps> = ({ children, className = '', selectedFilter }) => {
  return (
    <div className={`
      flex flex-col gap-3 lg:hidden ${className}
    `}>
      <AnimatePresence mode="sync">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement<BentoGridItemProps>(child)) {
            const itemTags = child.props.tags || [];
            if (selectedFilter === 'all' || itemTags.includes(selectedFilter)) {
              return (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {React.cloneElement(child, { isMobile: true })}
                </motion.div>
              );
            }
          }
          return null;
        })}
      </AnimatePresence>
    </div>
  );
};

const Image: React.FC<ImageProps> = ({ className, alt, src }) => {
  return <img src={src} alt={alt} className={className} />;
};

// BentoGridItem Component
const BentoGridItem: React.FC<BentoGridItemProps> = ({
  title,
  description,
  header,
  icon,
  className = '',
  tags = [],
  link,
  isMobile = false
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));

  const renderHeader = () => {
    if (React.isValidElement<ImageProps>(header)) {
      return (
        <Image
          src={header.props.src}
          alt={header.props.alt || ''}
          className="w-full h-full object-cover rounded-xl"
        />
      );
    }
    return header;
  };

  if (isMobile) {
    return (
      <div className="
        group relative overflow-hidden
        p-3 rounded-xl
        bg-black
        border border-white/30
        hover:border-white/70
        transition-all duration-300 ease-out
      ">
        <div className="flex gap-3">
          <div className="w-24 h-24 flex-shrink-0">
            {renderHeader()}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-gray-800/80 border border-gray-700">
                {icon}
              </div>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
            </div>

            <p className="text-gray-400 text-xs line-clamp-2 mb-2">
              {description}
            </p>

            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs rounded-full bg-gray-800/80 text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        group relative overflow-hidden
        p-4 md:p-6 rounded-2xl
        bg-black
        border border-white/50
        hover:border-white
        transition-all duration-300 ease-out
        h-[400px] lg:h-[450px]
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 lg:p-3 rounded-xl bg-gray-800 border border-gray-700 group-hover:border-gray-600 transition-colors">
            <div className="text-white">{icon}</div>
          </div>
          <h3 className="text-lg lg:text-xl font-semibold text-white tracking-tight">
            {title}
          </h3>
        </div>

        <div className="flex flex-row gap-4 flex-1">
          <div className="w-1/3 lg:w-full">
            <div className="relative w-full">
              <div className="h-[200px]">
                {renderHeader()}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-gray-400 text-sm lg:text-base leading-relaxed mb-4 lg:mb-6">
              {description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 lg:px-3 py-1 text-xs lg:text-sm rounded-full bg-gray-800 text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mt-2 lg:mt-4">
              <div className="flex items-center gap-2 lg:gap-4">
                <button
                  onClick={() => {
                    setIsLiked(!isLiked);
                    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
                  }}
                  className="flex items-center gap-1 lg:gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Heart
                    className={`h-4 lg:h-5 w-4 lg:w-5 ${isLiked ? 'text-red-500 fill-red-500' : ''}`}
                  />
                  <span className="text-sm lg:text-base">{likeCount}</span>
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <ArrowShapeTurnUpRight className="h-4 lg:h-5 w-4 lg:w-5" />
                </button>
              </div>

              {link && (
                <a
                  href={link}
                  className="flex items-center gap-1 lg:gap-2 text-sm lg:text-base text-gray-400 hover:text-white transition-colors"
                >
                  Learn More
                  <ChevronRight className="h-3 lg:h-4 w-3 lg:w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Projects Component
const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const filters = ['all', 'AI', 'software', 'platform', 'under construction'];

  const items = [
    {
      title: "Mazs AI",
      description: "The Natural language processing based Artificial intelligence",
      header: <img src={pic1} alt="Mazs AI" className="w-full h-full object-cover rounded-xl" />,
      icon: <Paperclip className="h-6 w-6" />,
      tags: ["AI"],
      link: ""
    },
    {
      title: "ThinkLink",
      description: "The multimodel AI-powered platform contains personal assistants. ",
      header: <img src={pic2} alt="ThinkLink" className="w-full h-full object-cover rounded-xl" />,
      icon: <File className="h-6 w-6" />,
      tags: ["software"],
      link: ""
    },
    {
      title: "GMT OS",
      description: "The next generation of operating system.",
      header: <img src={pic3} alt="GMTOS - alpha" className="w-full h-full object-cover rounded-xl" />,
      icon: <PencilToLine className="h-6 w-6" />,
      tags: ["platform"],
      link: ""
    },
    {
      title: "(´;ω;`) under construction",
      description: "⚠️ under construction ⚠️ under construction ⚠️ under construction ⚠️",
      header: <img src={pic4} alt="The Power of Communication" className="w-full h-full object-cover rounded-xl" />,
      icon: <Trolley className="h-6 w-6" />,
      tags: ["under construction"],
      link: ""
    },
    {
      title: "ヾ(･∀･`) under construction",
      description: "⚠️ under construction ⚠️ under construction ⚠️",
      header: <img src={pic5} alt="The Pursuit of Knowledge" className="w-full h-full object-cover rounded-xl" />,
      icon: <Trolley className="h-6 w-6" />,
      tags: ["under construction"],
      link: ""
    }
  ];

  return (
    <div className="min-h-screen bg-black py-8 md:py-12">
      <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`
                px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm font-medium
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

        {/* Desktop Bento Grid */}
        <BentoGrid selectedFilter={selectedFilter}>
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              {...item}
              className={i === 3 ? "lg:col-span-2" : ""}
            />
          ))}
        </BentoGrid>

        {/* Mobile List View */}
        <MobileListView selectedFilter={selectedFilter}>
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              {...item}
            />
          ))}
        </MobileListView>
      </div>
    </div>
  );
};

export default Projects;