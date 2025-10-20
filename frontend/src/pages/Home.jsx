import React from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import { ArrowRight, Users, Building2, TrendingUp } from "lucide-react";

const Home = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <div className="py-20 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-slate-600 font-light">
              Simple steps to connect talent with opportunity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white border-2 border-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-light text-slate-900">1</span>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-slate-700" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3">
                Create Profile
              </h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Students and companies register with their details to get started
                on the platform.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white border-2 border-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-light text-slate-900">2</span>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Building2 size={24} className="text-slate-700" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3">
                Explore Opportunities
              </h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Browse job listings, filter by preferences, and find positions that
                match your profile.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-white border-2 border-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-light text-slate-900">3</span>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={24} className="text-slate-700" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3">
                Get Placed
              </h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Apply with a single click, track your applications, and land your
                dream job.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Ready to Transform Your Career Journey?
          </h2>
          <p className="text-lg text-slate-300 font-light mb-10">
            Join thousands of students and companies using Placement Portal to
            connect, grow, and succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-medium transition-all group"
            >
              Get Started Free
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white hover:bg-white hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;