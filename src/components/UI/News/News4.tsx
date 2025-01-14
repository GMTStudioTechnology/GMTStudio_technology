import React from 'react';
import pic1 from "../../assets/ThinkLink.png"
import Navbar from '../../layout/Navigation_bar';
const News4: React.FC = () => {
  return (
    <div >
    <Navbar/>
    <div className="bg-black text-gray-200 min-h-screen font-sans mt-16">
        <div className="breadcrumbs text-sm pl-5 pt-10">
            <ul>
                <li><a href="/">GMTStudio</a></li>
                <li><a href="/news">News</a></li>
                <li>News 4 - Mazs AI development </li>
                </ul>
        </div>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="max-w-4xl mx-auto">
          {/* Enhanced header with improved spacing and animations */}
          <header className="mb-16 text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text hover:scale-105 transition-transform">
            Mazs AI chatbot development 
            </h1>
            <p className="text-gray-400 text-base md:text-lg font-medium">
              Published on December 10, 2024
            </p>
          </header>

          {/* Improved image container with better positioning and responsive height */}
          <div className="mb-16 flex justify-center">
            <div className="relative w-full max-w-3xl mx-auto">
              <img
                src={pic1}
                alt="ThinkLink"
                className="w-full h-64 md:h-80 object-cover rounded-xl shadow-2xl hover:shadow-blue-500/20 transition-shadow duration-300"
              />
            </div>
          </div>

          <div className="prose prose-lg prose-invert mx-auto">
            {/* Enhanced introduction paragraph */}
            <p className="text-xl md:text-2xl leading-relaxed mb-8 text-gray-200">
                We are trying to build a new AI chatbot without using any pre-trained model, not even using pytorch or tensorflow
            </p>

            {/* Improved section headers with hover effects */}
            <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text hover:scale-105 transition-transform">
              Why we want to do that
            </h2>
            <p className="mb-8 text-gray-300 leading-relaxed">
                Artificial intelligence (AI) is now a trend, everyone is talking about it, and the most common method to create an AI is transformer with pre-training, but we want to make things different, we want to research a new way to develop AI.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text hover:scale-105 transition-transform">
              How are we going to do that 
            </h2>
            {/* Enhanced list with hover effects and better spacing */}
            <ul className="space-y-4 mb-8 list-none">
              {[
                "I don't know ! ",
                "maybe when the AI is ready you will know",
              ].map((point, index) => (
                <li key={index} className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                  <span className="text-blue-500">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* Enhanced blockquote with subtle animation */}
            <blockquote className="border-l-4 border-blue-500 pl-6 py-4 my-8 italic bg-blue-500/5 rounded-r-lg hover:bg-blue-500/10 transition-colors">
              <p className="text-gray-200">"Please notice that the development will last for about a month or a few, and the AI tools ( features ) will be in beta for everyone. </p>
            </blockquote>

            <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text hover:scale-105 transition-transform">
              Looking Ahead
            </h2>
            <p className="mb-8 text-gray-300 leading-relaxed">
                We are excited to share this newly developed tools with you.
            </p>

            <p className="text-gray-300 leading-relaxed">
              Stay tuned for more updates for GMTStudio.
            </p>
          </div>
        </article>
        <div className="flex justify-center mt-12">
          <a href="/news">          
          <button className='border bg-black border-white text-white hover:bg-white hover:text-black hover:border-black rounded-lg px-4 py-3'>
            Back to News
          </button>
          </a>
          <a href="/news2">
          <button className ="border bg-black border-white text-white hover:bg-white hover:text-black hover:border-black rounded-lg px-4 py-3 ml-5 ">
              Next Page - News 5
          </button>
          </a>
        </div>
      </main>
    </div>
    </div>
  );
};

export default News4;