import React from "react";
import { Target, Zap, Shield } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
          Transforming Career Placement
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">
          We bridge the gap between exceptional talent and leading organizations
          through intuitive technology and seamless experiences.
        </p>
      </div>

      {/* Values Section */}
      <div className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Target size={26} className="text-slate-700" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3">
                Purpose Driven
              </h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Every feature is designed with your success in mind, ensuring a
                meaningful and effective placement process.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Zap size={26} className="text-slate-700" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3">
                Efficient By Design
              </h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Streamlined workflows and intelligent automation save time for
                all stakeholders in the placement ecosystem.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Shield size={26} className="text-slate-700" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-3">
                Trust & Security
              </h3>
              <p className="text-slate-600 font-light leading-relaxed">
                Your data is protected with enterprise-grade security, ensuring
                confidentiality at every step.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20">
        <div className="bg-slate-900 rounded-3xl p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-slate-300 font-light leading-relaxed">
            To empower students with opportunities that match their aspirations
            while providing organizations with access to exceptional talent,
            creating a placement experience that is transparent, efficient, and
            rewarding for all.
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20 text-center">
          <h2 className="text-3xl font-light text-slate-900 mb-6">
            Ready to begin?
          </h2>
          <p className="text-lg text-slate-600 mb-10 font-light">
            Join us in reshaping the future of career placements.
          </p>
          <a
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
