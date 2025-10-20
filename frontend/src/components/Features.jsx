import React from "react";
import { Zap, Shield, Users, Briefcase, TrendingUp, Clock } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Streamlined workflows that save time for students, companies, and administrators.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security protecting your sensitive information at every step.",
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Intuitive interfaces designed for effortless navigation and optimal experience.",
    },
    {
      icon: Briefcase,
      title: "Smart Matching",
      description: "Intelligent job recommendations based on student profiles and eligibility.",
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Comprehensive insights and metrics to track placement progress and trends.",
    },
    {
      icon: Clock,
      title: "Real-Time Updates",
      description: "Stay informed with instant notifications on application status changes.",
    },
  ];

  return (
    <div className="py-20 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">
            Built for Excellence
          </h2>
          <p className="text-lg text-slate-600 font-light max-w-2xl mx-auto">
            Every feature is crafted to deliver a seamless placement experience
            for all stakeholders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-slate-300 transition-all group"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-slate-200 transition-all">
                  <Icon size={24} className="text-slate-700" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;