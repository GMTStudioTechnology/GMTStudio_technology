import React, { useState } from 'react';
import { Twitter, Linkedin, ArrowUpRight, CalendarDays, ChevronRight } from 'lucide-react';
import pic from '../assets/MazsAI.png';
import pic1 from '../assets/ThinkLink.png';
import pic2 from '../assets/pic1.png';
import Navbar from '../UI/Navigation_bar';

// Types
type NewsCardSize = 'large' | 'wide' | 'default';

interface NewsCardProps {
  size?: NewsCardSize;
  children: React.ReactNode;
  className?: string;
  date?: string;
  category?: string;
  href?: string;
  imageUrl?: string;
}

interface NewsItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  date: string;
  imageUrl?: string;
  href: string;
}

// Enhanced Image Component
const EnhancedImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}> 
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 mix-blend-overlay"></div>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
      />
    </div>
  );
};

// Modern Card Component
const NewsCard: React.FC<NewsCardProps> = ({
  size = 'default',
  children,
  className = '',
  date,
  category,
  href = '#',
}) => {
  const sizeClasses: Record<NewsCardSize, string> = {
    large: 'col-span-1 md:col-span-2',
    wide: 'col-span-1 md:row-span-2',
    default: 'col-span-1',
  };

  return (
    <a
      href={href}
      className={`
        group relative bg-zinc-900/80 rounded-3xl p-6 border border-zinc-800 
        hover:border-zinc-600 transition-all duration-500 
        hover:bg-zinc-800/50 backdrop-blur-lg shadow-lg hover:shadow-xl
        ${sizeClasses[size]} ${className}
      `}
    >
      {children}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-x-1">
        <ArrowUpRight className="text-zinc-400" size={20} />
      </div>
      {(date || category) && (
        <div className="absolute bottom-4 left-4 flex items-center gap-3 text-sm text-zinc-500">
          {category && (
            <span className="flex items-center gap-2 bg-zinc-800/50 px-3 py-1 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              {category}
            </span>
          )}
          {date && (
            <span className="flex items-center gap-2 bg-zinc-800/50 px-3 py-1 rounded-full backdrop-blur-sm">
              <CalendarDays size={14} />
              {date}
            </span>
          )}
        </div>
      )}
    </a>
  );
};

// Enhanced Newsletter Component
const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      // Handle subscription logic here
      setSubscribed(true);
    }
  };

  return (
    <div className="relative overflow-hidden group rounded-2xl p-6 bg-zinc-900/60 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
      <div className="relative">
        <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          Stay Updated
        </h3>
        <p className="text-zinc-400 mb-6">Get the latest news and updates delivered to your inbox.</p>
        {subscribed ? (
          <p className="text-green-400">Thank you for subscribing!</p>
        ) : (
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-2 bg-black/20 rounded-xl border border-zinc-700 focus:border-zinc-500 outline-none transition-colors"
            />
            <button
              onClick={handleSubscribe}
              className="w-full sm:w-auto px-6 py-2 bg-white text-black rounded-xl hover:bg-zinc-200 transition-all duration-300 font-medium flex items-center justify-center"
            >
              Subscribe
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component
const HomePage: React.FC = () => {
  const [showMoreNews, setShowMoreNews] = useState(false);

  const featuredNews: NewsItem[] = [
    {
      id: '1',
      title: 'Mazs AI User Interface Update',
      description:
        "We've redesigned the Mazs AI interface for a more intuitive and powerful user experience, featuring enhanced visualization capabilities and streamlined workflows.",
      category: 'UI Update',
      date: 'January 9, 2025',
      href: '#',
    },
    {
      id: '2',
      title: 'Think Link Development',
      category: 'Software Design',
      date: 'January 8, 2025',
      href: '#',
    },
    {
      id: '3',
      title: 'GMTStudio Official Website v2',
      category: 'Website Development',
      date: 'January 7, 2025',
      href: '#',
    },
    {
      id: '4',
      title: 'Mazs AI Beta Release',
      category: 'AI',
      date: 'January 10, 2025',
      href: '#',
    },
    {
      id: '5',
      title: 'Think Link Mobile App',
      category: 'Mobile Design',
      date: 'January 6, 2025',
      href: '#',
    },
  ];

  const moreNews: NewsItem[] = [
    {
      id: '4',
      title: 'Mazs AI Beta Release',
      category: 'AI',
      date: 'January 10, 2025',
      href: '#',
    },
    {
      id: '5',
      title: 'Think Link Mobile App',
      category: 'Mobile Design',
      date: 'January 6, 2025',
      href: '#',
    },
    {
      id: '6',
      title: 'New Partnerships for GMTStudio',
      category: 'Business Updates',
      date: 'January 5, 2025',
      href: '#',
    },
    {
      id: '7',
      title: 'Mazs AI Roadmap 2025',
      category: 'Roadmap',
      date: 'January 4, 2025',
      href: '#',
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="bg-black text-white min-h-screen p-4 md:p-8 mt-20 mb-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10">
            <div className="mb-6 md:mb-0">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-zinc-400 bg-clip-text text-transparent mb-2">
                Newsroom
              </h1>
              <p className="text-zinc-400 text-lg">Latest updates and announcements</p>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="p-3 hover:bg-zinc-800/50 rounded-full transition-all duration-300 backdrop-blur-sm"
              >
                <Twitter className="text-zinc-400 hover:text-white transition-colors" size={20} />
              </a>
              <a
                href="#"
                className="p-3 hover:bg-zinc-800/50 rounded-full transition-all duration-300 backdrop-blur-sm"
              >
                <Linkedin className="text-zinc-400 hover:text-white transition-colors" size={20} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <NewsCard
              size="large"
              category={featuredNews[0].category}
              date={featuredNews[0].date}
              href={featuredNews[0].href}
            >
              <div className="h-full flex flex-col">
                <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
                  <EnhancedImage src={pic} alt="MazsAI Logo" className="h-48 w-48 rounded-xl" />
                  <EnhancedImage src={pic1} alt="AI Visual" className="h-48 w-48 rounded-xl" />
                </div>
                <div className="flex flex-col flex-grow justify-between">
                  <div>
                    <h2 className="text-3xl font-semibold mb-4 group-hover:text-zinc-200 transition-colors leading-tight">
                      {featuredNews[0].title}
                    </h2>
                    <p className="text-zinc-400 hidden md:block text-lg leading-relaxed">
                      {featuredNews[0].description}
                    </p>
                  </div>
                </div>
              </div>
            </NewsCard>

            {featuredNews.slice(1).map((news) => (
              <NewsCard key={news.id} category={news.category} date={news.date} href={news.href}>
                <div className="mb-6">
                  <div className="mb-3">
                    <EnhancedImage src={pic2} alt={`${news.category} Icon`} className="w-48 h-48 rounded-xl" />
                  </div>
                  <h2 className="text-2xl font-semibold group-hover:text-zinc-200 transition-colors">
                    {news.title}
                  </h2>
                </div>
              </NewsCard>
            ))}
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={() => setShowMoreNews(!showMoreNews)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-md transition-colors font-medium flex items-center gap-2"
            >
              {showMoreNews ? 'Show Less' : 'Show More'}
            </button>
          </div>

          {showMoreNews && (
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-zinc-400 bg-clip-text text-transparent mb-5">
                More News
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {moreNews.map((news) => (
                  <NewsCard key={news.id} category={news.category} date={news.date} href={news.href}>
                    <div className="mb-6">
                      <div className="mb-3">
                        {/* Placeholder image for new items */}
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-48 h-48"></div>
                      </div>
                      <h2 className="text-2xl font-semibold group-hover:text-zinc-200 transition-colors">
                        {news.title}
                      </h2>
                    </div>
                  </NewsCard>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-1">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-zinc-400 bg-clip-text text-transparent mb-5">
                Stay Updated
              </h2>
              <NewsletterSignup />
            </div>

            <div className="col-span-1">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-zinc-400 bg-clip-text text-transparent mb-5">
                Contact
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                    Contact
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-zinc-400 mb-1">Inquiries</p>
                      <a
                        href="mailto:GMTStudiotechnology@gmail.com"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        GMTStudiotechnology@gmail.com
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 mb-1">Support</p>
                      <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                        Help Center
                      </a>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                    Resources
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-zinc-400 mb-1">Brand Assets</p>
                      <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                        Download Press Kit
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400 mb-1">Documentation</p>
                      <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                        View API Docs
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;