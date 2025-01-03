import { useState } from 'react';

const Hero = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="hero min-h-screen bg-gradient-to-br from-base-200 to-base-300 relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-primary/30 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-secondary/30 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Floating particles effect */}
      <div className="particles absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle absolute bg-primary/20 rounded-full"
            style={{
              width: Math.random() * 5 + 'px',
              height: Math.random() * 5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s linear infinite`
            }}
          ></div>
        ))}
      </div>

      <div className="hero-content max-w-7xl mx-auto gap-12 flex-col lg:flex-row-reverse relative z-10 px-4">
        <div className="lg:w-1/2 group perspective-1000">
          <div className="relative transform transition-all duration-500 hover:rotate-y-12 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl transform -skew-x-12 scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
            <img
              src="/assets/hero.png"
              className="w-full max-w-2xl rounded-2xl shadow-2xl object-cover transition-all duration-300 hover:brightness-110"
              alt="Hero"
              loading="eager"
            />
            {/* Interactive floating cards */}
            <div className="absolute -top-6 -left-6 bg-base-100/95 p-4 rounded-xl shadow-xl transform hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm border border-base-300 cursor-pointer"
              onMouseEnter={() => setHoveredCard('performance')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold">Fast Performance</p>
                  <p className="text-xs text-base-content/70">Lightning quick responses</p>
                </div>
              </div>
              {hoveredCard === 'performance' && (
                <div className="absolute top-full mt-2 bg-base-100 p-4 rounded-lg shadow-lg">
                  <p className="text-sm">Our platform is optimized for speed, ensuring you get the best performance.</p>
                </div>
              )}
            </div>
            <div className="absolute -bottom-6 -right-6 bg-base-100/95 p-4 rounded-xl shadow-xl transform hover:-translate-y-2 transition-all duration-300 backdrop-blur-sm border border-base-300 cursor-pointer"
              onMouseEnter={() => setHoveredCard('security')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold">Secure Platform</p>
                  <p className="text-xs text-base-content/70">Enterprise-grade security</p>
                </div>
              </div>
              {hoveredCard === 'security' && (
                <div className="absolute top-full mt-2 bg-base-100 p-4 rounded-lg shadow-lg">
                  <p className="text-sm">We prioritize your security with the latest encryption and security protocols.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 space-y-8">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <span className="px-6 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold inline-block hover:bg-primary/20 transition-all duration-300 cursor-pointer group">
                <span className="inline-block group-hover:scale-105 transition-transform">A stylish Tech company</span>
                <span className="inline-block w-2 h-2 bg-primary rounded-full ml-2 animate-ping"></span>
              </span>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 rounded-full">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                <span className="text-sm text-green-500 font-medium">Online Now</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                <span className="text-transparent bg-gradient-to-r from-blue-800 via-primary to-yellow-300 bg-clip-text animate-gradient relative">
                  GMTStudio
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary/20 rounded-full animate-ping"></span>
                </span>
              </h1>
              <h2 className="text-3xl md:text-2xl sm:text-xl font-semibold bg-gradient-to-r from-base-content/90 to-base-content/60 bg-clip-text text-transparent">
                Where Innovation Meets Excellence
              </h2>
            </div>
          </div>

          <p className="text-xl leading-relaxed text-base-content/90 animate-fadeIn">
            At GMTStudio, we are more than just a tech company; we are a team of passionate individuals dedicated to pushing the boundaries of innovation. Our mission is to create cutting-edge solutions that empower businesses and individuals to thrive in the digital age.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button className="btn btn-primary btn-lg group relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-primary-focus to-primary transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
              <span className="relative flex items-center">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <button className="btn btn-outline btn-lg group relative overflow-hidden">
              <span className="absolute inset-0 bg-base-200/50 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
              <span className="relative flex items-center">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
            <div className="relative">
              <div className="flex -space-x-4 hover:space-x-1 transition-all duration-300">
                {['/avatar1.jpg', '/avatar2.jpg', '/avatar3.jpg'].map((src, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={src}
                      className="w-12 h-12 rounded-full border-2 border-primary hover:z-10 transition-all duration-300 hover:scale-110 cursor-pointer"
                      alt={`User ${index + 1}`}
                    />
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-base-100 p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                      <p className="text-sm font-medium">User {index + 1}</p>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-base-100"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-sm space-y-1">
              <p className="font-bold text-base">Join 1000+ users</p>
              <div className="flex items-center gap-2">
                <p className="text-base-content/70">Already exploring the future</p>
                <div className="flex items-center bg-yellow-400/10 px-2 py-1 rounded-full">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm font-medium ml-1">4.9/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;