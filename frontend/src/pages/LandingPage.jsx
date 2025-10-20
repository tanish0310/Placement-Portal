import React from "react";
import { ArrowRight, Briefcase, Users, TrendingUp } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-24 pb-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 tracking-tight mb-6">
            Your Gateway to
            <span className="block mt-2 font-medium">Career Excellence</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Connect with top employers, streamline your placement process, and
            unlock opportunities that match your aspirations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all group"
            >
              Get Started
              <ArrowRight
                size={18}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-slate-600 font-light">
              Built for students, recruiters, and administrators
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                <Users size={24} className="text-slate-700" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3">
                For Students
              </h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Access curated job opportunities, track applications, and
                prepare for your dream career with personalized guidance.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                <Briefcase size={24} className="text-slate-700" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3">
                For Companies
              </h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Connect with exceptional talent, streamline recruitment, and
                build your team with efficient hiring workflows.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp size={24} className="text-slate-700" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3">
                For Administrators
              </h3>
              <p className="text-slate-600 leading-relaxed font-light">
                Manage placements effortlessly with comprehensive analytics,
                reporting tools, and streamlined operations.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-slate-600 mb-10 font-light">
            Join thousands of students and companies transforming the placement
            experience.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all"
          >
            Create Your Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;