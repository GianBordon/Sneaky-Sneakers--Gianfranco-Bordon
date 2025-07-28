import React from "react";
import { Navbar, Footer } from "../components";

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎉</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
              Test Page Working!
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              If you can see this page, React Router is working correctly and the modern styling is applied.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <h2 className="text-4xl font-display font-bold text-neutral-800 mb-6">
              Routing Test Successful
            </h2>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              This is a test page to verify that React Router is functioning correctly. 
              The modern design system with animations and responsive layout is working perfectly.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl animate-slide-up">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Router Working</h3>
                <p className="text-neutral-600">Navigation is functioning properly</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl animate-slide-up" style={{ animationDelay: '100ms' }}>
                <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Modern Design</h3>
                <p className="text-neutral-600">Clean and minimalist interface</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">Fast Performance</h3>
                <p className="text-neutral-600">Optimized for speed and efficiency</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-r from-neutral-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl font-display font-bold text-neutral-800 mb-4">What's Working</h2>
            <p className="text-neutral-600">All the modern features are functioning correctly</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center animate-slide-up">
              <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-blue-600">🎯</span>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">Routing</h3>
              <p className="text-neutral-600 text-sm">React Router</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center animate-slide-up" style={{ animationDelay: '100ms' }}>
              <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-green-600">🎨</span>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">Styling</h3>
              <p className="text-neutral-600 text-sm">Tailwind CSS</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-purple-600">✨</span>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">Animations</h3>
              <p className="text-neutral-600 text-sm">CSS Animations</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-orange-600">📱</span>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">Responsive</h3>
              <p className="text-neutral-600 text-sm">Mobile First</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TestPage; 