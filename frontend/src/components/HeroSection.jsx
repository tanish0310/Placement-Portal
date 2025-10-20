import React from "react";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-slate-900 text-white py-20 px-6 lg:px-8 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
          Your Journey to
          <span className="block mt-2 font-medium">Career Success Starts Here</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
          Connect with top employers, access exclusive opportunities, and take
          the next step in your professional journey with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-medium transition-all group"
          >
            Get Started
            <ArrowRight
              size={18}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="/about"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white hover:bg-white hover:text-slate-900 rounded-xl font-medium transition-all"
          >
            Learn More
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-slate-800">
          <div>
            <div className="text-3xl md:text-4xl font-light mb-2">1200+</div>
            <div className="text-slate-400 text-sm font-light">Active Students</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-light mb-2">150+</div>
            <div className="text-slate-400 text-sm font-light">Partner Companies</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-light mb-2">85%</div>
            <div className="text-slate-400 text-sm font-light">Placement Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;